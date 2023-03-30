import { useState, useContext, FormEventHandler } from "react";
import { signIn } from "next-auth/react";
import NotificationContext from "@/store/NotificationContext";
import { createUser } from "@/utils/createUser";
import { useRouter } from "next/router";

import classes from "./AuthForm.module.css";

type AuthFormType = {
  redirectBtnHandler: (val: boolean) => void;
};

function AuthForm({ redirectBtnHandler }: AuthFormType) {
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  const [user, setUser] = useState({ emailInput: "", passwordInput: "" });

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    redirectBtnHandler(false);
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (isLogin) {
      // log the user in using next-auth
      const result = await signIn("credentials", {
        redirect: false,
        email: user.emailInput,
        password: user.passwordInput,
      });
      if (!result?.error) {
        router.replace("/createAd");
      } else {
        notificationCtx.showNotification({
          title: "Error!",
          message:
            "Login failed. Please create an account to be able to post ads!",
          status: "error",
        });
        redirectBtnHandler(true);
      }
    } else {
      try {
        const result = await createUser(user.emailInput, user.passwordInput);
        if (result.message === "User already exists") {
          notificationCtx.showNotification({
            title: "You're almost there...",
            message: "Please log in instead",
            status: "warning",
          });
        } else {
          await signIn("credentials", {
            email: user.emailInput,
            password: user.passwordInput,
            redirect: false, // prevent redirect after sign in
          });
          router.replace("/createAd");
        }
      } catch (error) {
        notificationCtx.showNotification({
          title: "Error!",
          message: "Sign up failed, please try again!",
          status: "error",
        });
      }
    }
  };

  return (
    <div className={classes.form}>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={user.emailInput}
              onChange={({ target }) =>
                setUser({ ...user, emailInput: target.value })
              }
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              value={user.passwordInput}
              onChange={({ target }) =>
                setUser({ ...user, passwordInput: target.value })
              }
            />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AuthForm;

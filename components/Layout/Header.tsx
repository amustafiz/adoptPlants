import Link from "next/link";
import { useEffect, useState } from "react";
import classes from "./Header.module.css";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

/*
modify the header to include a signin flow
*/

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = router.pathname;
  const [showNavOptions, setShowNavOptions] = useState(false);

  useEffect(() => {
    if (path !== "/createAds") {
      setShowNavOptions(true);
    } else {
      return;
    }
  }, [path]);

  const logoutHandler = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Foliage Finder</Link>
      </div>
      <ul className={classes.navigation}>
        <li className={classes.logo}>
          <Link href="createAd">Post an ad</Link>
        </li>
        {session && (
          <div className={classes.actions}>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        )}
      </ul>
    </header>
  );
};

export default Header;

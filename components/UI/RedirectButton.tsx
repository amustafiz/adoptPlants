import React from "react";
import Link from "next/link";
import classes from "./RedirectButton.module.css";

const RedirectButton = () => {
  return (
    <section className={classes.btnContainer}>
      <Link href="/ads" className={classes.redirect}>
        Go back to home page
      </Link>
    </section>
  );
};
export default RedirectButton;

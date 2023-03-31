import Image from "next/image";
import classes from "./AdHeader.module.css";

function PostHeader({ title, image }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

export default PostHeader;

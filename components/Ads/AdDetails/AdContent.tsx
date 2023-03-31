import PostHeader from "./AdHeader";
import classes from "./AdContent.module.scss";
import Image from "next/image";

const PostContent = ({ imageDetails }) => {
  const {
    _id,
    cycle,
    watering,
    sunlight,
    title,
    authorName,
    description,
    edible,
    poisonous,
    indoor,
    email,
    imageUrl,
  } = imageDetails;
  return (
    <article className={classes.section}>
      <PostHeader title={title} image={imageUrl} />
      <Image alt={title} src={imageUrl} width={200} height={150} />
      <div>{description}</div>
      <div>
        This plant is {poisonous ? "poisonous" : "not poisonous"} for your pets
      </div>
      <div>The plant needs an {watering} water cycle </div>
      <div>{edible}</div>
      <div>The plant is {cycle}</div>
    </article>
  );
};

export default PostContent;

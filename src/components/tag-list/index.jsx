import { Link } from "react-router-dom";
import "./tags.css";

export const TagList = ({ data, size = "s" }) => {
  return (
    <div className={"tags tags-" + size}>
      {data.map((node) => (
        <Tag data={node} size={size} key={node.id} />
      ))}
    </div>
  );
};

export const Tag = ({ data, size }) => {
  return (
    <Link
      className={"tag tag-" + size + " tag-" + data.color}
      to={"/tags/" + data.slug}
    >
      {data.name}
    </Link>
  );
};

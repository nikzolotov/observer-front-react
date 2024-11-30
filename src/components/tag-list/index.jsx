import { Link } from "react-router-dom";
import "./tags.css";

export const TagList = ({ data, size = "s", selectedSlugs }) => {
  return (
    <div className={"tags tags-" + size}>
      {data.map((node) => (
        <Tag
          data={node}
          size={size}
          key={node.id}
          selectedSlugs={selectedSlugs}
        />
      ))}
    </div>
  );
};

export const Tag = ({ data, size, selectedSlugs }) => {
  const to = `/tags/${
    selectedSlugs ? selectedSlugs + "," + data.slug : data.slug
  }`;
  return (
    <Link className={"tag tag-" + size + " tag-" + data.color} to={to}>
      {data.name}
    </Link>
  );
};

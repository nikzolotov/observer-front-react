import "./tag-title.css";

export const TagTitle = ({ name, count }) => {
  return (
    <h1 className="tag-title">
      {name}
      <span className="tag-title__count">{count}</span>
    </h1>
  );
};

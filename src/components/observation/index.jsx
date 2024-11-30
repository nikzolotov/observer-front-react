import { TagList } from "../tag-list";
import "./observation.css";

export const Observation = ({ data }) => {
  const isMobile = data.tags.filter((d) => d.slug === "mobile").length === 1;

  const date = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(data.createdAt));

  return (
    <div className="observation">
      {data.name && <h2 className="observation__title">{data.name}</h2>}
      {data.description && (
        <p className="observation__description">{data.description}</p>
      )}
      {data.link && (
        <p className="observation__link">
          <a href={data.link}>{data.link}</a>
        </p>
      )}
      <TagList data={data.tags} />
      <p className="observation__date">{date}</p>
      <div className="observation__images">
        {data.media.map((node) => (
          <img
            className={
              "observation__image" +
              (isMobile ? " observation__image-mobile" : "")
            }
            src={import.meta.env.VITE_STRAPI_UPLOADS + node.hash + node.ext}
            alt={data.name}
            key={node.id}
          />
        ))}
      </div>
    </div>
  );
};

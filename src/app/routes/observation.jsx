import { useLoaderData, Link } from "react-router-dom";
import qs from "qs";

export const observationLoader = async ({ params }) => {
  const query = qs.stringify({
    populate: ["tags", "media"],
    filters: {
      id: {
        $eq: params.observationId,
      },
    },
  });

  const response = await fetch(
    `${import.meta.env.VITE_STRAPI_API_URL}observations?${query}`
  );
  const data = await response.json();
  return {
    observation: data.data,
  };
};

export const Observation = () => {
  const { observation } = useLoaderData();
  return (
    <>
      <h1>{observation[0].name}</h1>
      <p>{observation[0].description}</p>
      <p>
        Теги:{" "}
        {observation[0].tags.map((tag) => (
          <span key={tag.id}>
            <Link to={`/tags/${tag.slug}`}>{tag.name}</Link>
            {tag.id !==
              observation[0].tags[observation[0].tags.length - 1].id && ", "}
          </span>
        ))}
      </p>
      <p>{observation[0].createdAt}</p>
      <div>
        {observation[0].media.map((mediaItem, index) => (
          <img
            key={index}
            src={`${import.meta.env.VITE_STRAPI_UPLOADS}${mediaItem.hash}${
              mediaItem.ext
            }`}
            alt={`Observation media ${index + 1}`}
            width={1000}
          />
        ))}
      </div>
    </>
  );
};

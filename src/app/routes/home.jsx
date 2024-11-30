import { useLoaderData, Link } from "react-router-dom";
import qs from "qs";

export const homeLoader = async () => {
  const query = qs.stringify({
    populate: "media",
    sort: "createdAt:desc",
    pagination: {
      pageSize: 20,
    },
  });

  const tagsQuery = qs.stringify({
    sort: "name:asc",
    filters: {
      isMain: true,
    },
  });

  const [observationsResponse, tagsResponse] = await Promise.all([
    fetch(`${import.meta.env.VITE_STRAPI_API_URL}observations?${query}`),
    fetch(`${import.meta.env.VITE_STRAPI_API_URL}tags?${tagsQuery}`),
  ]);

  const data = await Promise.all([
    observationsResponse.json(),
    tagsResponse.json(),
  ]);

  return {
    observations: data[0].data,
    tags: data[1].data,
  };
};

export const Home = () => {
  const { observations, tags } = useLoaderData();
  return (
    <>
      <h1>Observations</h1>
      <TagList data={tags} />
      <ObservationList data={observations} />
    </>
  );
};

function TagList({ data }) {
  return (
    <div className="tags">
      {data.map((node) => (
        <span key={node.id}>
          <Link to={`/tags/${node.slug}`}>{node.name}</Link>{" "}
        </span>
      ))}
    </div>
  );
}

function ObservationList({ data }) {
  return (
    <ul className="observations">
      {data.map((node) => (
        <ObservationListItem data={node} key={node.id} />
      ))}
    </ul>
  );
}

function ObservationListItem({ data }) {
  return (
    <li className="observations__item">
      <Link to={`observation/${data.id}`}>
        <img
          width={200}
          className="observations__image"
          src={
            data.media[0]
              ? `${
                  import.meta.env.VITE_STRAPI_UPLOADS +
                  data.media[0].hash +
                  data.media[0].ext
                }`
              : ""
          }
        />
      </Link>
      <p className="observations__year">{data.createdAt}</p>
    </li>
  );
}

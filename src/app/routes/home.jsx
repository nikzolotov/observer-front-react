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

  const response = await fetch(
    `${import.meta.env.VITE_STRAPI_API_URL}observations?${query}`
  );
  const data = await response.json();
  return {
    observations: data.data,
  };
};

export const Home = () => {
  const { observations } = useLoaderData();
  return (
    <>
      <h1>Observations</h1>
      <ObservationList data={observations} />
    </>
  );
};

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

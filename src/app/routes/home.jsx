import { useLoaderData } from "react-router-dom";

/**
 * Asynchronously loads observations data from the Strapi API,
 * sorted by creation date in descending order, with a page size of 20.
 *
 * @returns {Promise<Object>} An object containing the fetched observations data.
 */
export const homeLoader = async () => {
  const response = await fetch(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }observations?sort=createdAt:desc&pagination[pageSize]=20`
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
      {data.id} - {data.name}
    </li>
  );
}

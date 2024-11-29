import { useLoaderData } from "react-router-dom";

export const observationLoader = async ({ params }) => {
  const response = await fetch(
    `${import.meta.env.VITE_STRAPI_API_URL}observations?filters[id][$eq]=${
      params.observationId
    }`
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
      <p>{observation[0].createdAt}</p>
    </>
  );
};

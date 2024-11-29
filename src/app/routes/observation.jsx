import { useLoaderData } from "react-router-dom";
import qs from "qs";

/**
 * Asynchronously loads an observation data from the Strapi API
 * by its id passed as a route parameter.
 *
 * @param {Object} params - Route parameters.
 * @param {string} params.observationId - The id of the observation to be
 *   loaded.
 *
 * @returns {Promise<Object>} An object containing the loaded observation data.
 */
export const observationLoader = async ({ params }) => {
  const query = qs.stringify({
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
      <p>{observation[0].createdAt}</p>
    </>
  );
};

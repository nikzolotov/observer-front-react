import { useLoaderData, Link } from "react-router-dom";
import qs from "qs";

import { Observation } from "../../components/observation";
import { Button } from "../../components/button";

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

export const ObservationRoute = () => {
  const { observation } = useLoaderData();
  return (
    <>
      <div className="right-top-navigation">
        <Button to="/">Закрыть</Button>
      </div>
      <Observation data={observation[0]} />
    </>
  );
};

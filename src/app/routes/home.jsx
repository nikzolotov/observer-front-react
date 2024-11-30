import { useLoaderData } from "react-router-dom";
import qs from "qs";

import { ObservationList } from "../../components/observation-list";
import { ObservationTotal } from "../../components/observation-total";
import { TagList } from "../../components/tag-list";

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

  const [observationsData, tagsData] = await Promise.all([
    observationsResponse.json(),
    tagsResponse.json(),
  ]);

  return {
    observations: observationsData.data,
    observationsTotal: observationsData.meta.pagination.total,
    tags: tagsData.data,
  };
};

export const HomeRoute = () => {
  const { observations, tags, observationsTotal } = useLoaderData();
  return (
    <>
      <TagList data={tags} size="m" />
      <ObservationList data={observations} />
      <ObservationTotal total={observationsTotal} />
    </>
  );
};

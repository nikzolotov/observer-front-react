import { useLoaderData, Link } from "react-router-dom";
import qs from "qs";

import { ObservationList } from "../../components/observation-list";
import { TagTitle } from "../../components/tag-title";

export const tagsLoader = async ({ params }) => {
  const slugsArray = params.slugs.split(",");

  const query = qs.stringify({
    sort: "createdAt:asc",
    filters: {
      slug: {
        $in: slugsArray,
      },
    },
  });

  const observationsQuery = qs.stringify({
    sort: "createdAt:desc",
    filters: {
      $and: slugsArray.map((slug) => ({
        tags: {
          slug: {
            $eq: slug,
          },
        },
      })),
    },
    populate: "media",
  });

  console.log(observationsQuery);

  const [tagsResponse, observationsResponse] = await Promise.all([
    fetch(`${import.meta.env.VITE_STRAPI_API_URL}tags?${query}`),
    fetch(
      `${import.meta.env.VITE_STRAPI_API_URL}observations?${observationsQuery}`
    ),
  ]);

  const [tagsData, observationsData] = await Promise.all([
    tagsResponse.json(),
    observationsResponse.json(),
  ]);

  return {
    tags: tagsData.data,
    observations: observationsData.data,
  };
};

export const TagsRoute = () => {
  const { tags, observations } = useLoaderData();
  return (
    <>
      <TagTitle
        name={tags[0].name}
        // count={observations.meta.pagination.total}
        count={observations.length} // wrong number
      />
      <ObservationList data={observations} />
      <dib>{observations.length}</dib>
    </>
  );
};

import { useLoaderData, Link } from "react-router-dom";
import qs from "qs";

import { ObservationList } from "../../components/observation-list";
import { TagList } from "../../components/tag-list";
import { TagTitle } from "../../components/tag-title";
import { Button } from "../../components/button";

export const tagsLoader = async ({ params }) => {
  const selectedSlugs = params.slugs.split(",");

  const tagsQuery = qs.stringify({
    sort: "name:asc",
    pagination: {
      pageSize: 1000,
    },
    filters: {
      isMain: false,
    },
  });

  const observationsQuery = qs.stringify({
    sort: "createdAt:desc",
    pagination: {
      pageSize: 1000,
    },
    filters: {
      $and: selectedSlugs.map((slug) => ({
        tags: {
          slug: {
            $eq: slug,
          },
        },
      })),
    },
    populate: ["media", "tags"],
  });

  const [tagsResponse, observationsResponse] = await Promise.all([
    fetch(`${import.meta.env.VITE_STRAPI_API_URL}tags?${tagsQuery}`),
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
    observationsTotal: observationsData.meta.pagination.total,
    selectedSlugs: selectedSlugs,
  };
};

export const TagsRoute = () => {
  const { tags, observations, observationsTotal, selectedSlugs } =
    useLoaderData();

  // Filter tags by observations
  const filteredTags = filterTagsByObservations(
    tags,
    observations,
    selectedSlugs
  );

  return (
    <>
      <div className="right-top-navigation">
        <Button to="/">Закрыть</Button>
      </div>
      <TagTitle name={selectedSlugs.toString()} count={observationsTotal} />
      <TagList data={filteredTags} size="m" selectedSlugs={selectedSlugs} />
      <ObservationList data={observations} />
    </>
  );
};

const filterTagsByObservations = (tags, observations, excludedSlugs) => {
  const uniqueTagSlugs = new Set();

  observations.forEach((observation) => {
    observation.tags.forEach((tag) => {
      if (!excludedSlugs.includes(tag.slug)) {
        uniqueTagSlugs.add(tag.slug);
      }
    });
  });

  return tags.filter((tag) => uniqueTagSlugs.has(tag.slug));
};

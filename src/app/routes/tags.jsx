import { useLoaderData, Link } from "react-router-dom";
import qs from "qs";

export const tagsLoader = async ({ params }) => {
  const slugsArray = params.slugs.split(",");

  const query = qs.stringify(
    {
      sort: "createdAt:asc",
      filters: {
        slug: {
          $in: slugsArray,
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const observationsQuery = qs.stringify(
    {
      // filters: {
      //   tags: {
      //     $and: slugsArray.map((slug) => ({
      //       slug: {
      //         $eq: slug,
      //       },
      //     })),
      //   },
      // },
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
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

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

export const Tags = () => {
  const { tags, observations } = useLoaderData();
  return (
    <>
      <h1>
        <TmpTitle data={tags} />
      </h1>
      <ObservationList data={observations} />
      <dib>{observations.length}</dib>
    </>
  );
};

function TmpTitle({ data }) {
  return (
    // можно собрать строку заранее, обойтись без span и key
    <>
      {data.map((node) => (
        <span key={node.id}>
          {node.name}
          {node.id !== data[data.length - 1].id && <>, </>}
        </span>
      ))}
    </>
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

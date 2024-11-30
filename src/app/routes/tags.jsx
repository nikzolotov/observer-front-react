import { useLoaderData } from "react-router-dom";
import qs from "qs";

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

  const response = await fetch(
    `${import.meta.env.VITE_STRAPI_API_URL}tags?${query}`
  );
  const data = await response.json();
  return {
    tags: data.data,
  };
};

export const Tags = () => {
  const { tags } = useLoaderData();
  return (
    <>
      <h1>
        <TmpTitle data={tags} />
      </h1>
      <div>Here goes observations</div>
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

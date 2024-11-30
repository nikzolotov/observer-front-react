import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./routes/root";
import { HomeRoute, homeLoader } from "./routes/home";
import { ObservationRoute, observationLoader } from "./routes/observation";
import { TagsRoute, tagsLoader } from "./routes/tags";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    children: [
      {
        path: "",
        element: <HomeRoute />,
        loader: homeLoader,
      },
      {
        path: "observation/:observationId",
        element: <ObservationRoute />,
        loader: observationLoader,
      },
      {
        path: "tags/:slugs",
        element: <TagsRoute />,
        loader: tagsLoader,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./routes/root";
import { Home, homeLoader } from "./routes/home";
import { Observation, observationLoader } from "./routes/observation";
import { Tags, tagsLoader } from "./routes/tags";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "observation/:observationId",
        element: <Observation />,
        loader: observationLoader,
      },
      {
        path: "tags/:slugs",
        element: <Tags />,
        loader: tagsLoader,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

// import ErrorPage from "./error-page";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./routes/root";
import { Home, homeLoader } from "./routes/home";
import { Observation } from "./routes/observation";
import { Tags } from "./routes/tags";

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
      },
      {
        path: "tags/:tagsIds",
        element: <Tags />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

// import ErrorPage from "./error-page";

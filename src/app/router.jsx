import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./routes/root";
import { Home } from "./routes/home";
import { Observation } from "./routes/observation";
import { Tags } from "./routes/tags";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    // loader: rootLoader,
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
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
// import Contact from "./routes/contact";

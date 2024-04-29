import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import Discovery from "./pages/Discovery";
import NotFoundPage from "./pages/NotFoundPage";
import fetchAccessToken from "./fetchAccessToken";
import TermsOfUse from "./pages/TermsOfUse";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccess = fetchAccessToken();
          return authAccess;
        },
      },
      {
        path: "/research",
        element: <SearchPage />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccess = fetchAccessToken();
          return authAccess;
        },
      },
      {
        path: "/artist/:artistId",
        element: <ArtistPage />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccess = fetchAccessToken();
          return authAccess;
        },
      },
      {
        path: "/album/:albumId",
        element: <AlbumPage />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccess = fetchAccessToken();
          return authAccess;
        },
      },
      {
        path: "/discovery",
        element: <Discovery />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccess = fetchAccessToken();
          return authAccess;
        },
      },
      {
        path: "/CGU",
        element: <TermsOfUse />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccess = fetchAccessToken();
          return authAccess;
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

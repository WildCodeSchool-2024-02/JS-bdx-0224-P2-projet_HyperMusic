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
import shuffleArray from "./shuffleArray";
import artistIds from "./artistIds";
import albumIds from "./albumIds";
import musicIds from "./musicIds";

const getOnlyYear = (dateString) => `(${dateString.split("-")[0]})`;

const artistIdsString = artistIds.join(",");
const albumIdsString = albumIds.join(",");
const musicIdsString = musicIds.join(",");

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
          const authAccessPromise = fetchAccessToken();
          return authAccessPromise.then((authAccess) => {
            const artistPromise = fetch(
              `https://api.spotify.com/v1/artists?ids=${artistIdsString}`,
              authAccess
            )
              .then((result) => result.json())
              .then((data) => shuffleArray(data.artists).slice(0, 10))
              .catch((error) => {
                console.error("Error fetching artist data:", error);
              });

            const albumPromise = fetch(
              `https://api.spotify.com/v1/albums?ids=${albumIdsString}`,
              authAccess
            )
              .then((result) => result.json())
              .then((data) => {
                const shuffledAlbums = shuffleArray(data.albums).slice(0, 10);
                return shuffledAlbums.map((album) => ({
                  ...album,
                  releaseYear: getOnlyYear(album.release_date),
                }));
              })
              .catch((error) => {
                console.error("Error fetching album data:", error);
              });

            const musicPromise = fetch(
              `https://api.spotify.com/v1/tracks?ids=${musicIdsString}`,
              authAccess
            )
              .then((result) => result.json())
              .then((data) => shuffleArray(data.tracks).slice(0, 10))
              .catch((error) => {
                console.error("Error fetching music data:", error);
              });

            return Promise.all([
              artistPromise,
              albumPromise,
              musicPromise,
            ]).then(([artistData, albumData, musicData]) => ({
              artistData,
              albumData,
              musicData,
            }));
          });
        },
      },
      {
        path: "/research",
        element: <SearchPage />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccessPromise = fetchAccessToken();
          return authAccessPromise;
        },
      },
      {
        path: "/artist/:artistId",
        element: <ArtistPage />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccessPromise = fetchAccessToken();
          return authAccessPromise;
        },
      },
      {
        path: "/album/:albumId",
        element: <AlbumPage />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccessPromise = fetchAccessToken();
          return authAccessPromise;
        },
      },
      {
        path: "/discovery",
        element: <Discovery />,
        errorElement: <NotFoundPage />,
        loader() {
          const authAccessPromise = fetchAccessToken();
          return authAccessPromise;
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

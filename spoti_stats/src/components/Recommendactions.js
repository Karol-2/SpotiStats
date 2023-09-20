import { useState, useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";
import getUris from "../helper/getUris";
import fetchWebApi from "../helper/fetchWebApi";
import Playlist from "./Playlist";
import {
  faRefresh,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Recommendactions() {
  const [recommendations, setRecommendactions] = useState(null);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const token = useContext(TokenContext);

  if (recommendations === null && token) {
    setRecomIfToken(token);
  }
  async function setRecomIfToken(token) {
    if (token) {
      const allFiveSongs = await fetchWebApi(
        token,
        "me/top/tracks?time_range=short_term&limit=5"
      );
      const topTracksIds = [];
      allFiveSongs.items.forEach((song) => {
        topTracksIds.push(song.id);
      });

      const res = await fetchWebApi(
        token,
        `recommendations?limit=30&seed_tracks=${topTracksIds.join(",")}`,
        "GET"
      );
      setRecommendactions(res.tracks);
    } else console.log("token not found");
  }

  async function iniciatePlaylist() {
    if (recommendations) {
      const tracks = await getUris(recommendations);
      const createdPlaylist = await createPlaylist(tracks);
      console.log(createdPlaylist.name, createdPlaylist.id);
    }
  }

  async function createPlaylist(tracksUri) {
    const { id: user_id } = await fetchWebApi(token, "me", "GET");

    const playlist = await fetchWebApi(
      token,
      `users/${user_id}/playlists`,
      "POST",
      {
        name: "Check Those Out!",
        description:
          "Playlist of recommended songs based on your recent favourite tracks, xoxo ~SpotiStats",
        public: false,
      }
    );

    await fetchWebApi(
      token,
      `playlists/${playlist.id}/tracks?uris=${tracksUri.join(",")}`,
      "POST"
    );

    return playlist;
  }

  return (
    token && (
      <div className="background-animation-green p-5 md:mx-40 min-w-600 shadow-2xl mt-2 mb-2 md:m-10 rounded-xl ">
        <p className="lg:text-4xl text-2xl font-semibold mb-5">
          RECOMMENDACTIONS
        </p>
        <div className="flex justify-around space-x-1 sm:flex-col lg:flex-row flex-col space-y-10">
          <div className=" p-5 rounded-xl border-my-dark border-8 bg-my-dark text-my-red">
            <p className="  text-2xl">
              Here are 5 tracks based on your recent listening:
            </p>
            <ol>
              {recommendations &&
                recommendations.slice(0, 5).map((val, key) => {
                  return (
                    <div className="flex align-bottom mt-3" id={key} key={key}>
                      <span className="text-6xl self-middle text-my-green">
                        {key + 1}.
                      </span>{" "}
                      <div>
                        <a
                          className="text-2xl text-my-green font-bold"
                          href={val.external_urls.spotify}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {val.name}
                        </a>{" "}
                        <p className=" text-lg">{val.artists[0].name}</p>
                      </div>
                    </div>
                  );
                })}
            </ol>
          </div>

          <div className="flex flex-col content-between space-y-3">
            <div className="bg-my-dark p-3 rounded-xl">
              <Playlist songs={recommendations}></Playlist>
            </div>
            {!playlistCreated && (
              <button
                className=" p-3 rounded-full bg-my-dark font-bold text-my-green hover:bg-my-darker border-2 mr-8 ml-8 space-x-1 flex justify-center items-center"
                onClick={() => {
                  iniciatePlaylist();
                  setPlaylistCreated(true);
                }}
              >
                <p>Create a playlist</p>
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </button>
            )}
            <button
              className=" p-3 rounded-full bg-my-dark font-bold text-my-green hover:bg-my-darker border-2 mr-8 ml-8 space-x-1 flex justify-center items-center"
              onClick={() => {
                setRecomIfToken(token);
              }}
            >
              <p>Refresh</p> <FontAwesomeIcon icon={faRefresh} />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Recommendactions;

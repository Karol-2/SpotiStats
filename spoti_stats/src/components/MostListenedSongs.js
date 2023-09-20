import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import createPlaylist from "../helper/createPlaylist";
import fetchWebApi from "../helper/fetchWebApi";
import getUris from "../helper/getUris";
import Playlist from "./Playlist";

function MostListenedSongs() {
  const [playlistSongs, setPlaylistSongs] = useState(null);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const token = useContext(TokenContext);

  if (playlistSongs === null && token) {
    getSongs(token);
  }
  async function getSongs(token) {
    if (token) {
      const allFiftySongs = await fetchWebApi(
        token,
        "me/top/tracks?time_range=long_term&limit=50"
      );
      setPlaylistSongs(allFiftySongs.items);
    }
  }

  async function iniciatePlaylist() {
    if (playlistSongs) {
      const tracks = await getUris(playlistSongs);
      const createdPlaylist = await createPlaylist(
        tracks,
        token,
        "Favourites",
        "Playlist of your 50 most listened songs ever, WOW you have a great taste! xoxo ~SpotiStats"
      );
      console.log(createdPlaylist.name, " created");
    }
  }

  return (
    token && (
      <div className="background-animation-green p-5 md:mx-40 min-w-600 shadow-2xl mt-2 mb-2 md:m-10 rounded-xl flex flex-col items-center">
        <p className="text-4xl font-semibold mb-5 text-center">
          THE PLAYLIST OF FOREVER
        </p>
        <p className="text-xl mb-5 text-center">
          You can also create a playlist with your most listened tracks!
        </p>
        <div className="bg-my-dark p-3 rounded-xl max-3-4">
          <Playlist songs={playlistSongs} name="My favourites of all time" />
        </div>
        {!playlistCreated ? (
          <button
            className="p-3 rounded-full bg-my-dark font-bold text-my-green hover:bg-my-darker border-2 mr-8 ml-8 space-x-1 flex justify-center items-center max-w-lg"
            onClick={() => {
              iniciatePlaylist();
              setPlaylistCreated(true);
            }}
          >
            <p>Create a playlist</p>
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        ) : (
          <div className="text-lg font-semibold mt-3 opacity-50"> Done! </div>
        )}
      </div>
    )
  );
}

export default MostListenedSongs;

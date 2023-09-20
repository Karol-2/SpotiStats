import Playlist from "./Playlist";
import { useState, useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";
import getUris from "../helper/getUris";
import fetchWebApi from "../helper/fetchWebApi";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import createPlaylist from "../helper/createPlaylist";

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
      
    } else console.log("token not found");
  }

  async function iniciatePlaylist() {
    if (playlistSongs) {
      const tracks = await getUris(playlistSongs);
      const createdPlaylist = await createPlaylist(tracks,token,"Favourites","all time the best");
      console.log(createdPlaylist.name, " created");
    }
  }


  return (
    token && (
      <div className="background-animation-green p-5 md:mx-40 min-w-600 shadow-2xl mt-2 mb-2 md:m-10 rounded-xl">
        <p className="text-4xl font-semibold mb-5 text-center">
          THE PLAYLIST OF FOREVER
        </p>
        <p className="text-xl mb-5 text-center">
          You can also create a playlist with your most listened tracks!
        </p>
        <div className=" mx-1/4">
          <Playlist songs={playlistSongs} name="My favourites of all time"/>
        </div>
        {!playlistCreated && (
          <button
            className=" p-3 rounded-full bg-my-dark font-bold text-my-green hover:bg-my-darker border-2 mr-8 ml-8 space-x-1 flex justify-center items-center"
            onClick={() => {
              iniciatePlaylist();
              setPlaylistCreated(true)
            }}
          >
            <p>Create a playlist</p>
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        )}
      </div>
    )
  );
}

export default MostListenedSongs;

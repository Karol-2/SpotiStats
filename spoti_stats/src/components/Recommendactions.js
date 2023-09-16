import { useState, useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";
import getUris from "../helper/getUris";
import fetchWebApi from "../helper/fetchWebApi";
function Recommendactions() {
  const [recommendations, setRecommendactions] = useState(null);
  const [playlistCreated, setPlaylistCreated] = useState(false)
  const token = useContext(TokenContext);
 
  if (recommendations === null && token) {
    setRecomIfToken(token);
  }
  async function setRecomIfToken(token) {
    if (token) {
        const allFiveSongs = await fetchWebApi(token,"me/top/tracks?time_range=short_term&limit=5")
        const topTracksIds = []
        allFiveSongs.items.forEach(song => {
            topTracksIds.push(song.id)
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
          "Playlist of recommended songs based on your recent favourite tracks. xoxo SpotiStats",
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
      <div className="bg-my-red p-5 md:mx-40 min-w-600 rounded-md">
        <p className="text-3xl font-extrabold">RECOMMENDACTIONS</p>
        <p>Based on your recent listening:</p>
        {recommendations &&
          recommendations.slice(0, 5).map((val, key) => {
            return (
              <li>
                {val.name} - {val.artists[0].name}
              </li>
            );
          })}
        <p>And many others!</p>
        {!playlistCreated && (
             <button
             className="bg-my-blue"
             onClick={() => {
               iniciatePlaylist(); setPlaylistCreated(true)
             }}
           >
             Create a playlist with my recommendations!
           </button>
        )}
       
        
      </div>
    )
  );
}

export default Recommendactions;

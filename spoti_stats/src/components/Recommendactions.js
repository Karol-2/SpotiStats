import { useState, useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";
import getUris from "../helper/getUris";
import fetchWebApi from "../helper/fetchWebApi";
function Recommendactions() {
  const [recommendations, setRecommendactions] = useState(null);
  const token = useContext(TokenContext);
  const topTracksIds = [
    "5qIHFdkW6phMsTZlN2g8Lc",
    "0V3wPSX9ygBnCm8psDIegu",
    "1BxfuPKGuaTgP7aM0Bbdwr",
    "3YdH5OPiQQt39x7MpgOwUT",
    "0ug5NqcwcFR2xrfTkc7k8e",
  ];
  // TODO: change toptracksid to fetch

  if (recommendations === null && token) {
    setRecomIfToken(token);
  }

  async function setRecomIfToken(token) {
    if (token) {
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
        name: "SpotiStats recommendactions",
        description:
          "Playlist created by the tutorial on developer.spotify.com",
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
        <button
          className="bg-my-blue"
          onClick={() => {
            iniciatePlaylist();
          }}
        >
          Create a playlist with my recommendations!
        </button>
      </div>
    )
  );
}

export default Recommendactions;

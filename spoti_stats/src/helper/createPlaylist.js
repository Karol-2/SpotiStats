import fetchWebApi from "./fetchWebApi";

async function createPlaylist(tracksUri, token, name, description) {
  const { id: user_id } = await fetchWebApi(token, "me", "GET");
  const playlist = await fetchWebApi(
    token,
    `users/${user_id}/playlists`,
    "POST",
    {
      name: name,
      description: description,
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

export default createPlaylist;

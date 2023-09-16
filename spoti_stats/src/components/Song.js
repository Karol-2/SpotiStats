function Song({ song }) {
  return (
    <div className="flex flex-row-reverse bg-my-dark rounded-full p-5  m-2 font-bold justify-around">
      <p className=" place-self-center m-3 text-1xl text-my-green">
        {song.artists.map((val, key) => val.name + ",")}
      </p>
      <a
        href={song.album.external_urls.spotify}
        id="displayName"
        className=" place-self-center m-3 text-1xl text-my-green"
      >
        {song.album.name}
      </a>
      <p className=" place-self-center m-3 text-xl text-my-green">
        {song.name}
      </p>
      {song.album.images[0] && (
        <img
          id="avatar"
          src={song.album.images[0].url}
          alt="Album Cover"
          width="50"
          height="50"
          className=" place-self-center rounded-full border-2 border-my-green"
        />
      )}
    </div>
  );
}

export default Song;

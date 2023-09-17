function Song({ song }) {
  return (
    <div className="flex flex-row flex-wrap bg-my-dark rounded-2xl p-1 opacity-0 animate-fade-in m-1 font-semibold justify-between transition-transform transform hover:scale-110">
      {song.album.images[0] && (
        <img
          id="avatar"
          src={song.album.images[0].url}
          alt="Album Cover"
          width="50"
          height="50"
          className=" place-self-center rounded-full border-2 border-my-green rotate-animation"
        />
      )}
      <div className="flex flex-col text-right">
        <p className=" place-self-center  text-xl text-my-green self-end">
          {song.name}
        </p>
        <a className=" place-self-center text-sm text-my-green self-end" href="/">
          {song.artists.map((val, key) => val.name + ",")}
        </a>
      </div>
    </div>
  );
}

export default Song;
//TODO: napraw , w artystach
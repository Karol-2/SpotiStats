import React from "react";

const Playlist = (props) => {
  const name = props.name;
  const songs = props.songs;
  return (
    <div className="w-90 h-60 overflow-auto border border-gray-300  ">
      <p className="text-my-green font-bold text-xl">{name}</p>
      {songs &&
        songs.map((song, key) => {
          return (
            <div
              className="flex flex-row align-bottom flex-wrap even:bg-my-dark odd:bg-my-darker round-md min-w-3/4"
              id={key}
              key={key}
            >
              <div className="flex flex-row justify-between min-w-full ">
                <p className="text-lg self-middle text-my-green font-semibold">
                  {key + 1}.
                </p>{" "}
                <div className=" self-start text-center">
                  <p className="text-m text-my-green font-semibold">
                    {song.name}
                  </p>{" "}
                  <p className=" text-sm text-my-light">
                    {song.artists[0].name}
                  </p>
                </div>
                <p className="text-lg text-my-light self-center">
                  {new Date(song.duration_ms).toISOString().slice(14, 19)}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Playlist;

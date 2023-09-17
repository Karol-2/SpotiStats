import { useState, useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";
import Song from "./Song";

function TopArtists() {
  const [songsNumber, setSongsNumber] = useState(5);
  const [period, setPeriod] = useState("short_term");
  const [displayPeriod, setDisplayPeriod] = useState("from last month");
  const [songs, setSongs] = useState(null);

  const type = "tracks";

  const token = useContext(TokenContext);

  async function setDataIfToken(token) {
    if (token) {
      const profile = await fetchTracks(token);
      setSongs(profile);
    } else console.log("token not found");
  }

  async function fetchTracks(token) {
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/${type}?time_range=${period}&limit=${songsNumber}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return await result.json();
  }
  return (
    token && (
      <div className="bg-my-green p-5 md:mx-40 min-w-600 shadow-2xl m-10 rounded-xl  ">
        <div className="flex ">
        <div className=" w-1/2 p-4">
            {songs &&
              songs.items.map((val, key) => {
                return <Song song={val} id={key} key={key} />;
              })}
          </div>
          <div className="mb-8 w-1/2 p-4 text-center">
            <p className="text-4xl font-semibold mb-5">TOP TRACKS</p>
            <div className="flex justify-center flex-col">
              <p className=" text-xl mb-2"> Select a number of artists:</p>
              <div className="flex flex-row space-x-4 p-1 self-center flex-wrap">
                <label className="inline-flex items-center  bg-my-dark rounded-full p-2 text-my-light">
                  <input
                    type="radio"
                    name="songsNumber"
                    value="5"
                    checked={songsNumber === 5}
                    onChange={() => setSongsNumber(5)}
                    className="border rounded border-my-darks text-my-red font-bold w-6 h-6 "
                  />
                  <span>5</span>
                </label>

                <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light">
                  <input
                    type="radio"
                    name="songsNumber"
                    value="10"
                    checked={songsNumber === 10}
                    onChange={() => setSongsNumber(10)}
                    className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base"
                  />
                  <span>10</span>
                </label>

                <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light">
                  <input
                    type="radio"
                    name="songsNumber"
                    value="25"
                    checked={songsNumber === 25}
                    onChange={() => setSongsNumber(25)}
                    className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base"
                  />
                  <span>25</span>
                </label>

                <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light">
                  <input
                    type="radio"
                    name="songsNumber"
                    value="50"
                    checked={songsNumber === 50}
                    onChange={() => setSongsNumber(50)}
                    className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base"
                  />
                  <span>50</span>
                </label>
              </div>
              <p className=" text-xl mb-2 mt-5"> Select a period of time:</p>
              <div className="flex flex-row space-x-4 p-1 self-center flex-wrap">
                <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light">
                  <input
                    type="radio"
                    name="period"
                    value="short_term"
                    checked={period === "short_term"}
                    onChange={() => {
                      setPeriod("short_term");
                      setDisplayPeriod("from last month");
                    }}
                    className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base"
                  />
                  <span>1 Month</span>
                </label>

                <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light">
                  <input
                    type="radio"
                    name="period"
                    value="medium_term"
                    checked={period === "medium_term"}
                    onChange={() => {
                      setPeriod("medium_term");
                      setDisplayPeriod("from 6 months");
                    }}
                    className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base"
                  />
                  <span>6 Months</span>
                </label>

                <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light">
                  <input
                    type="radio"
                    name="period"
                    value="long_term"
                    checked={period === "long_term"}
                    onChange={() => {
                      setPeriod("long_term");
                      setDisplayPeriod("of all time");
                    }}
                    className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base"
                  />
                  <span>Of all time</span>
                </label>
              </div>

              <div className="flex justify-evenly flex-col p-5">
                <p className="text-2xl font-semibold p-1 text-center">
                  Show Top {songsNumber} tracks {displayPeriod}!
                </p>
                <button
                  className=" p-3 rounded-full bg-my-dark font-bold text-my-green hover:bg-my-darker border-2"
                  onClick={() => setDataIfToken(token)}
                >
                  Show {type}
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  );
}

export default TopArtists;

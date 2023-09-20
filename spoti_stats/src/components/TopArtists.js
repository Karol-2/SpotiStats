import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import fetchWebApi from "../helper/fetchWebApi";
import Artist from "./Artist";

function TopArtists() {
  const [artistsNumber, setArtistsNumber] = useState(5);
  const [period, setPeriod] = useState("short_term");
  const [displayPeriod, setDisplayPeriod] = useState("from last month");
  const [artists, setArtists] = useState(null);

  const type = "artists";

  const token = useContext(TokenContext);

  async function setDataIfToken(token) {
    if (token) {
      const profile = await fetchWebApi(token,`me/top/${type}?time_range=${period}&limit=${artistsNumber}`,"GET");
      setArtists(profile);
    };
  }

  return (
    token /*   <div className="  flex justify-center text-my-dark background-animation-green rounded-b-lg shadow-2xl"> */ && (
      <div className="background-animation-red p-5 md:mx-40 min-w-600 shadow-2xl mt-2 mb-2 md:m-10 rounded-xl">
        <p className="text-4xl font-semibold mb-5">TOP ARTISTS</p>
        <div className="flex justify-between space-x-5 flex-col lg:flex-row">
          <div className="mb-8">
            <p className=" text-xl mb-2"> Select a number of artists:</p>
            <div className="flex flex-row space-x-4 justify-evenly p-1 self-center flex-wrap">
              <label className="inline-flex items-center  bg-my-dark rounded-full p-2 text-my-light transform hover:scale-110">
                <input
                  type="radio"
                  name="artistsNumber"
                  value="5"
                  checked={artistsNumber === 5}
                  onChange={() => setArtistsNumber(5)}
                  className="border-my-dark text-my-red font-bold w-6 h-6 checked:bg-my-green"
                />
                <span>TOP 5</span>
              </label>

              <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light transform hover:scale-110 ">
                <input
                  type="radio"
                  name="artistsNumber"
                  value="10"
                  checked={artistsNumber === 10}
                  onChange={() => setArtistsNumber(10)}
                  className="border-my-dark text-my-red font-bold w-6 h-6 checked:bg-my-green "
                />
                <span>TOP 10</span>
              </label>

              <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light transform hover:scale-110">
                <input
                  type="radio"
                  name="artistsNumber"
                  value="25"
                  checked={artistsNumber === 25}
                  onChange={() => setArtistsNumber(25)}
                  className="border-my-dark text-my-red font-bold w-6 h-6 checked:bg-my-green"
                />
                <span>TOP 25</span>
              </label>

              <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light transform hover:scale-110">
                <input
                  type="radio"
                  name="artistsNumber"
                  value="50"
                  checked={artistsNumber === 50}
                  onChange={() => setArtistsNumber(50)}
                  className="border-my-dark text-my-red font-bold w-6 h-6 checked:bg-my-green"
                />
                <span>TOP 50</span>
              </label>
            </div>
            <p className=" text-xl mb-2 mt-5"> Select a period of time:</p>
            <div className="flex flex-row space-x-4  justify-evenly p-1 self-center flex-wrap">
              <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light transform hover:scale-110">
                <input
                  type="radio"
                  name="period"
                  value="short_term"
                  checked={period === "short_term"}
                  onChange={() => {
                    setPeriod("short_term");
                    setDisplayPeriod("from last month");
                  }}
                  className="border-my-dark text-my-red font-bold w-6 h-6 checked:bg-my-green"
                />
                <span>1 Month</span>
              </label>

              <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light transform hover:scale-110">
                <input
                  type="radio"
                  name="period"
                  value="medium_term"
                  checked={period === "medium_term"}
                  onChange={() => {
                    setPeriod("medium_term");
                    setDisplayPeriod("from 6 months");
                  }}
                  className="border-my-dark text-my-red font-bold w-6 h-6 checked:bg-my-green"
                />
                <span>6 Months</span>
              </label>

              <label className="inline-flex items-center space-x-2 bg-my-dark rounded-full p-2 text-my-light transform hover:scale-110">
                <input
                  type="radio"
                  name="period"
                  value="long_term"
                  checked={period === "long_term"}
                  onChange={() => {
                    setPeriod("long_term");
                    setDisplayPeriod("of all time");
                  }}
                  className="border-my-dark text-my-red font-bold w-6 h-6 checked:bg-my-green"
                />
                <span>Of all time</span>
              </label>
            </div>
          </div>
          <div className="flex justify-evenly flex-col p-5">
            <p className="text-2xl font-semibold p-1 text-center">
              Show Top {artistsNumber} artists {displayPeriod}!
            </p>
            <button
              className=" p-3 rounded-full bg-my-dark font-bold text-my-green hover:bg-my-darker border-2"
              onClick={() => setDataIfToken(token)}
            >
              Show {type}
            </button>
          </div>
        </div>
        <div className="flex flex-row flex-wrap space-x-10 space-y-5 justify-around lg:justify-evenly">
          {artists &&
            artists.items.map((val, index) => {
              return (
                <Artist profile={val} id={index} key={index} index={index} />
              );
            })}
        </div>
      </div>
    )
  );
}

export default TopArtists;

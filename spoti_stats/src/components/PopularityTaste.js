import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../contexts/TokenContext";
import fetchWebApi from "../helper/fetchWebApi";
import { BarChart } from "./BarChart";
import Artist from "./Artist";

function PopularityTaste() {
  const [artists, setArtists] = useState(null);
  const [selectedArtists, setSelectedArtists] = useState(null);

  const token = useContext(TokenContext);
  useEffect(() => {
    setDataIfToken(token);
  }, [token]);

  async function setDataIfToken(token) {
    if (token) {
      const profiles = await fetchWebApi(
        token,
        "me/top/artists?time_range=long_term&limit=50",
        "GET"
      );
      setArtists(profiles.items);
      chartData();
    } else console.log("token not found");
  }
  function select(max, min) {
    const inRange = [];
    if (artists) {
      artists.forEach((person) => {
        if (person.popularity >= min && person.popularity <= max) {
          inRange.push(person);
        }
      });
    }
    return inRange;
  }
  function chartData() {
    const data = [];
    const maxArray = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
    const minArray = [91, 81, 71, 61, 51, 41, 31, 21, 11, 0];
    if (artists) {
      for (let i = 0; i < maxArray.length; i++) {
        const allMatching = select(maxArray[i], minArray[i]);
        data.push(allMatching.length);
      }
    }
    return data;
  }

  return (
    token && (
      <div className="background-animation p-5 md:mx-40 min-w-600 shadow-2xl m-10 rounded-xl">
        <p className="text-4xl font-semibold mb-5 text-center">
          POPULARITY TASTE
        </p>
        <p className="text-xl font-thin mb-5 text-center">
          Every artists has a number associated with one's popularity. Those
          close to a 100 are more popular, those closer to 0 are less popular.
          Check how obscure is your music taste!
        </p>
        <div className=" bg-my-light p-2 rounded-xl">
          <BarChart aggregatedData={chartData()}></BarChart>
        </div>

        <hr className=" mt-3 mb-3"></hr>
        <p className="text-xl font-thin mb-5 text-center">
          You can also check which artists are within certain brackets.
        </p>
        <div className="flex flex-row justify-evenly mb-3">
          <button
            onClick={() => setSelectedArtists(select(100, 91))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            100 - 91
          </button>
          <button
            onClick={() => setSelectedArtists(select(90, 81))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            90 - 81
          </button>
          <button
            onClick={() => setSelectedArtists(select(80, 71))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            80 - 71
          </button>
          <button
            onClick={() => setSelectedArtists(select(70, 61))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            70 - 61
          </button>
          <button
            onClick={() => setSelectedArtists(select(60, 51))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            60 - 51
          </button>
        </div>
        <div className="flex flex-row justify-evenly mt-3">
          <button
            onClick={() => setSelectedArtists(select(50, 41))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            50 - 41
          </button>
          <button
            onClick={() => setSelectedArtists(select(40, 31))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            40 - 31
          </button>
          <button
            onClick={() => setSelectedArtists(select(30, 21))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            30 - 21
          </button>
          <button
            onClick={() => setSelectedArtists(select(20, 11))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            20 - 11
          </button>
          <button
            onClick={() => setSelectedArtists(select(10, 0))}
            className="bg-my-red p-2 rounded-3xl hover:bg-my-dark text-my-light font-bold"
          >
            10 - 0
          </button>
        </div>
        <hr className=" mt-3 mb-3"></hr>
        {selectedArtists && (
          <p className="text-xl font-thin mt-5 mv-5 text-center">
            Total artists: {selectedArtists.length}
          </p>
        )}
        <div className="flex flex-row flex-wrap space-x-10 space-y-5 justify-evenly">
          {selectedArtists &&
            selectedArtists.map((person, key) => {
              return <Artist profile={person} index={key} />;
            })}
        </div>
      </div>
    )
  );
}

export default PopularityTaste;

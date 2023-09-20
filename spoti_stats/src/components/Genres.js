import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import aggregateGeneres from "../helper/aggregateGeneres";
import fetchWebApi from "../helper/fetchWebApi";

function Genres() {
  const [mediumArtists, setMediumArtists] = useState(null);
  const [longArtists, setLongArtists] = useState(null);
  const [genresMedium, setGenresMedium] = useState(null);
  const [genresLong, setGenresLong] = useState(null);

  const token = useContext(TokenContext);

  if (mediumArtists === null && token) {
    setDataIfToken(token);
  }
  useEffect(() => {
    if (mediumArtists) {
      setGenresMedium(aggregateGeneres(mediumArtists));
    }
    if (longArtists) {
      setGenresLong(aggregateGeneres(longArtists));
    }
  }, [mediumArtists, longArtists]);

  async function setDataIfToken(token) {
    if (token) {
      const fromLastYear = await fetchWebApi(
        token,
        "me/top/artists?time_range=medium_term&limit=50",
        "GET"
      );
      setMediumArtists(fromLastYear.items);
      const allTime = await fetchWebApi(
        token,
        "me/top/artists?time_range=long_term&limit=50",
        "GET"
      );
      setLongArtists(allTime.items);
    }
  }

  return (
    token && (
      <div className="background-animation-red p-5 md:mx-40 min-w-600 shadow-2xl mt-2 mb-2 md:m-10 rounded-xl">
        <p className="text-4xl font-semibold mb-5 text-center">GENRES</p>
        <div className="flex text-center space-x-1 flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:p-4 mb-3 bg-my-dark rounded-2xl transition-transform transform hover:scale-105">
            <p className="text-2xl font-semibold text-my-green">
              Top genres from last year
            </p>
            <hr className=" mt-3 mb-3 border-my-red"></hr>
            <ul>
              {genresMedium &&
                genresMedium.map((val, key) => {
                  return (
                    <div
                      id={key}
                      key={key}
                      className=" odd:text-my-red even:text-my-green font-semibold text-xl"
                    >
                      {" "}
                      {key + 1}. {val[0]} ({val[1]})
                    </div>
                  );
                })}
            </ul>
          </div>

          <div className="lg:w-1/2 lg:p-4 bg-my-green rounded-2xl transition-transform transform hover:scale-105">
            <p className="text-2xl font-semibold text-my-dark">
              Top genres of all time
            </p>
            <hr className=" mt-3 mb-3"></hr>
            <ul>
              {genresLong &&
                genresLong.map((val, key) => {
                  return (
                    <div
                      id={key}
                      key={key}
                      className=" odd:text-my-dark even:text-my-red font-semibold text-xl"
                    >
                      {" "}
                      {key + 1}. {val[0]} ({val[1]})
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    )
  );
}

export default Genres;

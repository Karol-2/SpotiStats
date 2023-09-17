import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../contexts/TokenContext";
import aggregateGeneres from "../helper/aggregateGeneres";

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
      const fromLastYear = await fetchArtists(token, "medium_term");
      setMediumArtists(fromLastYear.items);
      const allTime = await fetchArtists(token, "long_term");
      setLongArtists(allTime.items);
    } else console.log("token not found");
  }

  async function fetchArtists(token, period) {
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${period}&limit=50`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return await result.json();
  }
  return (
    token && (
      <div className="bg-my-blue p-5 md:mx-40 min-w-600">
        <p className="text-4xl font-semibold mb-5 text-center">GENRES</p>
        <div className="flex text-center">
          <div className="w-1/2 p-4 bg-my-dark rounded-2xl">
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

          <div className="w-1/2 p-4 bg-my-green rounded-2xl">
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

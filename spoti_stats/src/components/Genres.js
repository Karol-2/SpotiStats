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
      <div className="bg-my-green p-5 md:mx-40 min-w-600 rounded-md">
        <p className="text-3xl font-extrabold">Genres</p>
        <div className="flex">
          <div className="w-1/2 p-4">
            <p>Top genres from last year</p>
            <ul>
              {genresMedium &&
                genresMedium.map((val, key) => {
                  return (
                    <li id={key}>
                      {" "}
                      {key + 1}. {val[0]} - {val[1]}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="w-1/2 p-4">
            <p>Top genres of all time</p>
            <ul>
              {genresLong &&
                genresLong.map((val, key) => {
                  return (
                    <li id={key}>
                      {" "}
                      {key + 1}. {val[0]} - {val[1]}
                    </li>
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

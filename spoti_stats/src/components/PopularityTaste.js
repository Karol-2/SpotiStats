import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../contexts/TokenContext";
import fetchWebApi from "../helper/fetchWebApi";

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
    setSelectedArtists(inRange);
  }

  return (
    token && (
      <div className="bg-my-yellow p-5 md:mx-40 min-w-600 rounded-md">
        <p className="text-3xl font-extrabold">POPULARITY TASTE</p>
        <button onClick={() => select(100, 91)}>100 - 91</button>
        <button onClick={() => select(90, 81)}>90 - 81</button>
        <button onClick={() => select(80, 71)}>80 - 71</button>
        <button onClick={() => select(70, 61)}>70 - 61</button>
        <button onClick={() => select(60, 51)}>60 - 51</button>
        <button onClick={() => select(50, 41)}>50 - 41</button>
        <button onClick={() => select(40, 31)}>40 - 31</button>
        <button onClick={() => select(30, 21)}>30 - 21</button>
        <button onClick={() => select(20, 11)}>20 - 11</button>
        <button onClick={() => select(10, 0)}>10 - 0</button>
        {selectedArtists && (<p>Total artists: {selectedArtists.length}</p>)}
        {selectedArtists && selectedArtists.map((person,key)=> {
            return <li>{person.name}</li>
        })}
        
      </div>
    )
  );
}

export default PopularityTaste;

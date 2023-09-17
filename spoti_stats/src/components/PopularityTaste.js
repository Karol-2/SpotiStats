import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../contexts/TokenContext";
import fetchWebApi from "../helper/fetchWebApi";
import { BarChart } from "./BarChart";

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
      chartData()
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
    return inRange
  }
  function chartData(){
    const data = []
    const maxArray = [100,90,80,70,60,50,40,30,20,10]
    const minArray = [91,81,71,61,51,41,31,21,11,0]
    if(artists){
        for (let i = 0; i < maxArray.length; i++) {
            const allMatching = select(maxArray[i],minArray[i])
            data.push(allMatching.length)       
        }
    }
    return data
  }

  return (
    token && (
      <div className="bg-my-yellow p-5 md:mx-40 min-w-600 rounded-md">
        <p className="text-3xl font-extrabold">POPULARITY TASTE</p>
        <BarChart aggregatedData={chartData()}></BarChart>
        <button onClick={() => setSelectedArtists(select(100, 91))}>100 - 91</button>
        <button onClick={() => setSelectedArtists(select(90, 81))}>90 - 81</button>
        <button onClick={() => setSelectedArtists(select(80, 71))}>80 - 71</button>
        <button onClick={() => setSelectedArtists(select(70, 61))}>70 - 61</button>
        <button onClick={() => setSelectedArtists(select(60, 51))}>60 - 51</button>
        <button onClick={() => setSelectedArtists(select(50, 41))}>50 - 41</button>
        <button onClick={() => setSelectedArtists(select(40, 31))}>40 - 31</button>
        <button onClick={() => setSelectedArtists(select(30, 21))}>30 - 21</button>
        <button onClick={() => setSelectedArtists(select(20, 11))}>20 - 11</button>
        <button onClick={() => setSelectedArtists(select(10, 0))}>10 - 0</button>
        {selectedArtists && (<p>Total artists: {selectedArtists.length}</p>)}
        {selectedArtists && selectedArtists.map((person,key)=> {
            return <li>{person.name}</li>
        })}
        
      </div>
    )
  );
}

export default PopularityTaste;

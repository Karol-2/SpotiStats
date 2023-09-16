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
    if (token){
      const profile = await fetchTracks(token);
      setSongs(profile);
    }else (console.log("token not found"))
    
  }

  async function fetchTracks(token) {
    const result = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${period}&limit=${songsNumber}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return await result.json();
  }
  return ( token &&(
    <div className="bg-my-blue p-5 md:mx-40 min-w-600 rounded-md">
      <p className="text-3xl font-extrabold">TOP TRACKS</p>
      <div className="flex justify-between flex-col font-bold">
        <div className="flex flex-row justify-center space-x-4 p-1 ">
          <button
            onClick={() => setSongsNumber(5)}
            className="border rounded border-my-yellow text-my-yellow font-bold w-7 h-7 text-base"
          >
            5
          </button>
          <button
            onClick={() => setSongsNumber(10)}
            className="border rounded border-my-yellow text-my-yellow font-bold w-7 h-7 text-base"
          >
            10
          </button>
          <button
            onClick={() => setSongsNumber(25)}
            className="border rounded border-my-yellow text-my-yellow font-bold w-7 h-7 text-base"
          >
            25
          </button>
          <button
            onClick={() => setSongsNumber(50)}
            className="border rounded border-my-yellow text-my-yellow font-bold w-7 h-7 text-base"
          >
            50
          </button>
        </div>
        <div className="flex flex-row justify-center space-x-4 p-1">
          <button
            onClick={() => {
              setPeriod("short_term");
              setDisplayPeriod("from last month");
            }}
            className="border rounded border-my-yellow text-my-yellow font-bold text-base p-1"
          >
            1 Month
          </button>
          <button
            onClick={() => {
              setPeriod("medium_term");
              setDisplayPeriod("from  6 months");
            }}
            className="border rounded border-my-yellow text-my-yellow font-bold text-base p-1"
          >
            6 Months
          </button>
          <button
            onClick={() => {
              setPeriod("long_term");
              setDisplayPeriod("of all time");
            }}
            className="border rounded border-my-yellow text-my-yellow font-bold text-base p-1"
          >
            Of all time
          </button>
        </div>
      </div>
      <p className="text-2xl font-bold p-1">
        Show Top {songsNumber} tracks {displayPeriod}!
      </p>
      <button 
      className=" p-3 border rounded-full bg-my-green font-bold text-my-yellow" 
      onClick={()=>setDataIfToken(token)} 
     >
        Show top {type}
      </button>
      {songs && songs.items.map((val,key)=>{
        return <Song song={val} id={key} key={key} />
      })}
    </div>
  ))
}

export default TopArtists;

import { useState } from "react";

function TopArtists() {
    const [artistsNumber, setArtistsNumber] = useState(5)
    const [period, setPeriod] = useState("short_term")
    const [displayPeriod, setDisplayPeriod] = useState("from last month")
    const type="artists"
    return (
      <div className='bg-my-yellow p-5 md:mx-40 min-w-600 rounded-md'>   
      <p className="text-3xl font-extrabold">TOP ARTISTS</p>
          <div className="flex justify-between flex-col font-bold">
                <div className="flex flex-row justify-center space-x-4 p-1 ">
                    <button onClick={() =>setArtistsNumber(5)} 
                    className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base">5</button>
                    <button onClick={()=>setArtistsNumber(10)} className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base">10</button>
                    <button onClick={()=>setArtistsNumber(25)} className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base">25</button>
                    <button onClick={()=>setArtistsNumber(50)} className="border rounded border-my-blue text-my-blue font-bold w-7 h-7 text-base">50</button>
                </div>
                <div className="flex flex-row justify-center space-x-4 p-1">
                    <button onClick={() =>{setPeriod("short_term"); setDisplayPeriod("from last month")}}  className="border rounded border-my-blue text-my-blue font-bold text-base p-1">1 Month</button>
                    <button onClick={()=>{setPeriod("medium_term"); setDisplayPeriod("from  4 months")}}  className="border rounded border-my-blue text-my-blue font-bold text-base p-1">6 Months</button>
                    <button onClick={()=>{setPeriod("long_term"); setDisplayPeriod("of all time")}}  className="border rounded border-my-blue text-my-blue font-bold text-base p-1">Of all time</button>
                </div>
            </div> 
            <p className="text-2xl font-bold p-1">
            Show Top {artistsNumber} artists {displayPeriod}!
            </p>
          <button className=" p-3 border rounded-full bg-my-green font-bold text-my-yellow">
            Show top {type}, {period}
            </button>
      </div>
    );
  }
  
export default TopArtists
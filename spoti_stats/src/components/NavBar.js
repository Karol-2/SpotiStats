import redirectToAuthCodeFlow from "../helper/redirectToAuthCodeFlow";
import { useContext} from "react";
import { TokenContext } from "../contexts/TokenContext";

function NavBar({clientId}) {
  const token = useContext(TokenContext)

    return (
      <div className='bg-my-red flex flex-auto flex-row justify-evenly'>   
      <div className=' p-5 md:mx-40 min-w-600 rounded-md justify-between'>  
          <p className=" text-3xl font-bold"> SpotiStats</p>
          { !token ? (
            <button className='bg-my-dark rounded-full p-2 text-my-green m-2 font-bold'
            onClick={()=> redirectToAuthCodeFlow(clientId)}>Login to Spotify</button>   
          ):<></>}
                  
          </div>
      </div>
    );
  }
  
export default NavBar
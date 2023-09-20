import redirectToAuthCodeFlow from "../helper/redirectToAuthCodeFlow";
import { useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";

function LoginPanel({ clientId }) {
  const token = useContext(TokenContext);

  return (
    <>
      {!token ? (
        <div className="background-animation-green  md:mx-40 min-w-600 text-my-dark rounded-b-lg shadow-2xl h-full">
          <div className=" p-5 lg:mx-40 min-w-600 rounded-md justify-between">
            <p className=" text-2xl text-left mt-5 mb-8 font-semibold">
              SpotiStats
            </p>
            <p className=" text-5xl md:text-7xl text-left opacity-0 animate-fade-in">
              WELCOME TO YOUR DATA-SAVVY MUSIC PARADISE
            </p>

            <button
              className="bg-my-dark rounded-full p-5 text-my-green m-2 font-semibold text-center text-3xl mt-8 mb-8 hover:bg-my-darker opacity-0 animate-fade-in"
              onClick={() => redirectToAuthCodeFlow(clientId)}
            >
              Log in with Spotify
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default LoginPanel;

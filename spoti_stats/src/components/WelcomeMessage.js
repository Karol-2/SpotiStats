import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
import fetchWebApi from "../helper/fetchWebApi";

function WelcomeMessage() {
  const [profile, setProfile] = useState(null);
  const token = useContext(TokenContext);

  if (token) {
    setProfileIfToken(token);
  }

  async function setProfileIfToken(token) {
    if (profile === null) {
      const profile = await fetchWebApi(token, "me", "GET");
      setProfile(profile);
    }
  }

  function isPremium(profile) {
    return profile.product === "premium";
  }

  return (
    <div className=" md:mx-40 min-w-600 flex justify-center text-my-dark background-animation-green rounded-b-lg shadow-2xl">
      {profile ? (
        <div className="min-w-full flex flex-col p-5">
          <p className=" text-2xl text-left mt-5 mb-8 font-semibold">
            SpotiStats
          </p>
          <p className=" text-7xl text-center opacity-0 animate-fade-in">
            WELCOME
          </p>
          <div className="flex flex-row-reverse bg-my-dark rounded-full hover:bg-my-darker p-5  m-2 font-bold justify-around max-w-lg place-self-center mt-8 mb-8 opacity-0 animate-fade-in">
            <a
              href={profile.external_urls.spotify}
              id="displayName"
              className=" place-self-center m-3 text-3xl text-my-green"
              target="_blank"
              rel="noreferrer noopener"
            >
              {profile.display_name}
            </a>
            {profile.images[0] && (
              <img
                id="avatar"
                src={profile.images[0].url}
                alt="Profile Avatar"
                width="50"
                height="50"
                className=" place-self-center rounded-full border-2 border-my-green"
              />
            )}
          </div>
          {profile && !isPremium(profile) && (
            <p className=" text-center font-extrabold">
              It seems that you are a non-premium Spotify user. Some content
              might not work properly!
            </p>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default WelcomeMessage;

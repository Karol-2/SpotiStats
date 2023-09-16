import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";

function WelcomeMessage() {
  const [profile, setProfile] = useState(null);
  const token = useContext(TokenContext);

  if (token) {
    setProfileIfToken(token);
  }

  async function setProfileIfToken(token) {
    if (profile===null){const profile = await fetchProfile(token);
      setProfile(profile);}
    
  }

  async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return await result.json();
  }

  return (
    <div className=" p-5 md:mx-40 min-w-600 rounded-md flex justify-center">
      {profile ? (
        <div>
          <p className="text-3xl font-extrabold flex justify-center">WELCOME</p>
          <div className="flex flex-row-reverse bg-my-dark rounded-full p-5  m-2 font-bold justify-around">
            <a
              href={profile.external_urls.spotify}
              id="displayName"
              className=" place-self-center m-3 text-3xl text-my-green"
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
        </div>
      ) : (
        <div className=" text-center">
          <p className="text-5xl">Welcome to SpotiStats!</p>
          <p className="text-2xl">Please login to your spotify account</p>
        </div>
      )}
    </div>
  );
}

export default WelcomeMessage;

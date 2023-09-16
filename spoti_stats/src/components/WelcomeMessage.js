import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";

function WelcomeMessage() {
  const [profile, setProfile] = useState(null);
  
  const token = useContext(TokenContext)

  if (token) {
    setProfileIfToken(token)
  }

  async function setProfileIfToken(token){
    const profile = await fetchProfile(token);
    setProfile(profile);
  }

  async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
  }


    return (
      <div>
      {profile ? (
        <div>
          <h1 id="displayName">{profile.display_name}</h1>
          {profile.images[0] && (
            <div>
              <img
                id="avatar"
                src={profile.images[0].url}
                alt="Profile Avatar"
                width="200"
                height="200"
              />
            </div>
          )}
          <p id="id">{profile.id}</p>
          <p id="email">{profile.email}</p>
          <p id="uri">
            <a href={profile.external_urls.spotify}>{profile.uri}</a>
          </p>
          
        </div>
      ) : (
        <div>
          <p>Oczekiwanie na token....</p>
          
        </div>
        
      )}
    </div>
    );
  }
  
export default WelcomeMessage
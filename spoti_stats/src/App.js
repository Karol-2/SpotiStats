import Genres from "./components/Genres";
import LoginPanel from "./components/LoginPanel";
import PopularityTaste from "./components/PopularityTaste";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Recommendactions from "./components/Recommendactions";
import TopArtists from "./components/TopArtists";
import TopSongs from "./components/TopSongs";
import WelcomeMessage from "./components/WelcomeMessage";
import { TokenContext } from "./contexts/TokenContext";
import React, { useEffect, useState, useContext } from "react";

const clientId = "c2345cf62ae34942aba348fb3ae730e3";

function App() {
  const [accessToken, setAccessToken] = useState(useContext(TokenContext));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      getAccessToken(clientId, code);
    }
  }, []);

  async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback");
    // params.append("redirect_uri", "https://spotistats-ai97.onrender.com/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const { access_token } = await result.json();
    setAccessToken(access_token);
  }

  return (
    <TokenContext.Provider value={accessToken}>
      <div className=" bg-my-light text-my-dark min-h-screen" > 
      
      <LoginPanel clientId={clientId}> </LoginPanel>
        <WelcomeMessage></WelcomeMessage>
        <TopArtists></TopArtists>
        <TopSongs></TopSongs>
        <Genres></Genres>
        <Recommendactions></Recommendactions>
        <PopularityTaste></PopularityTaste>
        <PrivacyPolicy></PrivacyPolicy>
      
       
      </div>
    </TokenContext.Provider>
  );
}

export default App;

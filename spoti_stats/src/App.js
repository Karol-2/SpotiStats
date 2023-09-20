import React, { useContext, useEffect, useState } from "react";
import Genres from "./components/Genres";
import LoginPanel from "./components/LoginPanel";
import MostListenedSongs from "./components/MostListenedSongs";
import PopularityTaste from "./components/PopularityTaste";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Recommendactions from "./components/Recommendactions";
import TopArtists from "./components/TopArtists";
import TopSongs from "./components/TopSongs";
import WelcomeMessage from "./components/WelcomeMessage";
import { TokenContext } from "./contexts/TokenContext";
import getAccessToken from "./helper/getAccessToken";

const clientId = "c2345cf62ae34942aba348fb3ae730e3";

function App() {
  const [accessToken, setAccessToken] = useState(useContext(TokenContext));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      prepareToken(code)
    }
  }, []);

  async function prepareToken(code){
    const token = await getAccessToken(clientId, code);
    setAccessToken(token);
  }

 

  return (
    <TokenContext.Provider value={accessToken}>
      <div className=" bg-my-light text-my-dark min-h-screen dark:bg-my-dark flex-col justify-between">
        <LoginPanel clientId={clientId}> </LoginPanel>
        <WelcomeMessage></WelcomeMessage>
        <TopArtists></TopArtists>
        <TopSongs></TopSongs>
        <Genres></Genres>
        <Recommendactions></Recommendactions>
        <PopularityTaste></PopularityTaste>
        <MostListenedSongs />
        <PrivacyPolicy></PrivacyPolicy>
      </div>
    </TokenContext.Provider>
  );
}

export default App;

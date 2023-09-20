import generateCodeChallenge from "./generateCodeChallenge";
import generateCodeVerifier from "./generateCodeVerifier";

async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  const redirectUri = process.env.REACT_APP_REDIRECT_URI ? process.env.REACT_APP_REDIRECT_URI: "http://localhost:3000/callback" ;
  console.log("wszystkie",process.env)
  console.log("to",process.env.REDIRECT_URI)
  console.log("redir", redirectUri)

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirectUri);
  //  params.append("redirect_uri", "https://spotistats-ai97.onrender.com/callback");
  params.append(
    "scope",
    "user-read-private user-top-read playlist-modify-private"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export default redirectToAuthCodeFlow;

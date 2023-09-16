import generateCodeChallenge from "./generateCodeChallenge"
import generateCodeVerifier from "./generateCodeVerifier"

async function redirectToAuthCodeFlow(clientId) {
  console.log(clientId)
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("scope", "user-read-private user-read-email user-top-read user-library-read playlist-modify-private");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

export default redirectToAuthCodeFlow
async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");
  const redirectUri = process.env.REDIRECT_URI
    ? process.env.REDIRECT_URI
    : "http://localhost:3000/callback";

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  // params.append("redirect_uri", "https://spotistats-ai97.onrender.com/callback");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();

  return access_token;
}

export default getAccessToken;

async function fetchWebApi(token, endpoint, method, body) {
  const result = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    method: method,
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const res = await result.json();
  return res;
}

export default fetchWebApi;

// TODO: użyj use context do przechowywania tokenu
function WelcomeMessage({profile}) {
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
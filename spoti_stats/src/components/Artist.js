
function Artist({profile}) {
      return (
        
        <div className="flex flex-row-reverse bg-my-dark rounded-full p-5  m-2 font-bold justify-around">
            
          <a
            href={profile.external_urls.spotify}
            id="displayName"
            className=" place-self-center m-3 text-1xl text-my-green"
          >
            {profile.name}
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
      );
    }
    
  export default Artist
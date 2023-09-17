function Artist(props) {
  const profile = props.profile
  const index = props.index
 console.log(profile)
  return (
    <div className=' bg-my-dark rounded-2xl p-4 flex flex-col justify-center text-center'>
      
      {profile.images[0] && (
        <img
          id="avatar"
          src={profile.images[0].url}
          alt="Artist Avatar"
          width="50"
          height="50"
          className=" rounded-full border-2 border-my-green self-center"
        />
      )}
      <p className="font-bold text-my-green">{index+1}.</p>
      <a
        href={profile.external_urls.spotify}
        id="displayName"
        className=" text-my-green"
      >
        {profile.name}
      </a>
      
    </div>
  );
}

export default Artist;

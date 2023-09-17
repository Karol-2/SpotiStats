function Artist(props) {
  const profile = props.profile;
  const index = props.index;

  return (
    <div
      id={index}
      className=" bg-my-dark rounded-2xl p-4 flex flex-col opacity-0 animate-fade-in justify-center text-center transition-transform transform hover:scale-110"
    >
      {profile.images[0] && (
        <img
          id="avatar"
          src={profile.images[0].url}
          alt="Artist Avatar"
          width="100"
          height="100"
          className=" rounded-full border-2 border-my-green self-center"
        />
      )}
      <p className="font-bold text-my-green">{index + 1}.</p>
      <a
        href={profile.external_urls.spotify}
        id="displayName"
        className=" text-my-green"
        target="_blank"
        rel="noreferrer noopener"
      >
        {profile.name}
      </a>
    </div>
  );
}

export default Artist;

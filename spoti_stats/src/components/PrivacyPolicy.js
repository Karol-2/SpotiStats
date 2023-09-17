function PrivacyPolicy() {
  return (
    <div className=" text-center p-5 md:mx-40 min-w-600 rounded-md">
      <p>Privacy Policy</p>
      <p className=" font-thin text-sm">
        SpotiStats was developed as an open source app powered by the Spotify
        Web API. By choosing to use this app, you agree to the use of your
        Spotify account username and data for your top artists and tracks.
      </p>
      <p className=" font-thin text-sm">
        None of the data used by SpotiStats is stored or collected anywhere, and
        it is NOT shared with any third parties. All information is used solely
        for displaying your data.
      </p>
      <p><span>&copy;</span> <a href="https://github.com/Karol-2" target="_blank" rel="noreferrer noopener" >Karol Krawczykiewicz 2023 </a></p>
    </div>
  );
} 

export default PrivacyPolicy;

function getUris(recommendations) {
    const tracksUri = [];
    recommendations.forEach((obj) => {
      tracksUri.push(obj.uri);
    });
    console.log(tracksUri);
    return tracksUri;
  }

  export default getUris
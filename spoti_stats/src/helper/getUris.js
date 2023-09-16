function getUris(recommendations) {
    const tracksUri = [];
    recommendations.forEach((obj) => {
      tracksUri.push(obj.uri);
    });
    return tracksUri;
  }

  export default getUris
function aggregateGeneres(listOfArtists) {
  const allGenres = [];
  const genreCounts = {};
  listOfArtists.forEach((obj) => {
    allGenres.push(...obj.genres);
  });

  allGenres.forEach((genre) => {
    if (genreCounts[genre]) {
      genreCounts[genre]++;
    } else {
      genreCounts[genre] = 1;
    }
  });

  const sortedGenreCounts = Object.entries(genreCounts).sort(
    (a, b) => b[1] - a[1]
  );
  const topTen = sortedGenreCounts.slice(0, 10);

  return topTen;
}

export default aggregateGeneres;

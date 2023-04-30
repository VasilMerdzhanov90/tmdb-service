const { default: axios } = require("axios");
const {
  movieRequestLinks,
  seriesRequestLinks,
  personRequestLinks,
} = require("./linksAndAPI");

async function request(fullURL) {
  try {
    const response = await axios.get(fullURL);

    if (response.status) {
      return response;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw new Error(err);
  }
}

function fetchURLData() {
  let url = "";
  // const loadMovies = async (category, page) => {
  //   return await request(movieRequestLinks[category](page));
  // };

  // const loadSeries = async (category, page) => {
  //   return await request(seriesRequestLinks[category](page));
  // };

  const loadBaseContent = async (type, category, page) => {
    url =
      type === "movies"
        ? movieRequestLinks[category](page)
        : seriesRequestLinks[category](page);
    return await request(url);
  };

  const videoDataLoader = async (movieId) => {
    return await request(movieRequestLinks.videoSearch(movieId));
  };

  const searchById = async (id, category) => {
    url =
      category === "movies"
        ? movieRequestLinks.movieSearchById(id)
        : seriesRequestLinks.seriesSearchById(id);
    return await request(url);
  };

  const getCredits = async (id, category) => {
    url =
      category === "movies"
        ? movieRequestLinks.movieCredits(id)
        : seriesRequestLinks.seriesCredits(id);
    return await request(url);
  };

  const getVideoList = async (id, category) => {
    url =
      category === "movies"
        ? movieRequestLinks.videoSearch(id)
        : seriesRequestLinks.videoSearch(id);
    return await request(url);
  };

  const getPersonDetails = async (id) => {
    return await request(personRequestLinks.personDetails(id));
  };

  const getPersonCredits = async (id) => {
    return await request(personRequestLinks.personCombinedCredits(id));
  };

  const searchByKeyWord = async (query, page, type) => {
    if (type === "movies") {
      return await request(movieRequestLinks.movieSearch(query, page));
    } else if (type === "series") {
      return await request(seriesRequestLinks.seriesSearch(query, page));
    } else if (type === "person") {
      return await request(personRequestLinks.searchPerson(query, page));
    }
  };

  return {
    // loadMovies,
    // loadSeries,
    loadBaseContent,
    videoDataLoader,
    searchById,
    getCredits,
    getVideoList,
    getPersonDetails,
    getPersonCredits,
    searchByKeyWord,
  };
}

module.exports = { fetchURLData };

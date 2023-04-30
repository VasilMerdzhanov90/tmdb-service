const { default: axios } = require("axios");
const {
  movieRequestLinks,
  seriesRequestLinks,
  personRequestLinks,
} = require("./linksAndAPI");

const baseURL = "https://api.themoviedb.org/3";
const trailerURL = "https://api.themoviedb.org/3/movie/";

async function request(fullURL) {
  console.log(fullURL);
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
  // OK!!!
  const loadMovies = async (category, page) => {
    url = movieRequestLinks[category](page);
    return await request(url);
  };

  // OK!!!
  const loadSeries = async (category, page) => {
    url = seriesRequestLinks[category](page);
    return await request(url);
  };

  // OK!!!
  const videoDataLoader = async (movieId) => {
    url = trailerURL + movieId + movieRequestLinks.videoSearch;
    return await request(url);
  };

  // OK!!!
  const searchById = async (id, category) => {
    const urlStructure =
      category === "movies"
        ? movieRequestLinks.movieSearchById(id)
        : seriesRequestLinks.seriesSearchById(id);
    url = urlStructure;
    return await request(url);
  };

  // OK!!!
  const getCredits = async (id, category) => {
    const urlStructure =
      category === "movies"
        ? movieRequestLinks.movieCredits(id)
        : seriesRequestLinks.seriesCredits(id);
    url = urlStructure;

    return await request(url);
  };

  // OK!!!
  const getVideoList = async (id, category) => {
    const urlStructure =
      category === "movies"
        ? movieRequestLinks.videoSearch(id)
        : seriesRequestLinks.videoSearch(id);
    url = urlStructure;
    return await request(url);
  };

  // OK!!!
  const getPersonDetails = async (id) => {
    const url = personRequestLinks.personDetails(id);
    return await request(url);
  };

  // OK!!!
  const getPersonCredits = async (id) => {
    const url = personRequestLinks.personCombinedCredits(id);
    return await request(url);
  };

  // OK!!!
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
    loadMovies,
    loadSeries,
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

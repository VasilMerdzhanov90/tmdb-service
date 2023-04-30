const baseVideoURL = "https://www.youtube.com/embed/";
const baseURL = "https://api.themoviedb.org/3";


const movieRequestLinks = {
  upcoming: (page) =>
    `${baseURL}/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=${page}`, // OK!!! 
  playing: (page) =>
    `${baseURL}/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=${page}`, // OK!!!
  trending: (page) =>
    `${baseURL}/trending/all/week?api_key=${process.env.API_KEY}&language=en-US&page=${page}`, // OK!!!
  action: (page) =>
    `${baseURL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=28&page=${page}`, // OK!!!
  comedy: (page) =>
    `${baseURL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=35&page=${page}`, // OK!!!
  horror: (page) =>
    `${baseURL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=27&page=${page}`, // OK!!!
  romance: (page) =>
    `${baseURL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=10749&page=${page}`, // OK!!!
  movieSearch: (query, page = 1) =>
    `${baseURL}/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${query}&page=${page}`, // OK!!!
  videoSearch: (id) =>
    `${baseURL}/movie/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`,
  movieSearchById: (id) =>
    `${baseURL}/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`,
  movieCredits: (id) =>
    `${baseURL}/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`,
};


const seriesRequestLinks = {
  rated: (page) =>
    `${baseURL}/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${page}`, // OK!!!!
  netflix: (page) =>
    `${baseURL}/discover/tv?api_key=${process.env.API_KEY}&with_networks=213&page=${page}`, // OK!!!!
  aired: (page) =>
    `${baseURL}/tv/on_the_air?api_key=${process.env.API_KEY}&language=en-US&page=${page}`, // OK!!!!
  popular: (page) =>
    `${baseURL}/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=${page}`, // OK!!!!
  todays: (page) =>
    `${baseURL}/tv/airing_today?api_key=${process.env.API_KEY}&language=en-US&page=${page}`, // OK!!!!
  seriesSearch: (query, page = 1) =>
    `${baseURL}/search/tv?api_key=${process.env.API_KEY}&language=en-US&page=${page}&query=${query}`, // OK!!!
  seriesSearchById: (id) =>
    `${baseURL}/tv/${id}?api_key=${process.env.API_KEY}&language=en-US`,
  videoSearch: (id) =>
    `${baseURL}/tv/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`,
  seriesCredits: (id) =>
    `${baseURL}/tv/${id}/aggregate_credits?api_key=${process.env.API_KEY}&language=en-US`,
};


const personRequestLinks = {
  personDetails: (id) =>
    `${baseURL}/person/${id}?api_key=${process.env.API_KEY}&language=en-US`,
  personCombinedCredits: (id) =>
    `${baseURL}/person/${id}/combined_credits?api_key=${process.env.API_KEY}&language=en-US`,
  searchPerson: (query, page = 1) =>
    `${baseURL}/search/person?api_key=${process.env.API_KEY}&language=en-US&query=${query}&page=${page}`, // OK!!!
};

module.exports = {
  movieRequestLinks,
  seriesRequestLinks,
  personRequestLinks,
};

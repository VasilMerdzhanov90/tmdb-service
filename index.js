const { default: axios } = require("axios");
const express = require("express");
const { fetchURLData } = require("./requests/requestDataTMDB");
const config = require("dotenv").config();

const app = express();

const fetch = fetchURLData();

app.get("/movies/:category/:page", async (req, res) => {
  const { category, page } = req.params;

  try {
    const response = await fetch.loadMovies(category, page);
    res.send(response.data);
  } catch (error) {
    const e = error.message;
    res.send(`ERROR: ${e}`);
  }

  // try {
  //   const response = await axios.get(
  //     `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
  //   );
  //   res.send(response.data);
  // } catch (error) {
  //   const e = error.message;
  //   res.send(e);
  // }
});

app.get("/series/:category/:page", async (req, res) => {
  const { category, page } = req.params;

  try {
    const response = await fetch.loadSeries(category, page);
    res.send(response.data);
    // res.send(response);
  } catch (error) {
    const e = error.message;
    res.send(`ERROR: ${e}`);
  }
});

app.get("/search/:type/:keyword/:page", async (req, res) => {
  const { type, keyword, page } = req.params;

  try {
    const response = await fetch.searchByKeyWord(keyword, page, type);
    res.send(response.data);
  } catch (error) {
    const e = error.message;
    res.send(`ERROR: ${e}`);
  }

  // try {
  //   const response = await axios.get(
  //     `https://api.themoviedb.org/3/search/movie?api_key=${
  //       process.env.API_KEY
  //     }&language=en-US&&query=${keyword}&page=${
  //       page ? page : 1
  //     }&include_adult=true`
  //   );
  //   res.send(response.data);
  // } catch (error) {
  //   const e = error.message;
  //   res.send(`ERROR: ${e}`);
  // }
});

app.get("/videoData/:movieId", async (req, res) => {
  const { movieId } = req.params;

  try {
    const response = await fetch.videoDataLoader(movieId);
    res.send(response.data);
  } catch (error) {
    const e = error.message;
    res.send(`ERROR: ${e}`);
  }
});

app.get("searchByCategory/:category/:id", async (req, res) => {
  const { category, id } = req.params;

  try {
    const response = await fetch.searchById(id, category);
    res.send(response.data);
  } catch (error) {
    const e = error.message;
    res.send(`ERROR: ${e}`);
  }
});

app.get("getCredits/:category/:id", async (req, res) => {
  const { category, id } = req.params;

  try {
    const response = await fetch.getCredits(id, category);
    res.send(response.data);
  } catch (error) {
    const e = error.message;
    res.send(`ERROR: ${e}`);
  }
});

app.get("getVideoList/:category/:id", async (req, res) => {
  const { category, id } = req.params;

  try {
    const response = await fetch.getVideoList(id, category);
    res.send(response.data);
  } catch (error) {
    const e = error.message;
    res.send(`ERROR: ${e}`);
  }
});

app.get("getPersonDetails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch.getPersonDetails(id);
    res.send(response.data);
  } catch (error) {
    const e = error.message;
    res.send(`ERROR: ${e}`);
  }
});

app.get("getPersonCredits/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch.getPersonCredits(id);
    res.send(response.data);
  } catch (error) {
    const e = error.message;
    res.send(`ERROR: ${e}`);
  }
});
app.listen(3000, () => console.log("SERVER RUNNING AT PORT 3000"));

const express = require("express");
const donetv = require("dotenv").config();

const { fetchURLData } = require("./requests/requestDataTMDB");

const { catEnums } = require("./correctPaths");
const { userMiddleware } = require("../util");

const app = express();

const fetch = fetchURLData();

//middleware for users
app.use(userMiddleware);

app.get("/main/:type/:category/:page", async (req, res) => {
  const { type, category, page } = req.params;
  if (
    (type !== "movies" && type !== "series") ||
    !catEnums[type].includes(category)
  ) {
    res.send("PLEASE ENTER VALID URL");
  } else {
    await fetch
      .loadBaseContent(type, category, page)
      .then((fetchedData) => res.send(fetchedData.data))
      .catch((err) => res.send(err.message));
  }
});

app.get("/search/:type/:keyword/:page", async (req, res) => {
  const { type, keyword, page } = req.params;

  if ((type !== "movies" && type !== "series") || !keyword) {
    res.send("Please enter valid URL!!!");
  } else {
    await fetch
      .searchByKeyWord(keyword, page || 1, type)
      .then((fetchedData) => res.send(fetchedData.data))
      .catch((err) => res.send(err.message));
  }
});

app.get("/videoData/:movieId", async (req, res) => {
  const { movieId } = req.params;

  await fetch
    .videoDataLoader(movieId)
    .then((fetchedData) => res.send(fetchedData.data))
    .catch((error) => {
      const e = error.message;
      res.send(`ERROR: ${e}`);
    });
});

app.get("/getVideoList/:category/:id", async (req, res) => {
  const { category, id } = req.params;

  if (category !== "movies" && category !== "series") {
    res.send("Please enter valid URL!!!");
  } else {
    await fetch
      .getVideoList(id, category)
      .then((fetchedData) => res.send(fetchedData.data))
      .catch((error) => {
        const e = error.message;
        res.send(`ERROR: ${e}`);
      });
  }
});

app.get("/searchById/:category/:id", async (req, res) => {
  const { category, id } = req.params;

  if (category !== "movies" && category !== "series") {
    res.send("Please enter valid URL!!!");
  } else {
    await fetch
      .searchById(id, category)
      .then((fetchedData) => res.send(fetchedData.data))
      .catch((error) => {
        const e = error.message;
        res.send(`ERROR: ${e}`);
      });
  }
});

app.get("/getCredits/:category/:id", async (req, res) => {
  const { category, id } = req.params;
  if (category !== "movies" && category !== "series") {
    res.send("Please enter valid URL!!!");
  } else {
    await fetch
      .getCredits(id, category)
      .then((fetchedData) => res.send(fetchedData.data))
      .catch((error) => {
        const e = error.message;
        res.send(`ERROR: ${e}`);
      });
  }
});

app.get("/person/:type/:id", async (req, res) => {
  const { type, id } = req.params;

  await fetch[type](id)
    .then((fetchedData) => res.send(fetchedData.data))
    .catch((error) => {
      const e = error.message;
      res.send(`ERROR: ${e}`);
    });
});

app.get("*", async (req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

app.listen(3000, () => console.log("SERVER RUNNING AT PORT 3000"));

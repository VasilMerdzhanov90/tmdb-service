const express = require("express");
const donetv = require("dotenv").config();

const { fetchURLData } = require("./requests/requestDataTMDB");

const { catEnums } = require("./correctPaths");
const { userMiddleware } = require("../util");

const app = express();

const fetch = fetchURLData();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, uid"
  );

  next();
});

app.get(
  "/main/:requestType/:category/:page?",
  userMiddleware,
  async (req, res) => {
    const { requestType, category, page = 1 } = req.params;
    if (
      (requestType !== "movies" && requestType !== "series") ||
      !catEnums[requestType].includes(category)
    ) {
      res.send("PLEASE ENTER VALID URL");
    } else {
      await fetch
        .loadBaseContent(requestType, category, page)
        .then((fetchedData) => res.send(fetchedData.data))
        .catch((err) => res.send(err.message));
    }
  }
);

app.get("/search/:type/:keyword/:page?", userMiddleware, async (req, res) => {
  const { type, keyword, page = 1 } = req.params;

  if ((type !== "movies" && type !== "series") || !keyword) {
    res.send("Please enter valid URL!!!");
  } else {
    await fetch
      .searchByKeyWord(keyword, page, type)
      .then((fetchedData) => res.send(fetchedData.data))
      .catch((err) => res.send(err.message));
  }
});

app.get("/videoData/:movieId", userMiddleware, async (req, res) => {
  const { movieId } = req.params;

  await fetch
    .videoDataLoader(movieId)
    .then((fetchedData) => res.send(fetchedData.data))
    .catch((error) => {
      const e = error.message;
      res.send(`ERROR: ${e}`);
    });
});

app.get("/getVideoList/:category/:id", userMiddleware, async (req, res) => {
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

app.get("/searchById/:category/:id", userMiddleware, async (req, res) => {
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

app.get("/getCredits/:category/:id", userMiddleware, async (req, res) => {
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

app.get("/person/:requestType/:id", userMiddleware, async (req, res) => {
  const { requestType, id } = req.params;

  await fetch[requestType](id)
    .then((fetchedData) => res.send(fetchedData.data))
    .catch((error) => {
      const e = error.message;
      res.send(`ERROR: ${e}`);
    });
});

app.get("*", async (req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

app.listen(3030, () => console.log("SERVER RUNNING AT PORT 3000"));

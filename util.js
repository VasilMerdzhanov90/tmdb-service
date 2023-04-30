const { userVerify } = require("./firebase/service");

async function userMiddleware(req, res, next) {
  const { uid } = req.headers;

  const isUser = await userVerify(uid);

  if (!isUser) {
    res.end("USER NOT AUTHORIZED!!!!");
    return next(new Error("Unauthorized Access"));
  }
  next();
}
module.exports = { userMiddleware };

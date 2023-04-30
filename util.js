const { userVerify } = require("./firebase/service");

async function userMiddleware(req, res, next) {
  const { uid } = req.headers;

  const isUser = await userVerify(uid);

  if (!isUser) {
    // return res.status(403).send("Unauthorized Access");
    return next(new Error("Unauthorized Access"));
  }
  next();
}
module.exports = { userMiddleware };

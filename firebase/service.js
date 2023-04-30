const { appFirestore, db } = require("./config");
const { collection, doc, getDoc } = require("firebase/firestore");

async function userVerify(id) {
  if (id == undefined) {
    return;
  }
  const ref = doc(db, "users", id);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    // console.log(docSnap.data());
    return false;
  }
  return true;
}

module.exports = { userVerify };

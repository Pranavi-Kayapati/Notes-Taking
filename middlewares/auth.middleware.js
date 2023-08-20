const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, "notesapp");
    if (decoded) {
      console.log(decoded);
      req.body.userID = decoded.userID;
      req.body.username = decoded.username;
      next();
    } else {
      res.send({ msg: "Please login" });
    }
  } else {
    res.send({ msg: "Please login" });
  }
};

module.exports = { auth };

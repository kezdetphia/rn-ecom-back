const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  console.log("verifytoken req: ", req.headers.token);

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

module.exports = { verifyToken };

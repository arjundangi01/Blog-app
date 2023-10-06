const { model } = require("mongoose");

const jwtVerify = (req, res, next) => {
  const { token } = req.params;

  jwt.verify(token, "secretKey", async function (err, decoded) {
    // console.log(decoded.foo);
    if (err) {
      res.status(400).send("Please Login First");
    } else {
      next();
    }
  });
};

module.exports = jwtVerify;

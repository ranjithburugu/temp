const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
const header = {
  alg: "HS256",
  typ: "JWT",
};

const secretKey = "mysecretkey";

const options = {
  expiresIn: "10000s",
};

app.use(express.json());

app.post("/hello", (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);

  // verify the user's credentials here
  if (username === "johndoe" && password === "password123") {
    const payload = { username };
    const token = jwt.sign(payload, secretKey, { header, ...options });
    res.json({ token });
    res.status(200).send("Authentication Sucess");
  } else {
    res.status(401).send("Authentication failed");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

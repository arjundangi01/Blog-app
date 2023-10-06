const express = require("express");
const blogRouter = require("./Routes/blog.routes");
const { connection } = require("./config/db");
const userRouter = require("./Routes/user.routes");
const commentRouter = require("./Routes/comment.routes");
const likeRouter = require("./Routes/like.routes");
const passport = require('./Authentication/googleauth')
const cookieParser = require('cookie-parser'); 
const cors = require("cors");
const app = express();
const session = require('express-session');
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const client_id = "8d7d6fd6c9ff670edfd4";
const client_secret = "c850ed8058adce21e87027a23450d7b49991ae20";

app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

app.get("/", (req, res) => {
 
  res.send('welcome');
});





// app.use(passport.initialize());
// app.use(passport.session());

app.use("/blogs", blogRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile","email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login",session:false }),
//   async function (req, res) {
   
//     // res.redirect("http://localhost:3000/");
//     res.status(200).send('done')
//   }
// );


app.get("/auth/github", async (req, res) => {
  const { code } = req.query;
  //https://github.com/login/oauth/access_token
  const token = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: JSON.stringify({ client_id, client_secret, code }),
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  console.log(token);
  const {access_token} =token

  const user = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json());
  console.log("user",user);
  res.send(user);
});



app.listen(8080, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
  console.log("started");
});

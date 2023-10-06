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

app.listen(8080, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
  console.log("started");
});

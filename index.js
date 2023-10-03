const express = require("express");
const blogRouter = require("./Routes/blog.routes");
const {connection} = require("./config/db");
const userRouter = require("./Routes/user.routes");
const commentRouter = require("./Routes/comment.routes");
const likeRouter = require("./Routes/like.routes");
const app = express();
app.use(express.json());
app.get("/", (req,res) => {
    res.send("Welcome")
})

app.use("/blogs", blogRouter)
app.use("/user", userRouter)
app.use("/comment", commentRouter)
app.use("/like", likeRouter)


app.listen(8080, async () => {
    try {
        await connection
    } catch (error) {
        console.log(error)
    }
    console.log('started')
  
})
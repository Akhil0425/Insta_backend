const express = require("express");
const { connection } = require("./configs/db");
const {userRouter} = require("./routes/user.routes");
const {postRouter} = require("./routes/post.routes");
const {authanticate} = require('./middleware/authenticate.middleware')
const cors = require('cors')


const app = express();
app.use(cors({
  origin:"*"
}))
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to social media app");
});

app.use("/users", userRouter);
app.use(authanticate)
app.use("/posts", postRouter);

app.listen(3030, async () => {
    try {
      await connection;
      console.log("conected to DB");
    } catch (err) {
      console.log("Trouble connecting to DB");
      console.log(err);
    }
    console.log("running on port 3030");
  });
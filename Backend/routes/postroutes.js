const express = require("express");
const { postModel } = require("../models/Post");

const postRouter = express.Router();

postRouter.get("/:userid", async (req, res) => {
  const userid = req.params.userId;
  const post = await postModel.find({ userid });
  res.send(post);
});

postRouter.post("/create/:userid", async (req, res) => {
  const userId = req.params.userid;
  let payload = {
    ...req.body,
    userid,
  };
  try {
    const new_post = new postModel(payload);
    await new_post.save();
    res.send("Created the post");
  } catch (err) {
    console.log(err);
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await postModel.findOne({ _id: id });
  const userID_in_post = post.userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req != userID_in_post) {
      res.send("you are not authorized");
    } else {
      await postModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("Updated the post");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await postModel.findByIdAndDelete({ _id: id });
    res.send("Deleted the post");
  } catch (error) {
    console.log(error);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  postRouter,
};

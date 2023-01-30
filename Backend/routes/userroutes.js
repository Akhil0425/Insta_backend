const express = require('express')
const {UserModel} = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const { email, password, name, gender } = req.body;
    try {
      bcrypt.hash(password, 5, async (err, secure_password) => {
        if (err) {
          console.log(err);
        } else {
          const user = new UserModel({ email, password: secure_password, name, gender });
          await user.save();
          res.send("Register");
        }
      });
    } catch (error) {
      res.send("Error in register");
      console.log(error);
    }
  });
  
  userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.find({ email });
      const hashed_pass =user[0].password
      if (user.length > 0) {
        bcrypt.compare(password, hashed_pass, (err, result) => {
          if (result) {
            const token = jwt.sign({userID:user[0]._id }, "masai");
            res.send({ msg: "Login Sucessful", token: token, id:user[0]._id });
          } else {
            res.send("wrong credentials");
          }
        });
      } else {
        res.send("wrong credentials");
      }
    } catch (error) {
      console.log(error);
      console.log("Something went Wrong");
    }
  });



  module.exports={
    userRouter
  }
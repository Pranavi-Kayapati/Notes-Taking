const express = require("express");
const { UserModel } = require("../models/user");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  try {
    const allResisterUser = await UserModel.find();
    res.status(200).send(allResisterUser);
  } catch (error) {
    res.status(200).send({ error: error });
  }
});

userRouter.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      if (err) {
        res.send({ err: err });
      } else {
        const user = UserModel({ email, username, password: hash });
        await user.save();
        res.status(200).send({ msg: "User Registered", user: user });
      }
    });
  } catch (error) {
    res.send({ err: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, username: user.username },
            "notesapp"
          );
          res.send({ message: "Login successful", token: token });
        } else {
          res.send({ error: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ message: "User not exist" });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = {
  userRouter,
};

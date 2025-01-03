const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const signToken = async (id) => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
};

exports.Register = asyncHandler(async (req, res, next) => {
  const { email, username, password, passwordConfirm } = req.body;
  const newUser = new User({
    email,
    username,
    password,
    passwordConfirm,
  });
  await newUser.save();
  let token = await signToken(newUser._id);
  res.status(200).json({
    status: "Success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      AppError.create("Please provide email and password", "error", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(AppError.create("Incorrect email or password", "error", 401));
  }
  const token = await signToken(user._id);
  res.status(200).json({
    status: "Success",
    token,
    user
  });
});

exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    status: "Success",
    data: user,
  });
});


exports.updatePassword = asyncHandler(async (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.correctPassword(oldPassword, user.password))) {
    return next(
      AppError.create("Your current password is wrong.", "Error", 401)
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  const token = await signToken(user._id);
  res.status(200).json({
    status: "Success",
    token,
    message: "Password updated",
  });
});

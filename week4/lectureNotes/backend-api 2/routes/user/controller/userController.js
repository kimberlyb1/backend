const bcrypt = require("bcryptjs");
const User = require("../model/User");

const {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods");

async function signup(req, res) {
  const { username, email, password, firstName, lastName } = req.body;

  let errorObj = {};

  let inComingData = req.body;

  //check password strength
  if (!checkIsStrongPassword(password)) {
    errorObj.weakPassword =
      "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8";
  }

  if (!checkIsEmail(email)) {
    errorObj.wrongEmailFormat = "Must be in email format!";
  }

  for (key in inComingData) {
    if (key === "firstName" || key === "lastName") {
      if (!checkIsAlpha(inComingData[key])) {
        errorObj[`${key}`] = `${key} can only have characters`;
      }
    }
  }

  // if (!checkIsAlpha(firstName)) {
  //   errorObj.firstNameError = "First Name can only have characters";
  // }

  // if (!checkIsAlpha(lastName)) {
  //   errorObj.lastNameError = "Last Name can only have characters";
  // }

  if (!checkIsAlphanumeric(username)) {
    errorObj.usernameError = "username can only have characters and numbers";
  }
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    let savedUser = await createdUser.save();

    res.json({ message: "success", data: savedUser });
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(500).json({ message: "Please fill out the form" });
  }

  let errorObj = {};

  if (checkIsEmpty(email)) {
    errorObj.email = "Email cannot be empty";
  }

  if (checkIsEmpty(password)) {
    errorObj.password = "Password cannot be empty";
  }

  if (!isEmail(email)) {
    errorObj.wrongEmailFormat = "Must be in email format!";
  }

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    //dont worry about
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}

module.exports = { signup };

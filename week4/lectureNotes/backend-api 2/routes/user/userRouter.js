const express = require("express");
const router = express.Router();

const { signup } = require("./controller/userController");

const checkIsUndefined = require("./helpers/checkIsUndefined");
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");

router.post("/sign-up", checkIsUndefined, checkIsEmptyFunc, signup);

module.exports = router;

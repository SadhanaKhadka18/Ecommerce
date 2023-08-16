const User = require("../model/user");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  return res
    .status(200)
    .json(User.validateUser(req.body.email, req.body.password));
});

module.exports = router;

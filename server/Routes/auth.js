const express = require("express");
const router = express.Router();
const { registerUser,login,authenticateToken } = require("../Controllers/auth");

router.post("/register", registerUser);

router.post("/login",authenticateToken, login);

module.exports = router;

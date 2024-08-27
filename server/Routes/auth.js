const express = require("express");
const router = express.Router();
const { registerUser,login,checkAuth} = require("../Controllers/auth");


router.post("/register", registerUser);

router.post("/login", login);

router.get("/check-auth", checkAuth);

module.exports = router;

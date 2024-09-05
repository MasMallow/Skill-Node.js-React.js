const express = require("express");
const router = express.Router();
const { registerUser,login,checkAuth,getUserFromToken,authenticateToken} = require("../Controllers/auth");


router.post("/register", registerUser);

router.post("/login", login);

router.get("/check-auth", checkAuth);

router.get("/user",authenticateToken, getUserFromToken);

module.exports = router;

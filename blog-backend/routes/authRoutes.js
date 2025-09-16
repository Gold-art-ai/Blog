const express = require("express");
const {registerUser, getUsers, loginUser } = require("../controllers/authC");
const router = express.Router();


router.post("/register",registerUser);
router.post("/login", loginUser)
router.get("/users", getUsers);

module.exports = router;
const express = require("express");
const router = express.Router();
const { getComments, createComment, deleteComment } = require("../controllers/commentC");
const authMiddleWare = require("../middleware/authM");


router.get("/", getComments);
router.post("/", authMiddleWare, createComment);
router.delete("/:id", deleteComment);


module.exports = router;
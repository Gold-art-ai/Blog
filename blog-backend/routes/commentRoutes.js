const express = require("express");
const router = express.Router();
const { getComments, getCommentsForPosts,createComment, deleteComment } = require("../controllers/commentC");
const authMiddleWare = require("../middleware/authM");


router.get("/", getComments)
router.get("/post/:postId", getCommentsForPosts);
router.post("/", authMiddleWare, createComment);
router.delete("/:id", deleteComment);


module.exports = router;
const express = require("express");
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost } = require("../controllers/postC");

const authMiddleWare = require("../middleware/authM");

router.get("/", getPosts);          
router.get("/:id", getPost);  

router.post("/", authMiddleWare, createPost);       
router.put("/:id", authMiddleWare, updatePost);     
router.delete("/:id", authMiddleWare, deletePost);  
module.exports = router;

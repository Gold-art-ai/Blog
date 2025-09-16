const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

exports.createComment = async (req, res) => {
    try{
        const {content, author, post} = req.body;
        const comment = new Comment({content, author:req.user.id, post});
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
exports.getCommentsForPosts = async (req, res) => {
    try{
        const comments = await Comment.find({post: req.params.postId}).populate("author", "username email");
        res.json(comments);

    } catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

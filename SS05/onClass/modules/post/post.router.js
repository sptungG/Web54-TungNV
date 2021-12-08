const router = require("express").Router();
const postController = require("./post.controller");

// Router là tập hợp các routing có tiền tố /api/posts
router.get("/", postController.getAllPost);
router.get("/:postId", postController.getPost);
router.post("/", postController.createPost);
router.put("/:postId", postController.updatePost);
router.put("/:postId/like", postController.incLikePost);
router.get("/:postId/comments", postController.getCommentsByPost);
router.delete("/:postId", postController.deletePost);

module.exports = router;

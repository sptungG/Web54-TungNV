const router = require("express").Router();
const commentController = require("./comment.controller");

router.get("/", commentController.getAllComments);

module.exports = router;

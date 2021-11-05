const fs = require("fs");
const uuid = require("uuid");

const getAllComments = async () => {
  try {
    const jsonComments = await fs.promises.readFile("comments.json", "utf-8");
    const comments = JSON.parse(jsonComments);
    return comments;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getCommentsByPost = async (postId) => {
  try {
    const jsonComments = await fs.promises.readFile("comments.json", "utf-8");
    const comments = JSON.parse(jsonComments);
    
    const jsonPosts = await fs.promises.readFile("posts.json", "utf-8");
    const posts = JSON.parse(jsonPosts);
    const foundPost = posts.find((post) => post.id === postId);
    if (!foundPost) return [];
    
    const foundComments = comments.filter((comment) => comment.postId === postId);
    return foundComments;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getComment = async (commentId) => {
  try {
    const jsonComments = await fs.promises.readFile("comments.json", "utf-8");
    const comments = JSON.parse(jsonComments);
    let foundComment = comments.find((comment) => comment.id === commentId);
    if (!foundComment) return null;
    return foundComment;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const createComment = async (postId, dataComment) => {
  try {
    const jsonComments = await fs.promises.readFile("comments.json", "utf-8");
    const comments = JSON.parse(jsonComments);

    const jsonPosts = await fs.promises.readFile("posts.json", "utf-8");
    const posts = JSON.parse(jsonPosts);
    const foundPost = posts.find((post) => post.id === postId);
    if (!foundPost) return null;

    const newComment = {
      id: uuid.v1(),
      postId: postId,
      createAt: new Date().toLocaleDateString("vi-VI"),
      ...dataComment,
    };

    comments.push(newComment);
    await fs.promises.writeFile("comments.json", JSON.stringify(comments));
    return newComment;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updateComment = async (commentId, newComment) => {
  try {
    const jsonComments = await fs.promises.readFile("comments.json", "utf-8");
    const comments = JSON.parse(jsonComments);

    const foundIndex = comments.findIndex((comment) => comment.id === commentId);
    if (foundIndex < 0) return null;

    comments[foundIndex] = {
      ...comments[foundIndex],
      ...newComment,
    };

    await fs.promises.writeFile("comments.json", JSON.stringify(comments));
    return comments[foundIndex];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteComment = async (commentId) => {
  try {
    const jsonComments = await fs.promises.readFile("comments.json", "utf-8");
    const comments = JSON.parse(jsonComments);
    const newComments = comments.filter((comment) => comment.id !== commentId);
    await fs.promises.writeFile("comments.json", JSON.stringify(newComments));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = {
  getAllComments,
  getCommentsByPost,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};

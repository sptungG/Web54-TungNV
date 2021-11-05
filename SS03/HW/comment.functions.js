const fs = require("fs");
const uuid = require("uuid");

const getAllComments = async (postId) => {
  try {
    const jsonPosts = await fs.promises.readFile("posts.json", "utf-8");
    const posts = JSON.parse(jsonPosts);
    const foundPost = posts.find((post) => post.id === postId);
    return foundPost.comments;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getComment = async (postId, commentId) => {
  try {
    const jsonPosts = await fs.promises.readFile("posts.json", "utf-8");
    const posts = JSON.parse(jsonPosts);
    let foundPost = posts.find((post) => post.id === postId);
    let foundComment = foundPost.comments.find((comment) => comment.id === commentId);
    if (!foundPost || !foundComment) return null;
    return foundComment;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const createComment = async (postId, dataComment) => {
  try {
    const jsonPosts = await fs.promises.readFile("posts.json", "utf-8");
    const posts = JSON.parse(jsonPosts);

    const newComment = {
      id: uuid.v1(),
      createAt: new Date().toLocaleDateString("vi-VI"),
      ...dataComment,
    };

    const foundPost = posts.find((post) => post.id === postId);
    foundPost.comments.push(newComment);
    await fs.promises.writeFile("posts.json", JSON.stringify(posts));
    return newComment;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updateComment = async (postId, commentId, newComment) => {
  try {
    const jsonPosts = await fs.promises.readFile("posts.json", "utf-8");
    const posts = JSON.parse(jsonPosts);

    let foundPost = posts.find((post) => post.id === postId);
    let foundIndex = foundPost.comments.findIndex((comment) => comment.id === commentId);
    if (!foundPost || foundIndex < 0) return null;

    let updateComment = {
      ...foundPost.comments[foundIndex],
      ...newComment,
    };

    foundPost.comments.splice(foundIndex, 1, updateComment);

    await fs.promises.writeFile("posts.json", JSON.stringify(posts));
    return updateComment;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const jsonPosts = await fs.promises.readFile("posts.json", "utf-8");
    const posts = JSON.parse(jsonPosts);

    let foundPost = posts.find((post) => post.id === postId);
    let foundIndex = foundPost.comments.findIndex((comment) => comment.id === commentId);
    if (!foundPost || foundIndex < 0) return null;

    foundPost.comments.splice(foundIndex, 1);

    await fs.promises.writeFile("posts.json", JSON.stringify(posts));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};

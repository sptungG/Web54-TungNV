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
    const foundPost = posts.find((post) => post.id === postId);

    const foundComment = foundPost.comments[commentId];
    if (foundComment) return foundComment;
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const createComment = async (postId, dataComment) => {
  try {
    const jsonPosts = await fs.promises.readFile("posts.json", "utf-8");
    const posts = JSON.parse(jsonPosts);
    console.log(dataComment);
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

    const foundPost = posts.find((post) => post.id === postId);
    let foundComment = foundPost.comments[commentId];
    if (foundComment) {
      foundComment = {
        ...foundComment,
        ...newComment,
      };
      await fs.promises.writeFile("posts.json", JSON.stringify(posts));
      return foundComment;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const jsonPosts = await fs.promises.readFile("posts.json", "utf-8");
    const posts = JSON.parse(jsonPosts);
    const foundPost = posts.find((post) => post.id === postId);
    foundPost.comments.filter((comment) => comment.id !== commentId);
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

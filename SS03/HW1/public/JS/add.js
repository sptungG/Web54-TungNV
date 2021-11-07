const editorSection = document.querySelector(".blog-editor");
const blogTitleField = document.querySelector(".title");
const blogImageUrl = document.querySelector("#banner-image");
const descField = document.querySelector(".desc");
const publishBtn = document.querySelector(".publish-btn");

publishBtn.addEventListener("click", () => {
  addBlog();
  alert("Added successfully!");
});

function addBlog() {
  axios
    .post(`http://localhost:9000/api/posts`, {
      imageUrl: blogImageUrl.value,
      title: blogTitleField.value,
      desc: descField.value,
      createBy: "Guest",
      publishedAt: new Date().toLocaleDateString("vi-VI"),
    })
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.log("Error adding the blog");
    });
}

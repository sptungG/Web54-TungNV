const editorSection = document.querySelector(".blog-editor");
const blogTitleField = document.querySelector(".title");
const blogImageUrl = document.querySelector("#banner-image");
const descField = document.querySelector(".desc");
const publishBtn = document.querySelector(".publish-btn");

async function getData(baseUrl) {
  let response = await axios.get(`${baseUrl}`);
  return response.data;
}

let blogID = location.pathname.split("/");
console.log(blogID);

if (blogID[1] == "add") {
  publishBtn.addEventListener("click", () => {
    addBlog();
    alert("Added successfully!");
  });
} else {
  location.replace("/");
}

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

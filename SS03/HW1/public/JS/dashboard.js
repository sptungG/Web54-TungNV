const blogsSection = document.querySelector(".blogs-section");

async function getData(baseUrl) {
  let response = await axios.get(`${baseUrl}`);
  return response.data;
}

function showDashboard() {
  blogsSection.innerHTML = "";
  getData("http://localhost:9000/api/posts")
    .then((data) => {
      data.forEach((post) => {
        blogsSection.innerHTML += `
        <div class="blog-card">
        <img src="${post.imageUrl}" class="blog-image" alt="">
        <h2 class="blog-title">${post.title.substring(0, 50)}</h2>
        <p class="blog-overview">${post.desc.substring(0, 100) + "..."}</p>
        <div class="blog-controller">    
          <a href="/${post.id}" class="btn dark">read</a>
          <a onclick="editBlog('${post.id}')"  class="btn grey">edit</a>
          <a onclick="deleteBlog('${post.id}')" class="btn danger">delete</a>
        </div>
      </div>
        `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
function deleteBlog(id) {
  let conf = confirm("Do you want delete this blog?");
  if (conf) {
    axios
      .delete(`http://localhost:9000/api/posts/${id}`)
      .then(() => {
        alert("Deleted successfully!");
        location.reload();
      })
      .catch((error) => {
        console.log("Error deleting the blog");
      });
  } else {
    alert("Canceled successfully!");
  }
}
showDashboard();

const editorSection = document.querySelector(".blog-editor");
const blogTitleField = document.querySelector(".title");
const blogImageUrl = document.querySelector("#banner-image");
const descField = document.querySelector(".desc");
const publishBtn = document.querySelector(".publish-btn");

const modal = document.querySelector(".modal");
document.body.addEventListener("click", (event) => {
  if (event.target.matches(".modal-close")) {
    modal.classList.remove("show");
  } else if (event.target.matches(".modal")) {
    modal.classList.remove("show");
  }
});

function editBlog(id) {
  modal.classList.add("show");
  getData(`http://localhost:9000/api/posts/${id}`)
    .then((data) => {
      blogImageUrl.value = `${data.imageUrl}`;
      blogTitleField.value = `${data.title}`;
      descField.value = `${data.desc}`;

      publishBtn.addEventListener("click", () => {
        updateBlog(data.id);
        alert("Updated successfully!");
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateBlog(id) {
  axios
    .put(`http://localhost:9000/api/posts/${id}`, {
      imageUrl: blogImageUrl.value,
      title: blogTitleField.value,
      desc: descField.value,
      publishedAt: new Date().toLocaleDateString("vi-VI"),
    })
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.log("Error updating the blog");
    });
}

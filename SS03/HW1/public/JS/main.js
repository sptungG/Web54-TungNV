const blogSection = document.querySelector(".blogs-section");

let baseUrl = "http://localhost:9001/posts";

showAllPosts = () => {
  async function getData() {
    let response = await fetch(`${baseUrl}`);
    return await response.json();
  }
  getData()
    .then((result) => {
      result.data.forEach((post) => {
        createPost(post);
      });
    })
    .catch((err) => {
      return console.log(err);
    });
};

const createPost = (data) => {
  blogSection.innerHTML += `
  <div class="blog-card">
  <img src="${data.imageUrl}" class="blog-image" alt="">
  <h1 class="blog-title">${data.title.substring(0, 100) + "..."}</h1>
  <p class="blog-overview">${data.desc.substring(0, 200) + "..."}</p>
      <a href="/${data.id}" class="btn dark">read</a>
      </div>
  `;
};

showAllPosts();

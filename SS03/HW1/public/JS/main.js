const blogSection = document.querySelector(".blogs-section");

let baseUrl = "../controller/posts.json";

showAllPosts = () => {
  async function getData() {
    let response = await fetch(`${baseUrl}`);
    return await response.json();
  }
  getData()
    .then((data) => {
      data.forEach((post) => {
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
    <h2 class="blog-title">${data.title.substring(0, 50)}</h2>
    <p class="blog-overview">${data.desc.substring(0, 100) + "..."}</p>
    <a href="/${data.id}" class="btn dark">read</a>
  </div>
  `;
};

showAllPosts();

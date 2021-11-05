const blogSection = document.querySelector(".blogs-section");

showAllPosts = () => {
  async function getData() {
    let data = await fetch(`../DATA/posts.json`);
    return await data.json();
  }
  getData().then((posts) => {
    posts.forEach((post) => {
      createPost(post);
    });
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

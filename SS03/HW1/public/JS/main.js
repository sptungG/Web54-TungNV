const blogsSection = document.querySelector(".blogs-section");

async function getData(baseUrl) {
  let response = await axios.get(`${baseUrl}`);
  return response.data;
}

function showAllBlogs() {
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
          </div> 
        </div>
        `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
showAllBlogs();

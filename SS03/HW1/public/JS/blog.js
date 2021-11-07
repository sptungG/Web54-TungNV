const readSection = document.querySelector(".blog-read");

let blogID = location.pathname.split("/").pop();
console.log(blogID);

async function getData(baseUrl) {
  let response = await axios.get(`${baseUrl}`);
  return response.data;
}

function readBlog(id) {
  getData(`http://localhost:9000/api/posts/${id}`)
    .then((data) => {
      readSection.innerHTML += `
      <div class="blog-banner" style="background-image: url(${data.imageUrl});" ></div>
      <div class="blog">
        <h1 class="blog-title">${data.title}</h1>
        <p class="blog-published">Published at - <span>${data.publishedAt}</span> -- <span>${data.createBy}</span></p>
        <div class="blog-desc">${data.desc}</div>
      </div>
        `;
    })
    .catch((err) => {
      console.log(err);
    });
}

readBlog(blogID);

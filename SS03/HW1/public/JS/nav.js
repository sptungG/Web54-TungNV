const nav = document.querySelector(".navbar");

nav.innerHTML = `
  <img src="IMG/logo.png" class="logo" alt="" />
  <ul class="links-container">
    <li class="link-item"><a href="/" class="link">home</a></li>
    <li class="link-item"><a href="/admin" class="link">Dashboard</a></li>
    <li class="link-item">
      <a href="/add" class="btn dark btn-add" ><i class="fas fa-plus-circle"></i> new blog</a>
    </li>
  </ul>
`;

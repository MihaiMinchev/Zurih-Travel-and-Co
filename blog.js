// Zurih Travel Blog System

const blogPosts = [
  {
    title: "Best Beaches in Varna",
    date: "March 2026",
    content: "Varna offers some of the best beaches on the Black Sea. The most popular are Varna Central Beach, Asparuhovo Beach and Kabakum Beach."
  },
  {
    title: "Top 5 Things to Do in Varna",
    date: "March 2026",
    content: "Visit the Sea Garden, explore Varna Cathedral, see the Roman Baths, enjoy local cafes and walk along the Black Sea promenade."
  },
  {
    title: "Best Cafes in Varna",
    date: "March 2026",
    content: "Some of the best cafes in Varna include The Social Teahouse, Brew & Co and several hidden local coffee spots around the Sea Garden."
  }
];

function loadBlog() {

  const container = document.getElementById("blog-posts");

  if (!container) return;

  container.innerHTML = "";

  blogPosts.forEach(post => {

    const article = document.createElement("article");
    article.className = "blog-post";

    article.innerHTML = `
      <h2>${post.title}</h2>
      <p class="blog-date">${post.date}</p>
      <p>${post.content}</p>
    `;

    container.appendChild(article);

  });

}

document.addEventListener("DOMContentLoaded", loadBlog);

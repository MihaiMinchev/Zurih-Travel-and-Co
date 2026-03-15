// blog.js — Zurih Travel Blog

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
  const blogContainer = document.getElementById("blog-posts");
  if (!blogContainer) return;

  blogContainer.innerHTML = blogPosts.map(post => `
    <article class="blog-post">
      <h2>${post.title}</h2>
      <p class="blog-date">${post.date}</p>
      <p>${post.content}</p>
    </article>
  `).join('');
}

// Initialize blog on page load
document.addEventListener("DOMContentLoaded", loadBlog);

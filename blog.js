// Simple Blog System for Zurih Travel & Co

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

function loadBlog(){

const blogContainer = document.getElementById("blog-posts");

if(!blogContainer) return;

blogPosts.forEach(post => {

const article = document.createElement("div");

article.className = "blog-post";

article.innerHTML = `
<h3>${post.title}</h3>
<p><em>${post.date}</em></p>
<p>${post.content}</p>
`;

blogContainer.appendChild(article);

});

}

document.addEventListener("DOMContentLoaded", loadBlog);

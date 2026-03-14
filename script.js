// ===============================
// ZURIH TRAVEL & CO MAIN SCRIPT
// ===============================


// ---------- PLACES DATA ----------
const PLACES = [
{
name: "Sea Garden",
type: "Tourist Place",
lat: 43.206,
lon: 27.932
},
{
name: "Varna Cathedral",
type: "Tourist Place",
lat: 43.214,
lon: 27.915
},
{
name: "The Social Teahouse",
type: "Cafe",
lat: 43.208,
lon: 27.919
},
{
name: "Happy Bar & Grill",
type: "Restaurant",
lat: 43.213,
lon: 27.921
},
{
name: "Local Art Shop",
type: "Local Business",
lat: 43.210,
lon: 27.918
}
];


// ---------- BLOG POSTS ----------
const BLOG_POSTS = [
{
id:1,
title:"Top 5 Places to Visit in Varna",
date:"2026-03-14",
excerpt:"Discover the best cultural and tourist spots in Varna.",
content:`
<p>Varna is one of the most beautiful cities on the Black Sea.</p>

<p>Must visit places include:</p>

<ul>
<li>Sea Garden</li>
<li>Varna Cathedral</li>
<li>Roman Baths</li>
<li>Archaeological Museum</li>
<li>Varna Beach</li>
</ul>

<p>These places represent the culture and history of the city.</p>
`
},
{
id:2,
title:"Best Cafes in Varna",
date:"2026-03-10",
excerpt:"Our favorite cafes for coffee, meetings and work.",
content:`
<p>Varna has many cozy cafes perfect for relaxing.</p>

<p>Recommended:</p>

<ul>
<li>The Social Teahouse</li>
<li>Brew & Co</li>
<li>43.12 Cafe</li>
</ul>
`
}
];


// ===============================
// NAVIGATION
// ===============================

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.style.display="none"
})

const el = document.getElementById(page)

if(el){
el.style.display="block"
}

if(page==="directory"){
renderDirectory()
}

if(page==="map"){
renderMapSidebar()
}

if(page==="blog"){
renderBlog()
}

}


// ===============================
// DIRECTORY
// ===============================

function renderDirectory(){

const container = document.getElementById("directory-list")

if(!container) return

container.innerHTML=""

PLACES.forEach(place=>{

const card = document.createElement("div")

card.className="directory-card"

card.innerHTML=`
<h3>${place.name}</h3>
<p>${place.type}</p>
`

container.appendChild(card)

})

}


// ===============================
// MAP
// ===============================

function renderMapSidebar(){

const list = document.getElementById("sidebar-list")

if(!list) return

list.innerHTML=""

PLACES.forEach(place=>{

const item = document.createElement("div")

item.className="sidebar-item"

item.innerText = place.name

item.onclick = ()=>{

showPlace(place)

}

list.appendChild(item)

})

}


function showPlace(place){

const iframe = document.getElementById("map-iframe")

if(!iframe) return

iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${place.lon-0.01},${place.lat-0.01},${place.lon+0.01},${place.lat+0.01}&layer=mapnik&marker=${place.lat},${place.lon}`

}


// ===============================
// BLOG
// ===============================

function renderBlog(){

const container = document.getElementById("blog-posts")

if(!container) return

container.innerHTML=""

BLOG_POSTS.forEach(post=>{

const card = document.createElement("div")

card.className="blog-card"

card.innerHTML=`
<h3>${post.title}</h3>
<p>${post.date}</p>
<p>${post.excerpt}</p>
<button onclick="openBlog(${post.id})">Read more</button>
`

container.appendChild(card)

})

}


function openBlog(id){

const post = BLOG_POSTS.find(p=>p.id===id)

if(!post) return

let modal = document.getElementById("blog-modal")

if(!modal){

modal = document.createElement("div")

modal.id="blog-modal"

modal.style.position="fixed"
modal.style.top="0"
modal.style.left="0"
modal.style.width="100%"
modal.style.height="100%"
modal.style.background="rgba(0,0,0,0.6)"
modal.style.display="flex"
modal.style.justifyContent="center"
modal.style.alignItems="center"

modal.innerHTML=`
<div style="background:white;padding:30px;max-width:700px;width:90%;border-radius:10px;position:relative">

<button id="closeBlog" style="position:absolute;top:10px;right:10px">X</button>

<div id="blogContent"></div>

</div>
`

document.body.appendChild(modal)

}

document.getElementById("blogContent").innerHTML=`
<h2>${post.title}</h2>
<p>${post.date}</p>
${post.content}
`

modal.style.display="flex"

document.getElementById("closeBlog").onclick=()=>{
modal.style.display="none"
}

}


// ===============================
// FOOTER YEAR
// ===============================

const year = document.getElementById("year")

if(year){
year.innerText = new Date().getFullYear()
}


// ===============================
// INITIAL PAGE
// ===============================

showPage("home")

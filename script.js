/* ============================================================
   Zurih Travel & Co — Static Site Script
   No dependencies. Vanilla JS only.
   ============================================================ */

// ---------- Places Data ----------
const PLACES = [
  {
    id: 1,
    name: "Морска градина",
    category: "Tourist Place",
    description: "Най-големият и известен обществен парк във Варна, разположен по протежение на бреговата линия.",
    city: "Varna",
    lat: 43.2077,
    lng: 27.9218
  },
  {
    id: 2,
    name: "Cathedral of the Assumption",
    category: "Tourist Place",
    description: "Катедралният храм Успение Богородично е един от символите на града.",
    city: "Varna",
    lat: 43.2085,
    lng: 27.9136
  },
  {
    id: 3,
    name: "The Social Teahouse",
    category: "Cafe",
    description: "Уютно място за чай, кафе и събития, с фокус върху социалното предприемачество.",
    city: "Varna",
    lat: 43.2141,
    lng: 27.9147
  },
  {
    id: 4,
    name: "Staria Chinar",
    category: "Restaurant",
    description: "Традиционен български ресторант, предлагащ вкусна храна в приятна атмосфера.",
    city: "Varna",
    lat: 43.2050,
    lng: 27.9100
  },
  {
    id: 5,
    name: "Varna Mall",
    category: "Local Business",
    description: "Голям търговски център с разнообразни магазини, кино и места за хранене.",
    city: "Varna",
    lat: 43.2200,
    lng: 27.8900
  }
];

// ---------- Category Helpers ----------
const CATEGORY_BADGE = {
  "Cafe":           "badge-cafe",
  "Restaurant":     "badge-restaurant",
  "Tourist Place":  "badge-tourist",
  "Local Business": "badge-business"
};

const CATEGORY_SVG = {
  "Tourist Place":  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  "Cafe":           `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  "Restaurant":     `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>`,
  "Local Business": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
};

function getBadgeClass(category) {
  return CATEGORY_BADGE[category] || "badge-default";
}

function getCategorySvg(category) {
  return CATEGORY_SVG[category] || `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
}

// ---------- Map Helpers ----------
function buildMapUrl(place) {
  if (!place || place.lat == null || place.lng == null) {
    return "https://www.openstreetmap.org/export/embed.html?bbox=27.8%2C43.15%2C28%2C43.25&layer=mapnik&marker=43.2141%2C27.9147";
  }
  const m = 0.05;
  const bbox = `${place.lng - m}%2C${place.lat - m}%2C${place.lng + m}%2C${place.lat + m}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${place.lat}%2C${place.lng}`;
}

// ---------- Render: Directory ----------
function renderDirectory() {
  const grid = document.getElementById("places-grid");
  if (!grid) return;

  grid.innerHTML = PLACES.map(p => {
    const badgeClass = getBadgeClass(p.category);
    const svg = getCategorySvg(p.category);
    return `
      <div class="place-card">
        <div class="place-card-header">
          <div class="place-card-top">
            <div>
              <h3 class="place-name">${p.name}</h3>
              <div class="place-city">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${p.city}
              </div>
            </div>
            <span class="badge ${badgeClass}">${svg} ${p.category}</span>
          </div>
        </div>
        <div class="place-card-body">
          <p class="place-desc">${p.description}</p>
        </div>
      </div>
    `;
  }).join("");
}

// ---------- Render: Map Sidebar ----------
let selectedPlaceId = null;

function renderMapSidebar() {
  const list = document.getElementById("sidebar-list");
  if (!list) return;

  list.innerHTML = PLACES.map(p => {
    const hasCoords = p.lat != null && p.lng != null;
    const isActive = selectedPlaceId === p.id;
    const badgeClass = getBadgeClass(p.category);
    const svg = getCategorySvg(p.category);

    const coordsHtml = hasCoords
      ? `<span class="sidebar-item-coords">📍 ${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}</span>`
      : `<span class="sidebar-item-coords no-coords">📍 No coordinates</span>`;

    return `
      <button
        class="sidebar-item ${isActive ? "active" : ""} ${!hasCoords ? "disabled" : ""}"
        data-id="${p.id}"
        ${!hasCoords ? "disabled" : ""}
      >
        <div class="sidebar-item-top">
          <span class="sidebar-item-name">${p.name}</span>
          <span class="badge ${badgeClass}">${svg} ${p.category}</span>
        </div>
        <p class="sidebar-item-desc">${p.description}</p>
        ${coordsHtml}
      </button>
    `;
  }).join("");

  // Attach click events
  list.querySelectorAll(".sidebar-item:not(.disabled)").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      selectedPlaceId = id;
      updateMap();
      renderMapSidebar();
    });
  });
}

function renderLegend() {
  const container = document.getElementById("legend-list");
  if (!container) return;

  const categories = [
    { cat: "Tourist Place" },
    { cat: "Cafe" },
    { cat: "Restaurant" },
    { cat: "Local Business" }
  ];

  container.innerHTML = categories.map(({ cat }) => {
    const count = PLACES.filter(p => p.category === cat && p.lat != null && p.lng != null).length;
    const svg = getCategorySvg(cat);
    return `
      <div class="legend-item">
        ${svg}
        <span>${cat}</span>
        <span class="legend-count">${count}</span>
      </div>
    `;
  }).join("");
}

function updateMap() {
  const iframe = document.getElementById("map-iframe");
  const footer = document.getElementById("map-footer");
  const subtitle = document.getElementById("map-subtitle");
  if (!iframe) return;

  const place = selectedPlaceId != null ? PLACES.find(p => p.id === selectedPlaceId) : null;
  iframe.src = buildMapUrl(place);

  if (footer) {
    footer.innerHTML = `<p>📍 ${place ? place.name : "Varna, Bulgaria"}</p>`;
    if (place && place.lat != null) {
      footer.innerHTML += `<p style="font-size:0.75rem;font-family:monospace;margin-top:0.25rem;color:var(--muted-fg)">${place.lat.toFixed(4)}, ${place.lng.toFixed(4)}</p>`;
    }
  }

  if (subtitle) {
    subtitle.textContent = place ? `📍 ${place.name}` : "Click on any place to see it on the map";
  }
}

// ---------- Page Routing ----------
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(l => {
    l.classList.toggle("active", l.dataset.page === pageId);
  });

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (pageId === "directory") renderDirectory();
  if (pageId === "map") {
    renderMapSidebar();
    renderLegend();
    updateMap();
  }
}

function getPageFromHash() {
  const hash = window.location.hash.replace("#", "");
  return ["home", "directory", "map"].includes(hash) ? hash : "home";
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Handle all nav link clicks
  document.querySelectorAll("[data-page]").forEach(el => {
    el.addEventListener("click", e => {
      const page = el.dataset.page;
      if (page) {
        e.preventDefault();
        history.pushState(null, "", "#" + page);
        showPage(page);
      }
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", () => showPage(getPageFromHash()));

  // Initial page
  showPage(getPageFromHash());
});

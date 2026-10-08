import { places } from "../data/discover.mjs";


const menuBtn = document.querySelector("#menu-btn");
const navMenu = document.querySelector("#nav-menu");

menuBtn?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "✕" : "☰";
});

document.querySelector("#copyright-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;


const MS_PER_DAY = 1000 * 60 * 60 * 24;
const STORAGE_KEY = "yuukay-discover-last-visit";

function getVisitMessage() {
  const now = Date.now();
  let last = null;

  try {
    last = Number(localStorage.getItem(STORAGE_KEY)) || null;
    localStorage.setItem(STORAGE_KEY, now);
  } catch {
    
  }

  if (!last) return "Welcome! Let us know if you have any questions.";

  const days = Math.floor((now - last) / MS_PER_DAY);
  if (days < 1) return "Awesome! Now you can discover more places in Abuja.";
  return `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}

const visitBox = document.querySelector("#visit-message");
visitBox.querySelector("p").textContent = getVisitMessage();
visitBox.hidden = false;
visitBox.querySelector("button").addEventListener("click", () => (visitBox.hidden = true));

/* ---------- Cards ---------- */
const grid = document.querySelector("#discover-grid");
const fragment = document.createDocumentFragment();

places.forEach((place, index) => {
  const card = document.createElement("section");
  card.className = `card place-${place.id}`;
  card.style.gridArea = `a${place.id}`; 

  const title = document.createElement("h2");
  title.textContent = place.name;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = place.image;
  img.alt = place.name;
  img.width = 300;
  img.height = 200;
  img.loading = index < 4 ? "eager" : "lazy";     
  if (index === 0) img.fetchPriority = "high";     
  img.addEventListener("error", () => (img.style.visibility = "hidden")); 
  figure.append(img);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Learn more";
  button.setAttribute("aria-label", `Learn more about ${place.name}`);
  button.addEventListener("click", () => window.open(place.url, "_blank", "noopener"));

  card.append(title, figure, address, description, button);
  fragment.append(card);
});

grid.append(fragment);

// Mobile menu toggle
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  links.classList.toggle("open");
});

// Close mobile menu after clicking a link
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    toggle.classList.remove("open");
    links.classList.remove("open");
  })
);

// Navbar shadow on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Portfolio filter
const filterBar = document.getElementById("filters");
const items = document.querySelectorAll(".gItem");
const applyFilter = (f) => {
  items.forEach((it) => {
    it.classList.toggle("hide", f !== "all" && it.dataset.cat !== f);
  });
};
if (filterBar) {
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    filterBar.querySelector(".active")?.classList.remove("active");
    btn.classList.add("active");
    applyFilter(btn.dataset.filter);
  });
  // Apply default active filter on load
  applyFilter(filterBar.querySelector(".active")?.dataset.filter || "all");
}

// Lightbox: click portfolio image to enlarge
const lb = document.createElement("div");
lb.className = "lightbox";
lb.innerHTML = '<button class="lb-close" aria-label="Tutup">&times;</button><img alt="">';
document.body.appendChild(lb);
const lbImg = lb.querySelector("img");

const openLightbox = (src, alt) => {
  lbImg.src = src;
  lbImg.alt = alt || "";
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
};
const closeLightbox = () => {
  lb.classList.remove("open");
  document.body.style.overflow = "";
};

document.querySelectorAll(".gItem img").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});
lb.addEventListener("click", (e) => {
  if (e.target !== lbImg) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Marquee (sliding rows): duplicate content + set speed
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-marquee]").forEach((m) => {
  const track = m.querySelector(".marquee-track");
  if (!track || reduceMotion) return;
  [...track.children].forEach((c) => track.appendChild(c.cloneNode(true)));
  const setDuration = () => {
    const speed = parseFloat(m.dataset.speed) || 70; // px per second
    const dur = track.scrollWidth / 2 / speed;
    track.style.setProperty("--duration", dur + "s");
  };
  setDuration();
  window.addEventListener("load", setDuration);
  window.addEventListener("resize", setDuration);
});

// Reveal on scroll
const revealTargets = document.querySelectorAll(
  ".section-head, .feature, .step, .price-card, .gItem, .stat, .about"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => io.observe(el));

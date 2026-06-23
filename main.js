const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  hamburger.textContent = navMenu.classList.contains("active")
    ? "✕"
    : "☰";
});

// close when clicking a link
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.textContent = "☰";
  });
});


const toggle = document.getElementById("darkToggle");
const body = document.body;

// load saved mode
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggle.innerHTML = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggle.innerHTML = "🌙";
  }
});
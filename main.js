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


// FB Ads
document.querySelectorAll(".ads-carousel").forEach((root) => {
  const track = root.querySelector(".carousel-track");
  const dotsWrap = root.querySelector(".carousel-dots");

  const firstClone = track.children[0].cloneNode(true);
  const lastClone = track.children[track.children.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  let slides = Array.from(track.children);
  let idx = 1;
  let isAnimating = false;

  dotsWrap.innerHTML = "";

  for (let i = 0; i < slides.length - 2; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      if (isAnimating) return;
      idx = i + 1;
      update();
    });
    dotsWrap.appendChild(dot);
  }

  const dots = Array.from(dotsWrap.children);

  function update(animate = true) {
    track.style.transition = animate ? "transform .45s ease" : "none";
    track.style.transform = `translateX(-${idx * 100}%)`;

    const realIndex =
      idx === 0
        ? slides.length - 3
        : idx === slides.length - 1
        ? 0
        : idx - 1;

    dots.forEach((d, i) => d.classList.toggle("active", i === realIndex));

    if (animate) isAnimating = true;
  }

  function next() {
    if (isAnimating) return;
    idx++;
    update();
  }

  function prev() {
    if (isAnimating) return;
    idx--;
    update();
  }

  root.querySelector(".next").addEventListener("click", next);
  root.querySelector(".prev").addEventListener("click", prev);

  track.addEventListener("transitionend", () => {
    isAnimating = false;

    if (idx === slides.length - 1) {
      idx = 1;
      // force reflow before snapping, so the "no transition" jump is actually rendered
      track.style.transition = "none";
      track.style.transform = `translateX(-${idx * 100}%)`;
      track.getBoundingClientRect(); // force reflow
    }

    if (idx === 0) {
      idx = slides.length - 2;
      track.style.transition = "none";
      track.style.transform = `translateX(-${idx * 100}%)`;
      track.getBoundingClientRect(); // force reflow
    }
  });

  let autoplay = setInterval(next, 5000);

  root.addEventListener("mouseenter", () => clearInterval(autoplay));
  root.addEventListener("mouseleave", () => {
    autoplay = setInterval(next, 5000);
  });

  // initial position, also needs the reflow guard
  track.style.transition = "none";
  track.style.transform = `translateX(-${idx * 100}%)`;
  track.getBoundingClientRect();
});

// Calendly
(function loadCalendlyWidget() {
  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  document.body.appendChild(script);
})();
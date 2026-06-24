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

  // Clear existing dots
  dotsWrap.innerHTML = "";

  // Create dots
  for (let i = 0; i < slides.length - 2; i++) {
    const dot = document.createElement("span");

    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      idx = i + 1;
      update();
    });

    dotsWrap.appendChild(dot);
  }

  const dots = Array.from(dotsWrap.children);

  function update(animate = true) {
    track.style.transition = animate
      ? "transform .45s ease"
      : "none";

    track.style.transform = `translateX(-${idx * 100}%)`;

    const realIndex =
      idx === 0
        ? slides.length - 3
        : idx === slides.length - 1
        ? 0
        : idx - 1;

    dots.forEach((d, i) =>
      d.classList.toggle("active", i === realIndex)
    );
  }

  function next() {
    idx++;
    update();
  }

  function prev() {
    idx--;
    update();
  }

  root.querySelector(".next").addEventListener("click", next);
  root.querySelector(".prev").addEventListener("click", prev);

  track.addEventListener("transitionend", () => {
    if (idx === slides.length - 1) {
      idx = 1;
      update(false);
    }

    if (idx === 0) {
      idx = slides.length - 2;
      update(false);
    }
  });

  let autoplay = setInterval(next, 5000);

  root.addEventListener("mouseenter", () => {
    clearInterval(autoplay);
  });

  root.addEventListener("mouseleave", () => {
    autoplay = setInterval(next, 5000);
  });

  update(false);
});
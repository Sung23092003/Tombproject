// DOM Elements
const weatherModal = document.getElementById("weatherModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const weatherLinks = document.querySelectorAll(".navbar__text-links a");
const nightOverlay = document.getElementById("nightOverlay");
const sky = document.querySelector(".sky");
const weatherEffect = document.querySelector(".weather-effect");
const pageMain = document.querySelector(".page-main");
const skyBird = document.querySelector(".sky__birds");

// ===== Hiệu ứng mưa =====
function createRain() {
  const numberOfDrops = 100;
  for (let i = 0; i < numberOfDrops; i++) {
    const drop = document.createElement("div");
    drop.classList.add("rain-drop");
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
    drop.style.animationDelay = `${Math.random()}s`;
    drop.style.top = `-${Math.random() * 100}px`;
    sky.appendChild(drop);
  }
}

// ===== Hiệu ứng tuyết =====
function createSnow() {
  const numberOfFlakes = 50;
  for (let i = 0; i < numberOfFlakes; i++) {
    const flake = document.createElement("div");
    flake.classList.add("snow-flake");
    flake.style.left = `${Math.random() * 100}vw`;
    flake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    flake.style.animationDelay = `${Math.random()}s`;
    flake.style.top = `-${Math.random() * 100}px`;
    sky.appendChild(flake);
  }
}

// ===== Hiệu ứng sét =====
function createLightning() {
  if (!document.querySelector(".lightning")) {
    const lightning = document.createElement("div");
    lightning.className = "lightning";
    lightning.classList.add('flash');
    sky.appendChild(lightning);
  }

  if (!document.querySelector(".lightning-bolt")) {
    const bolt = document.createElement("div");
    bolt.className = "lightning-bolt flash";
    bolt.innerHTML = `
      <div class="lightning-branch branch-1"></div>
      <div class="lightning-branch branch-2"></div>
    `;
    sky.appendChild(bolt);

    // Lặp hiệu ứng sét
    setInterval(() => {
      bolt.classList.remove("flash");
      void bolt.offsetWidth;
      bolt.classList.add("flash");
    }, Math.random() * 3000 + 3000);
  }
}

// ===== Dọn sạch hiệu ứng thời tiết =====
function removeWeatherEffects() {
  document.querySelectorAll(".rain-drop, .snow-flake").forEach((e) => e.remove());
  document.querySelector(".lightning")?.remove();
  document.querySelector(".lightning-bolt")?.remove();
}

// ===== Áp dụng trạng thái thời tiết =====
function applyWeatherState() {
  const isNight = localStorage.getItem("isNight") === "true";
  const weatherType = localStorage.getItem("weatherType") || "Sunny";
  const isHomePage =
    location.pathname.endsWith("home.html") ||
    location.pathname === "/" ||
    location.pathname === "/virtual-graveyard/";

  // Reset trạng thái
  sky.className = "sky";
  removeWeatherEffects();
  pageMain.classList.remove("page-main--snow");
  pageMain.classList.add("page-main--background");

  if (isNight) {
    nightOverlay?.classList.remove("hidden");
    sky.classList.add("sky--night");
  } else {
    nightOverlay?.classList.add("hidden");
    sky.classList.add("sky--day");
  }

  if (weatherType === "Rain" || weatherType === "Storm") {
    sky.classList.add("sky-rain");
    sky.appendChild(skyBird);
    createRain();
  }

  if (weatherType === "Snow") {
    sky.classList.add("sky-snow");
    sky.classList.remove("sky--day");
    skyBird.remove();
    createSnow();
    if (isHomePage) {
      pageMain.classList.remove("page-main--background");
      pageMain.classList.add("page-main--snow");
    }
  }

  if (weatherType === "Storm") {
    createLightning();
  }

  if (weatherEffect) {
    weatherEffect.className = "weather-effect";
    weatherEffect.classList.add(`weather-effect--${weatherType.toLowerCase()}`);
  }
}

// ===== Sự kiện mở Modal WEATHER =====
weatherLinks.forEach((link) => {
  if (link.textContent.trim().toUpperCase() === "WEATHER") {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      weatherModal.classList.remove("hidden");
    });
  }
});

// ===== Xử lý chọn icon trong Modal =====
const weatherIcons = document.querySelectorAll(".modal-content img");
weatherIcons.forEach((img) => {
  img.addEventListener("click", () => {
    const group = img.parentElement;
    group.querySelectorAll("img").forEach((i) => i.classList.remove("selected"));
    img.classList.add("selected");
  });
});

// ===== Lưu lựa chọn & áp dụng =====
closeModalBtn.addEventListener("click", function () {
  weatherModal.classList.add("hidden");

  const selectedDayNight = document.querySelector(
    ".day-night-options img.selected"
  );
  const isNight = selectedDayNight?.alt === "Night";
  localStorage.setItem("isNight", isNight);

  const selectedWeather = document.querySelector(
    ".weather-options img.selected"
  );
  const weatherType = selectedWeather?.alt || "Sunny";
  localStorage.setItem("weatherType", weatherType);

  applyWeatherState();
});

// ===== Đóng modal khi click ra ngoài =====
weatherModal.addEventListener("click", function (e) {
  if (e.target === weatherModal) {
    weatherModal.classList.add("hidden");
  }
});

// ===== Load thời tiết khi vào trang =====
window.addEventListener("DOMContentLoaded", () => {
  applyWeatherState();
});

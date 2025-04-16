const weatherModal = document.getElementById("weatherModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const weatherLinks = document.querySelectorAll(".navbar__text-links a");
const nightOverlay = document.getElementById("nightOverlay");
const sky = document.querySelector(".sky");
const birds = document.querySelector(".sky__birds");

// Bắt sự kiện mở modal khi click vào "WEATHER"
weatherLinks.forEach((link) => {
  if (link.textContent.trim() === "WEATHER") {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      weatherModal.classList.remove("hidden");
    });
  }
});

// Bắt sự kiện đóng modal khi click nút đóng
closeModalBtn.addEventListener("click", function () {
  weatherModal.classList.add("hidden");
  const dayNightSelected = document.querySelector(
    ".day-night-options img.selected"
  );

  if (dayNightSelected && dayNightSelected.alt === "Night") {
    nightOverlay.classList.remove("hidden");
    sky.classList.remove("sky--day");
    sky.classList.add("night");
  } else {
    nightOverlay.classList.add("hidden");
    sky.classList.add("sky--day");
    sky.classList.remove("night");
  }
});

// Bắt sự kiện chọn icon
const weatherIcons = document.querySelectorAll(".modal-content img");

weatherIcons.forEach((img) => {
  img.addEventListener("click", () => {
    img.parentElement
      .querySelectorAll("img")
      .forEach((i) => i.classList.remove("selected"));
    img.classList.add("selected");
  });
});

// Đóng modal khi click ra ngoài phần nội dung
weatherModal.addEventListener("click", function (e) {
  if (e.target === weatherModal) {
    weatherModal.classList.add("hidden");
  }
});

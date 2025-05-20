  document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".footer__links a");
  const activeHref = localStorage.getItem("activeFooterLink");

  if (activeHref) {
    links.forEach((link) => {
      if (link.getAttribute("href") === activeHref) {
        link.classList.add("active");
      }
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Ngăn chuyển trang ngay lập tức

      const href = link.getAttribute("href");
      localStorage.setItem("activeFooterLink", href);

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 300); // Phải nhỏ hơn hoặc bằng transition trong CSS
    });
  });
});

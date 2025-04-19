document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".footer__links a");
  
    // Đọc trạng thái được lưu trong localStorage
    const activeHref = localStorage.getItem("activeFooterLink");
  
    if (activeHref) {
      links.forEach((link) => {
        if (link.getAttribute("href") === activeHref) {
          link.classList.add("active");
        }
      });
    }
  
    links.forEach((link) => {
      link.addEventListener("click", () => {
        // Lưu href vào localStorage
        localStorage.setItem("activeFooterLink", link.getAttribute("href"));
      });
    });
  });
  
function toggleMenu() {
  const menu = document.getElementById("menu");
  const burger = document.querySelector(".burger");

  const isOpen = menu.classList.toggle("open");
  if (burger) burger.setAttribute("aria-expanded", String(isOpen));
}

/* ✅ Scroll Animation */
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll("[data-reveal]");
  const menu = document.getElementById("menu");
  const burger = document.querySelector(".burger");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));

  // ✅ Menü schließen, wenn man irgendwo außerhalb klickt (modernes Verhalten)
  document.addEventListener("click", (e) => {
    if (!menu || !burger) return;

    const clickedInsideMenu = menu.contains(e.target);
    const clickedBurger = burger.contains(e.target);

    if (!clickedInsideMenu && !clickedBurger && menu.classList.contains("open")) {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  // ✅ Menü schließen, wenn man einen Link klickt
  if (menu) {
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        if (burger) burger.setAttribute("aria-expanded", "false");
      });
    });
  }
});

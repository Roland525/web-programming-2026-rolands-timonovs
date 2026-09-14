const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

menuButton.addEventListener("click", () => {
  const isOpen = mainNav.classList.contains("hidden");
  mainNav.classList.toggle("hidden", !isOpen);
  mainNav.classList.toggle("flex", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("bg-slate-100", isActive);
      item.classList.toggle("text-[#172033]", isActive);
      item.classList.toggle("text-[#6c7485]", !isActive);
    });
    projectCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.status === selectedFilter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

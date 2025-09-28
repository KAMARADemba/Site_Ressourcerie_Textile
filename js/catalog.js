// --------------------
// Tri du catalogue
// --------------------
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("sort-select");
  const productsGrid = document.querySelector(".products-grid");

  if (!select || !productsGrid) return;

  select.addEventListener("change", () => {
    const cards = Array.from(productsGrid.querySelectorAll(".product-card"));

    cards.sort((a, b) => {
      const priceA = parseFloat(a.querySelector(".price").textContent.replace("€", "").trim());
      const priceB = parseFloat(b.querySelector(".price").textContent.replace("€", "").trim());

      if (select.value === "asc") {
        return priceA - priceB;
      } else if (select.value === "desc") {
        return priceB - priceA;
      }
      return 0;
    });

    // Réinjecte les produits triés dans la grille
    cards.forEach(card => productsGrid.appendChild(card));
  });
});

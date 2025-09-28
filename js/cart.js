// --------------------
// Gestion du panier
// --------------------
const CART_KEY = "ecoShopCart";

// Charger le panier depuis localStorage
function loadCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Sauvegarder dans localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Ajouter un produit
function addToCart(product) {
  let cart = loadCart();
  let existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  alert(`${product.name} a été ajouté au panier 🛒`);
}

// Supprimer un produit
function removeFromCart(name) {
  let cart = loadCart().filter(item => item.name !== name);
  saveCart(cart);
  renderCart();
}

// Mettre à jour la quantité
function updateQuantity(name, quantity) {
  let cart = loadCart();
  let item = cart.find(p => p.name === name);
  if (item) {
    item.quantity = quantity;
  }
  saveCart(cart);
  renderCart();
}

// Afficher le panier (sur cart.html)
function renderCart() {
  const cartItems = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total");

  if (!cartItems || !cartTotal) return; // si pas sur la page panier

  let cart = loadCart();
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${item.price} €</p>
        <input type="number" value="${item.quantity}" min="1">
      </div>
      <button class="remove-btn">🗑</button>
    `;

    // Gérer la suppression
    div.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(item.name));

    // Gérer la mise à jour de quantité
    div.querySelector("input").addEventListener("change", (e) => {
      updateQuantity(item.name, parseInt(e.target.value));
    });

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2) + " €";
}

// Lancer le rendu sur cart.html
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.contains(document.querySelector(".cart-items"))) {
    renderCart();
  }

  // Ajouter au panier (catalog.html)
  document.querySelectorAll(".product-card").forEach(card => {
    const btn = card.querySelector("button");
    btn.addEventListener("click", () => {
      const name = card.querySelector("h3").textContent;
      const price = parseFloat(card.querySelector(".price").textContent.replace("€", "").trim());
      const image = card.querySelector("img").getAttribute("src");

      addToCart({ name, price, image });
    });
  });
});

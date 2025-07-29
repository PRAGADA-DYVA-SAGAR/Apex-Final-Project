function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((id, index) => {
    const product = productData.find(p => p.id === id);
    if (product) {
      total += product.price;

      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <img src="${product.img}" alt="${product.name}" />
        <div>
          <h4>${product.name}</h4>
          <p>Price: ₹${product.price}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(item);
    }
  });

  cartTotal.innerHTML = `<h3>Total: ₹${total}</h3><button onclick="checkout()">Checkout</button>`;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function checkout() {
  alert("Checkout successful! Thank you for shopping.");
  localStorage.removeItem("cart");
  loadCart();
  updateCartCount();
}

window.onload = () => {
  loadCart();
  updateCartCount();
};
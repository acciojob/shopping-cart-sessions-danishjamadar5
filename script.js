// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Event listeners
productList.addEventListener("click", addToCart);
cartList.addEventListener("click", removeFromCart);
clearCartBtn.addEventListener("click", clearCart);

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";

  const cartItems = getSessionCart();
  if (cartItems.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Your cart is empty.";
    cartList.appendChild(li);
  } else {
    cartItems.forEach((cartItem) => {
      const product = getProductById(cartItem.productId);
      if (product) {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove</button>`;
        cartList.appendChild(li);
      }
    });
  }
}

// Add item to cart
function addToCart(event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));

    const cartItems = getSessionCart();
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      cartItems.push({ productId: productId, quantity: 1 });
    }

    setSessionCart(cartItems);
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));

    const cartItems = getSessionCart();
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.productId === productId
    );

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      setSessionCart(cartItems);
      renderCart();
    }
  }
}

// Clear cart
function clearCart() {
  clearSessionCart();
  renderCart();
}

// Utility functions for session storage
function getSessionCart() {
  const cartData = sessionStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

function setSessionCart(cartItems) {
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
}

function clearSessionCart() {
  sessionStorage.removeItem("cart");
}

// Utility function to get product by ID
function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

// Initial render
renderProducts();
renderCart();

const addToCartButton = document.querySelector("#addToCart");
const inputQuantity = document.querySelector("#inputQuantity");
const productId = document.querySelector("#productID");

addToCartButton.addEventListener("click", () => {
  if (checkIfLoggedIn()) {
    const quantity = parseInt(inputQuantity.value);
    //   if (quantity > 0 && quantity <= product.stock) {
    addToCart(productId.value, quantity);
    //   }
  } else {
    $("#loginModal").modal("toggle");
  }
});

async function getCartItems(userId) {
  let response = await fetch(" http://localhost:3000/cart/" + userId);
  if (response.ok) {
    let json = await response.json();
    document.querySelector("#cartCount").innerText = json.length;
  } else {
    console.log(" HTTP- Error: " + response.status);
  }
}

async function addToCart(productId, quantity) {
  let data = {
    userId: localStorage.getItem("userId"),
    productId: productId,
    quantity: quantity,
  };
  let response = await fetch("http://localhost:3000/cart/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    let json = await response.json();
    viewOptions(json.product.id);
    renderPageForAuth();
  } else {
    console.log(" HTTP- Error: " + response.status);
  }
}

function handleMinus() {
  if (inputQuantity.value > 1) {
    inputQuantity.value = inputQuantity.value - 1;
    inputQuantity.textContent = inputQuantity.value;
  }
}
function handlePlus() {
  const max = inputQuantity.getAttribute("max");
  if (inputQuantity.value < max) {
    const currentValue = parseInt(inputQuantity.value);
    inputQuantity.value = currentValue + 1;
    inputQuantity.textContent = inputQuantity.value;
  }
}

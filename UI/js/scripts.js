const form = document.getElementById("mainForm");
form.addEventListener("submit", handleSubmit);

function storeInLocalStorage(res) {
  localStorage.setItem("authKey", res.token);
  localStorage.setItem("userId", res.id);
  localStorage.setItem("fullName", res.fullName);
  localStorage.setItem("email", res.email);
}

async function renderSelected(product) {
  const descrElement = document.querySelector("#descr");
  descrElement.classList.remove("d-none");

  const imgElement = document.querySelector(".card-img-top");
  const skuElement = document.querySelector(".small");
  const titleElement = document.querySelector(".name-element");
  const priceElement = document.querySelector(".price-element");
  const descriptionElement = document.querySelector(".desc-element");
  const inputQuantity = document.querySelector("#inputQuantity");
  const productID = document.querySelector("#productID");
  const addToCartButton = document.querySelector("#addToCart");

  imgElement.src = "../server-side/uploads/" + product.imageName;
  skuElement.textContent = `SKU: ${product.id}`;
  titleElement.textContent = product.name;
  priceElement.innerHTML = `
      <span>$${product.price.toFixed(2)}</span>
      <br>
      <small class="text-muted">${product.stock} ${
    product.stock > 1 ? "items" : "item"
  } remaining </small>
  ${
    product.stock == 0
      ? '<span class="badge bg-warning text-dark"><i class="bi bi-exclamation-triangle"></i> Out of Order</span>'
      : ""
  }
    `;
  inputQuantity.max = product.stock;
  inputQuantity.min = 1;
  inputQuantity.innerHTML = 1;
  inputQuantity.value = 1;
  productID.value = product.id;

  descriptionElement.textContent = product.description;

  if (product.stock == 0) {
    addToCartButton.disabled = true;
    inputQuantity.disabled = true;
  } else {
    addToCartButton.disabled = false;
    inputQuantity.disabled = false;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;
  let loginData = {
    email: email,
    password: password,
  };
  login(loginData);
  form.reset();
}

renderPageForAuth();
fetchAllProduct();

async function fetchAllProduct() {
  let response = await fetch(" http://localhost:3000/products/");
  if (response.ok) {
    let json = await response.json();
    renderUIProducts(json);
  } else {
    console.log(" HTTP- Error: " + response.status);
  }
}

async function viewOptions(itemId) {
  let response = await fetch("http://localhost:3000/products/" + itemId);
  // console.log(response)
  if (response.ok) {
    let json = await response.json();
    console.log(json)
    renderSelected(json);
  } else {
    console.log(" HTTP- Error: " + response.status);
  }
}

function renderUIProducts(json) {
  json.forEach((product) => {
    let card = document.createElement("div");
    card.classList.add("col", "mb-5");
    card.innerHTML = `
        <div class="card h-100">
          <div class="products-thumbnail">
            <img class="card-img-top" src="http://localhost:3000/products/image/${
              product.imageName
            }"  alt="${product.name}" />
          </div>
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${product.name}</h5>
              <span>$${product.price.toFixed(2)}</span>
              <br>
              <small class="text-muted">${product.stock} ${
      product.stock > 1 ? "items" : "item"
    } remaining</small>
              <br>
              ${
                product.stock == 0
                  ? '<span class="badge bg-warning text-dark"><i class="bi bi-exclamation-triangle"></i> Out of Order</span>'
                  : ""
              }
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center" onclick="viewOptions(${product.id})">
              <a class="btn btn-outline-dark mt-auto" href="#main-panel">View options</a>
            </div>
          </div>
        </div>
      `;
    document.querySelector(".items").appendChild(card);
  });
}

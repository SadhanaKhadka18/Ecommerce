window.onload = function () {
  if (!localStorage.getItem("userId")) {
    window.location.href = "../index.html";
  }
};

const confirm = document.getElementById("checkout");

confirm.addEventListener("click", function () {
  confirmOrder(localStorage.getItem("userId"));
});

async function getCartItems(userId) {
  // console.log("hereeeeee")
  let response = await fetch("http://localhost:3000/cart/" + userId);
  console.log("response",response);
  if (response.ok) {
    let json = await response.json();
    console.log("json",json)
    document
      .querySelectorAll(".cartCount")
      .forEach((item) => (item.innerText = json.length));
    document.getElementById("totalPrice").innerHTML = json
      .reduce((acc, cur) => {
        return acc + cur.total;
      }, 0)
      .toFixed(2);
    // cartItems
    let element = "";
    json.forEach((item) => {
      
      element += `
                    <div class="row border-top border-bottom p-3">
                        <div class="col-2"><img class="img-fluid cart-image" src="http://localhost:3000/products/image/${
                          item.product.imageName
                        }" alt="${item.product.name}"></div>
                        <div class="col">
                            <div class="row">${item.product.name}</div>
                        </div>
                        <div class="col">
                            ${item.quantity}
                        </div>
                        <div class="col">&dollar;${item.product.price.toFixed(
                          2
                        )}
                        </div>
                        <div class="col">&dollar;${item.total.toFixed(2)}</div>
                        <div class="col"><button class="red-button" onclick="deleteItem(${
                          item.id
                        })"><i class="bi bi-trash"></i></button></div>
                    </div>
        `;
    });

    document.getElementById("cartItems").innerHTML = element;
  } else {
    console.log(" HTTP- Error: " + response.status);
  }
}

async function deleteItem(itemId) {
  const response = await fetch("http://localhost:3000/cart/" + itemId, {
    method: "DELETE",
  });

  if (response.ok) {
    getCartItems(localStorage.getItem("userId"));
  } else {
    alert("HTTP Error", response.status);
  }
}
async function confirmOrder(userId) {
  const response = await fetch(
    "http://localhost:3000/cart/checkout/" + userId,
    {
      method: "POST",
    }
  );

  if (response.ok) {
    getCartItems(localStorage.getItem("userId"));
  } else {
    alert("HTTP Error", response.status);
  }
}

getCartItems(localStorage.getItem("userId"));

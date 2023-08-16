async function login(data) {
  let response = await fetch("http://localhost:3000/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    let json = await response.json();
    if (json != false) {
      let myModalEl = document.getElementById("loginModal");
      let modal = bootstrap.Modal.getInstance(myModalEl);
      document.getElementById("incorrect-password").classList.add("d-none");
      modal.hide();
      storeInLocalStorage(json);
      renderPageForAuth();
    } else {
      document.getElementById("incorrect-password").classList.remove("d-none");
    }
  } else {
    console.log(" HTTP- Error: " + response.status);
  }
}

function renderPageForAuth() {
  let data = localStorage.getItem("authKey");
  let name = localStorage.getItem("fullName");

  if (data) {
    document.querySelector(".for-modal").classList.add("d-none");
    let wel = document.querySelector(".welcome-user");
    wel.innerHTML = `Welcome ${name} <small class="text-muted" role="button" onclick="logout()">( Logout )</small>`;
    wel.classList.remove("d-none");
    getCartItems(localStorage.getItem("userId"));
    // console.log(localStorage.getItem("userId"))
  } else {
    document.querySelector(".for-modal").classList.remove("d-none");
    document.querySelector(".welcome-user").classList.add("d-none");
    document.querySelector("#cartCount").innerText = 0;
    document.querySelector("#cart-icon").classList.add("d-none");
  }
}

function checkIfLoggedIn() {
  let data = localStorage.getItem("authKey");
  if (data) {
    return true;
  } else {
    return false;
  }
}

function logout() {
  localStorage.clear();
  renderPageForAuth();
}

const CATEGORIES_URL =
  "http://localhost:3000/categories";
const PUBLISH_PRODUCT_URL =
  "http://localhost:3000/publishProduct";
const CATEGORY_INFO_URL =
  "http://localhost:3000/categoryInfo";
const PRODUCTS_URL =
  "http://localhost:3000/products";
const PRODUCT_INFO_URL =
  "http://localhost:3000/productInfo";
const PRODUCT_INFO_COMMENTS_URL =
  "http://localhost:3000/comments";
const CART_INFO_URL = "http://localhost:3000/carrito";
const CART_BUY_URL = "http://localhost:3000/carritoBuy";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

const showLogin = () => {
  if (localStorage.getItem("cargado")) {
  } else {
    window.location.replace("login.html");
  }
};

const showUser = () => {
  var user = localStorage.getItem("user");
  let userPrint = "";

  let firstDiv = document.querySelector("div");

  if (user != undefined) {
    userPrint += `
    <div class="btn-group">
      <button type="button" class="btn" id="btnUser" href="my-profile.html">${user}</button>
      <button type="button" class="btn dropdown-toggle dropdown-toggle-split" id="btnUser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
        <a class="dropdown-item" href="cart.html">Mi Carrito</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" id="logout" href="">Salir</a>
      </div>
    </div>
  `;
  }
  firstDiv.innerHTML += userPrint;
};

//Funci??n que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  showLogin();
  showUser();

  document.getElementById("logout").addEventListener("click", function (e) {
    e.preventDefault();

    localStorage.removeItem("cargado");
    localStorage.removeItem("datos");

    window.location.replace("login.html");
  });

  document.getElementById("btnUser").addEventListener("click", function (e) {
    window.location = "my-profile.html";
  });
});


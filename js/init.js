const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

const showLogin = () => {
  if (sessionStorage.getItem("cargado")) {
  } else {
    window.location.replace("login.html");
  }
}

const showUser = () => {
  var user = sessionStorage.getItem("user");
  let userPrint = "";

  if (user != undefined) {
    userPrint += `
  <nav class="site-header sticky-top py-1 bg-dark">
    <div class="container d-flex flex-column flex-md-row justify-content-between">
      <a class="py-2 d-none d-md-inline-block" href="index.html">Inicio</a>
      <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
      <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
      <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
      <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
      <div>
      <a class="py-2 d-none d-md-inline-block" id="unamePrinted" href="my-profile.html">${user}
      <a class="py-2 d-none d-md-inline-block" id="logout" href="">Salir</a>
      </a>
      </div>
    </div>
  </nav>
  `
  }
  document.getElementsByTagName("nav")[0].innerHTML = userPrint;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  showLogin();
  showUser();

  document.getElementById("logout").addEventListener("click", function (e) {
    e.preventDefault();
    
    sessionStorage.removeItem("cargado");

    window.location.replace("login.html");
  });

});
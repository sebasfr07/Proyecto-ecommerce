// function countProductSustract(quantity){
//     quantity--;
// }

function showCart(cart) {
  let article = cart.articles[0];
  var quantity = article.count;

  //Hace una lista de los radio buttons, los recorre y devuelve el valor del seleccionado.

  let cartInfo = "";
  cartInfo += `
    <div class="Cart-Items">
 <div class="image-box">
 <img src="${article.src}" style={{ height="120px" }} />
 </div>
 <div class="about">
 <h1 class="title">${article.name}</h1>
 <br>
 <h3 class="subtitle">Deshodorante de ambiente para auto.</h3>
 </div>
 <div class="counter">
 <div class="btnCart" id="addProduct">+</div>
 <div class="count" id="quantity">${quantity}</div>
 <div class="btnCart" id="sustractProduct">-</div>
 </div>
 <div class="prices">${article.unitCost}$ ${article.currency}</div>
 </div>
 <hr> 
 <div class="checkout">
 <div class="total">
 <div>
 <div class="Subtotal">Sub-Total</div>
 <div class="items" id="itemQuantity">${quantity} item</div>
 </div>
 <div class="subtotal-amount" id="subTotal">${
   article.unitCost * quantity
 }$</div>
 </div>
 <br>
 <div id="totalDiv">
 <div class="totalText">Total</div>
 <div class="total-amount" id="Total">${quantity*article.unitCost + (quantity*article.unitCost*15)/100}$</div>
 </div>
 <input type="submit" class="button" value="Checkout">
 </div>
    `;
  document.getElementById("cartProducts").innerHTML = cartInfo;
  let itemQuantity = document.getElementById("itemQuantity");
  let subTotal = document.getElementById("subTotal");
  let unitCost = article.unitCost;

  countProduct(quantity, subTotal, unitCost, itemQuantity);
  showTotalShipping(quantity, unitCost);
}

function countProduct(quantity, subtotal, unitCost, itemQuantity) {
  let add = document.getElementById("addProduct");
  let sustract = document.getElementById("sustractProduct");
  let newQuantity = document.getElementById("quantity");
  let subTotal = subtotal;
  let item = itemQuantity;
  let sTotal = quantity * unitCost;

  let shippingValue = 15;
  let premium = document.getElementById("premiumShipping");
  let express = document.getElementById("expressShipping");
  let standard = document.getElementById("standardShipping");
  premium.addEventListener("click", function () {
    shippingValue = 15;
    document.getElementById("Total").innerHTML =
      sTotal + (sTotal * shippingValue) / 100 + "$"
  });
  express.addEventListener("click", function () {
    shippingValue = 7;
    document.getElementById("Total").innerHTML =
      sTotal + (sTotal * shippingValue) / 100 + "$"
  });
  standard.addEventListener("click", function () {
    shippingValue = 5;
    document.getElementById("Total").innerHTML =
      sTotal + (sTotal * shippingValue) / 100 + "$"
  });

  add.addEventListener("click", async function (e) {
    quantity++;
    newQuantity.innerHTML = quantity;
    item.innerHTML = quantity + " item";
    subTotal.innerHTML = quantity * unitCost + "$";
    sTotal = quantity * unitCost;
    document.getElementById("Total").innerHTML =
      sTotal + (sTotal * shippingValue) / 100 + "$";
  });
  sustract.addEventListener("click", async function (e) {
    if (quantity == 0) {
      quantity = 1;
    }
    quantity--;
    newQuantity.innerHTML = quantity;
    item.innerHTML = quantity + " item";
    subTotal.innerHTML = quantity * unitCost + "$";
    sTotal = quantity * unitCost;
    document.getElementById("Total").innerHTML =
      sTotal + (sTotal * shippingValue) / 100 + "$";
  });
}

function showTotalShipping(quantity, unitCost) {
  let subTotalforTotal = document.getElementById("subTotal");
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
  const cart = (await getJSONData(CART_INFO_URL)).data;
  showCart(cart);
});

// <div class="total-amount" id="Total">${(article.unitCost * quantity)+((article.unitCost * quantity)/100)}$</div>

//probar con 3 adeventlisteners para los radios

// document.querySelectorAll('input[name="radioShipping"]').forEach((elem) => {
//   elem.addEventListener("click", function (event) {
//     var shippingCost = event.target.value;
//     document.getElementById("save").innerText = shippingCost;
//     console.log(Number(document.getElementById("save").textContent));
//     var save = Number(document.getElementById("save").textContent);
//     document.getElementById("Total").innerHTML = sTotal+(sTotal*save)/100 + "$";
//     console.log(save);
//   });
// });

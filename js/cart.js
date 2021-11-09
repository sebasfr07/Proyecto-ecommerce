let addressPattern = /^\d{4}$/;
let streetPattern = /^[\w-]{1,20}$/;
let cornerPattern = /^([ ]?\.?[a-zA-Z]+)+$/;


//funcion encargada de imprimir el carrito y el checkout
function showCart(cart) {
  let article = cart.articles[0];
  //defino una variable que utilizare en las dos funciones
  var quantity = article.count;

  //imprime el carrito
  let cartInfo = "";
  cartInfo += `
    <div class="Cart-Items">
 <div class="image-box">
 <img src="${article.src}" style={{ height="120px" }} />
 </div>
 <div class="about">
 <h1 class="lead font-weight-bold">${article.name}</h1>
 <br>
 <h3 class="lead">Deshodorante de ambiente para auto.</h3>
 </div>
 <div class="counter">
 <div class="btnCart" id="addProduct">+</div>
 <div class="count" id="quantity">${quantity}</div>
 <div class="btnCart" id="sustractProduct">-</div>
 </div>
 <div class="prices">${article.unitCost}$ ${article.currency}</div>
 </div>
 <hr> 
    `;

  //imprime el checkout
  let cartCheckout = "";
  cartCheckout += `
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
 <div class="total-amount" id="Total">${
   quantity * article.unitCost + (quantity * article.unitCost * 15) / 100
 }$</div>
 </div>
 <button type="button" class="button" data-toggle="modal" data-target="#myModal">Método de pago</button>
 <input type="submit" class="button" value="Comprar">
 </div>
    `;
  document.getElementById("checkoutZone").innerHTML = cartCheckout;
  document.getElementById("cartProducts").innerHTML = cartInfo;

  //defino otras dos variables para pasarselas a la funcion
  let itemQuantity = document.getElementById("itemQuantity");
  let subTotal = document.getElementById("subTotal");
  let unitCost = article.unitCost;

  countProduct(quantity, subTotal, unitCost, itemQuantity);
}

//funcione para validar//////////////////////////////
function validate(adress, street, corner){
  if(!streetPattern.test(street)){
    alert("Necesita colocar una dirección válida.")
  }else if(!addressPattern.test(adress)){
    alert("Necesita colocar un número de dirección válido.")
  }else if(!cornerPattern.test(corner)){
    alert("Necesita colocar una esquina válida.")
  };
};
//////////////////////////////////////////////////////


//funcion que se encarga del checkout
function countProduct(quantity, subtotal, unitCost, itemQuantity) {
  //creo variables con los elementos ya creados en ShowCart
  let add = document.getElementById("addProduct");
  let sustract = document.getElementById("sustractProduct");
  let newQuantity = document.getElementById("quantity");
  //cambio el valor de las variables
  let subTotal = subtotal;
  let item = itemQuantity;
  let sTotal = quantity * unitCost;

  //seleccion de metodo de envio
  let shippingValue = 15;
  let premium = document.getElementById("premiumShipping");
  let express = document.getElementById("expressShipping");
  let standard = document.getElementById("standardShipping");
  premium.addEventListener("click", function () {
    shippingValue = 15;
    document.getElementById("Total").innerHTML =
      sTotal + (sTotal * shippingValue) / 100 + "$";
  });
  express.addEventListener("click", function () {
    shippingValue = 7;
    document.getElementById("Total").innerHTML =
      sTotal + (sTotal * shippingValue) / 100 + "$";
  });
  standard.addEventListener("click", function () {
    shippingValue = 5;
    document.getElementById("Total").innerHTML =
      sTotal + (sTotal * shippingValue) / 100 + "$";
  });

  //añadir o quitar items
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

  //submit
  document.getElementById("formCart").addEventListener("submit", function (e) {
    e.preventDefault();
    let address = document.getElementById("address").value;
    let street = document.getElementById("street").value;
    let corner = document.getElementById("corner").value;
    validate(address, street, corner);

    console.log(quantity);
    if(quantity === 0){
      alert("No hay productos para comprar.")
    }else{
    let totalPrice = sTotal + (sTotal * shippingValue) / 100;
    localStorage.setItem("totalPrice", totalPrice);
    console.log(localStorage.getItem("totalPrice"));
    document.getElementById("formCart").reset();
  }
  });
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
  const cart = (await getJSONData(CART_INFO_URL)).data;
  showCart(cart);
});

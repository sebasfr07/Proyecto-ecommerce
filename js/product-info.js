const formComments = document.getElementById("formComment");

const showImages = (product) => {
  let imagesGroup = "";
  for (let images of product.images) {
    imagesGroup += `
            <img src="${images}" class="imagenesAuto"></img>
        `;
  }
  document.getElementById("imgsProduct").innerHTML = imagesGroup;
};

const showProductInfo = (product) => {
  // let infoProductos = "<ul>";
  let infoProducts = "";
  showImages(product);
  //titulo
  infoProducts += `<div><h1 class='onyxTitle'>${product.name}</h1></div>`; 
  //categoria
  infoProducts += `<div><h5>Categoria: <a class='onyxCategory' href='category-info.html'>${product.category}</a></h5></div>`;
  //precio
  infoProducts += `<div><h5 class='onyxCost'><span>${product.cost} ${product.currency}</span></h5></div>`;
  //vendidos
  infoProducts += `<div class='onyxSoldCount'><p>${product.soldCount} unidades vendidas</p></div>`;
  //descripcion
  infoProducts += `<div><p class='onyxDescription'>${product.description}</p></div>`;
  
  console.log(product);
  document.getElementById("infoProduct").innerHTML = infoProducts;
};

formComments.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("comentario").value = "";
  alert("Tu comentario a sido enviado con exito.");
});

const showComments = (comments) => {
  let infoComments = "<div class='contendor__comentarios'>";

  comments.forEach((comment) => {
    let stars = "";
    for (let i = 0; i < comment.score; i++) {
      stars += "★";
    }
    infoComments += `
    <div class='comment'>
        <div class='estrellitasDiv'>
          <span class='estrellitas'>${stars}</span>
          <b class='hora'>${comment.dateTime.slice(11, 19)}</b>
        </div>
      <h6>
      <b class='fecha'>${comment.dateTime.slice(0, 10)}:</b> ${
      comment.user
    }</h6>
      <p>${comment.description}</p>
    </div> 
    `;
  });
  infoComments += "</div>";
  document.getElementById("infoComments").innerHTML = infoComments;
};

const showRelated = (product, products) => {
  let relProducts = ""
  for (let relatedProducts of product.relatedProducts) {
    let related = products[relatedProducts];
    relProducts += `
    <a href="products.html" class="list-group-item list-group-item-action">
    <div class="row">
        <div class="imgRelProd">
            <img src="${related.imgSrc}" alt="${related.description}" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">${related.name}</h4>
            </div>
            <p class="mb-1 text-left">${related.description}</p>
            <p class="text-muted-cost">${related.cost} ${related.currency}</p>
        </div>
    </div>
    </a>`
  }
  document.getElementById('relatedProductsDiv').innerHTML = relProducts;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
  const product = (await getJSONData(PRODUCT_INFO_URL)).data;
  const products = (await getJSONData(PRODUCTS_URL)).data;
  showProductInfo(product);
  showComments((await getJSONData(PRODUCT_INFO_COMMENTS_URL)).data);
  showRelated(product, products);
});

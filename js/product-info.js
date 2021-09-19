const formComentarios = document.getElementById("formComment");

const showImages = (product) => {
  let imagenes = "";
  for (let images of product.images) {
    imagenes += `
            <img src="${images}" class="imagenesAuto"></img>
        `;
  }
  document.getElementById("imgsProduct").innerHTML = imagenes;
};

const showProductInfo = (product) => {
  // let infoProductos = "<ul>";
  let infoProductos = "";
  showImages(product);
  //titulo
  infoProductos += `<div><h1 class='onyxTitle'>${product.name}</h1></div>`; 
  //categoria
  infoProductos += `<div><h5>Categoria: <a class='onyxCategory' href='category-info.html'>${product.category}</a></h5></div>`;
  //precio
  infoProductos += `<div><h5 class='onyxCost'><span>${product.cost} ${product.currency}</span></h5></div>`;
  //vendidos
  infoProductos += `<div class='onyxSoldCount'><p>${product.soldCount} unidades vendidas</p></div>`;
  //descripcion
  infoProductos += `<div><p class='onyxDescription'>${product.description}</p></div>`;
  
  console.log(product);
  document.getElementById("infoProduct").innerHTML = infoProductos;
};

formComentarios.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("comentario").value = "";
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
  const product = (await getJSONData(PRODUCT_INFO_URL)).data;
  showProductInfo(product);
  showComments((await getJSONData(PRODUCT_INFO_COMMENTS_URL)).data);
});

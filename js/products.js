/*const list = document.getElementById('products');
  console.log(list);

  list.setAttribute('class', "list");

const showList = (autos) => {
  
  for (let auto of autos) {
    const item = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h1");
    const description = document.createElement('p');
   
    var price = document.createElement('p');
    var priceText = document.createTextNode(`${auto.currency} ${auto.cost}`)
    price.appendChild(priceText)

    var soldCount = document.createElement('p');
    var soldCountText = document.createTextNode(`${auto.soldCount} vendidos`)
    soldCount.appendChild(soldCountText);
    

    name.innerText = auto.name;
    description.innerText = auto.description;

    img.setAttribute('src', auto.imgSrc);
    img.setAttribute('class', 'img');

    name.setAttribute('class', 'name');
    description.setAttribute('class', 'description');
    price.setAttribute('class', 'price');
    soldCount.setAttribute('class', 'soldCount');
    item.setAttribute('class', 'item');

    item.appendChild(img);
    item.appendChild(name);
    item.appendChild(description);
    item.appendChild(price);
    item.appendChild(soldCount);
    list.appendChild(item);

    console.log(auto);
    
  }
  console.log(autos)
  var result = autos.filter(auto => auto.cost > 13000);
    console.log(result)
};*/
const filtrar = document.getElementById("rangeFilterCount");
const limpiar = document.getElementById("clearRangeFilter");
let costFilterMin = 0;
let costFilterMax = 9999999;


const lista = document.getElementById('products');
console.log(lista);

lista.setAttribute('class', "list");
// const autosFilter = "";
// const showList = autosFilter.filter(auto => auto.price > costFilterMin);

// const filterCost = array.filter(auto =>{
//   auto.price < costFilterMax && auto.price > costFilterMin;
// });
// console.log(filterCost)

function showList(array) {
  let lista = "";
  array.filter(auto => auto.cost >= costFilterMin && auto.cost < costFilterMax).map(auto => {
    lista += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + auto.imgSrc + `" alt="` + auto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ auto.name + `</h4>
                            <small class="text-muted">` + auto.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + auto.description + `</p>
                        <br>
                        <p class="text-muted-cost">` + auto.cost + " " + auto.currency + `</p>
                    </div>
                </div>
            </a>`
    console.log(auto);
  });
  document.getElementById('products').innerHTML = lista;
};

document.addEventListener("DOMContentLoaded", async function (e) {
  const autos = (await getJSONData(PRODUCTS_URL)).data;
  showList(autos);

  filtrar.addEventListener("click", function (event) {
    costFilterMin = document.getElementById("rangeFilterCountMin").value;
    costFilterMax = document.getElementById("rangeFilterCountMax").value;
    console.log(costFilterMin);
    console.log(costFilterMax);

    showList(autos);
  });

  limpiar.addEventListener("click", function(event){
    costFilterMin = 0
    costFilterMax = 9999999
    showList(autos);
  });
});

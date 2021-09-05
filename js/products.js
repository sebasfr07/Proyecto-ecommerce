//para el sort
const ORDER_ASC_BY_COST = "Precio ↑";
const ORDER_DESC_BY_COST = "Precio ↓";
const ORDER_BY_PROD_SOLD = "Relev.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;

//para el filter
const filtrar = document.getElementById("rangeFilterCount");
const limpiar = document.getElementById("clearRangeFilter");
let costFilterMin = 0;
let costFilterMax = 9999999;

//funcion del sort
function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) { return -1; }
      if (a.cost > b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) { return -1; }
      if (a.cost < b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_SOLD) {
    result = array.sort(function (a, b) {
      if (a.soldCount > b.soldCount) { return -1; }
      if (a.soldCount < b.soldCount) { return 1; }
      return 0;
    });
  }

  return result;
}

//Muestra la lista con el filtro
function showList() {
  let lista = "";
  currentCategoriesArray.filter(auto => auto.cost >= costFilterMin && auto.cost <= costFilterMax).forEach(auto => {
    lista += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="${auto.imgSrc}" alt="${auto.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${auto.name}</h4>
                            <small class="text-muted">${auto.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${auto.description}</p>
                        <br>
                        <p class="text-muted-cost">${auto.cost} ${auto.currency}</p>
                    </div>
                </div>
            </a>`
    console.log(auto);
  });
  document.getElementById('products').innerHTML = lista;
};

//Muestra la lista ordenada
function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

  showList();
}


document.addEventListener("DOMContentLoaded", async function () {
  
  //Muestra los productos por default
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
      sortAndShowCategories(ORDER_ASC_BY_COST, resultObj.data);
  });

  //Criterios de ordenamiento
  document.getElementById("priceAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_COST);
  });

  document.getElementById("priceDesc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_PROD_SOLD);
  });

  //Filtra la lista
  filtrar.addEventListener("click", function () {
    if (document.getElementById("rangeFilterCountMax").value == "") {
      costFilterMax = 9999999;
      costFilterMin = document.getElementById("rangeFilterCountMin").value;
    } else {
      costFilterMin = document.getElementById("rangeFilterCountMin").value;
      costFilterMax = document.getElementById("rangeFilterCountMax").value;
    }
    console.log(costFilterMin);
    console.log(costFilterMax);
    showList();
  });

  //Limpia el filtro
  limpiar.addEventListener("click", function () {
    costFilterMin = 0;
    costFilterMax = 9999999;
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    showList();
  });
});






















//FORMA ANTIGUA
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
///////////////////////////////////////////////////////


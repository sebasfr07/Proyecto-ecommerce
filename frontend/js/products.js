let searchWord = "";

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
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_SOLD) {
    result = array.sort(function (a, b) {
      if (a.soldCount > b.soldCount) {
        return -1;
      }
      if (a.soldCount < b.soldCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

//Muestra la lista con el filtro
function showList() {
  let lista = "";
  currentCategoriesArray
    .filter((auto) => auto.cost >= costFilterMin && auto.cost <= costFilterMax)
    .forEach((auto) => {
      lista += `
            
              <div class="col-md-6">
              <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="card mb-4 shadow-sm">
                <img src="${auto.imgSrc}" alt="${auto.description}" class="img-thumbnail">
                    <div class="card-body">
                    <p class="h1">${auto.name}</p>
                    <p class="card-text">${auto.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="h4">${auto.cost}${auto.currency}</p>
                  <small class="text-muted">Unidades vendidas ${auto.soldCount}</small>
                </div>
              </div>
            </div>
            </a>
          </div>
        `;
      console.log(auto);
    });
  document.getElementById("products").innerHTML = lista;
}

//Muestra la lista ordenada
function sortAndShowProducts(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortProducts(
    currentSortCriteria,
    currentCategoriesArray
  );

  showList();
}

document.getElementById("buscador").addEventListener("keyup", function (e) {
  getJSONData(`${PRODUCTS_URL}?name=${document.getElementById("buscador").value}`).then(function (
    resultObj
  ) {
    sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  //Muestra los productos por default
  getJSONData(`${PRODUCTS_URL}`).then(function (resultObj) {
    sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
  });

  //Criterios de ordenamiento
  document.getElementById("priceAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
  });

  document.getElementById("priceDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_SOLD);
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

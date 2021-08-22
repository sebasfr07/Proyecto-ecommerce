const showList = (autos) => {
  const list = document.getElementById('products');
  console.log(list);

  list.setAttribute('class', "list");

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
  document.getElementById('products').appendChild(list)
  document.body.appendChild(list); // Se muestra en pantalla la lista total
};

document.addEventListener("DOMContentLoaded", async function (e) {
  const autos = (await getJSONData(PRODUCTS_URL)).data;
  showList(autos);
});

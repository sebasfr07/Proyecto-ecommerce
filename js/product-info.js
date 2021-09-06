



function showProduct(product) {
    let producto = "";
    //JSON.parse(array);
    for (let info of Object.keys(product)) {
        
        var inform = product[info]
        console.log(info, inform);

        producto += `
            <p>${inform}</p>
        `
    }

    document.getElementById("infoProductoDiv").innerHTML = producto;
}

//JSON.parse()

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
    const product = (await getJSONData(PRODUCT_INFO_URL)).data;
    let stringProduct = JSON.stringify(product);
    const arrayProduct = JSON.parse(stringProduct);
    //console.log(JSON.stringify(array));
    console.log(product);
    console.log(arrayProduct);
    showProduct(arrayProduct);

});
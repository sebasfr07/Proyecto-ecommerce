
const showImages = (product) => {
    let imagenes = ""
    for (let images of product.images) {
        imagenes += `
            <img src="${images}" class="imagenesAuto"></img>
        `
    };
    document.getElementById("infoProductoDiv").innerHTML = imagenes;
};


const showProductInfo = (product) => {
    let infoProductos = "";
    console.log(product);
    showImages(product);

    for (const [key, value] of Object.keys(product)) {
        console.log(value);
        infoProductos += `
            <p>${value}</p>
        `
    }
    document.getElementById("nameProduct").innerHTML = infoProductos;
}

//https://dev.to/duxtech/5-maneras-de-iterar-un-objeto-en-javascript-jkn

// function showProduct(product) {
//     let producto = "";
//     //JSON.parse(array);
//     //console.log(product.images)



//     for (let info of Object.keys(product)) {

//         var inform = product[info]
//         //console.log(inform);

//         producto += `
            
//         `
//     }

//     document.getElementById("infoProductoDiv").innerHTML = producto;
// }



//JSON.parse()

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
    const product = (await getJSONData(PRODUCT_INFO_URL)).data;
    //let stringProduct = JSON.stringify(product);
    //const arrayProduct = JSON.parse(stringProduct);
    //console.log(JSON.stringify(array));
    //console.log(arrayProduct);
    //showProduct(arrayProduct);
    //showImages(product);
    showProductInfo(product);
});
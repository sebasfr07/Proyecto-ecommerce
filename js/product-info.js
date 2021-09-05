




function showProduct(array) {
    let producto = "";
    array.forEach(info => {
        producto = + `
            <p>${info.name}</p>
        `
        console.log(producto)
    });

    document.getElementById("infoProductoDiv").innerHTML = producto;
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function () {
    const array = (await getJSONData(PRODUCTS_URL)).data;
    showProduct(array);
});
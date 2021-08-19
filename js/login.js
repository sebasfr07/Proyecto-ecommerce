const formLogin = document.getElementById("login");

formLogin.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

    sessionStorage.setItem("cargado", "cargado");
    window.location.replace("index.html");
	
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});
const formProfile = document.getElementById("profileForm");

function updateInfo(pNames, pSurnames, pAge, pEmail, pPhone) {
  var newInfo = {
    names: pNames,
    surnames: pSurnames,
    age: pAge,
    email: pEmail,
    phone: pPhone,
  };
  localStorage.setItem("datos", JSON.stringify(newInfo));
}

function saveInfo() {
  let sNames = document.querySelector("#names").value;
  let sSurnames = document.querySelector("#surnames").value;
  let sEmail = document.querySelector("#email").value;
  let sPhone = document.querySelector("#phone").value;
  let sAge = document.querySelector("#age").value;
  console.log(sNames, sSurnames, sEmail, sPhone);
  updateInfo(sNames, sSurnames, sAge, sEmail, sPhone);
}

function printInfo() {
    var datos = localStorage.getItem("datos");

    let txtNames = document.querySelector('#txtNames');
    let txtSurnames = document.querySelector('#txtSurnames');
    let txtAge = document.querySelector('#txtAge');
    let txtEmail = document.querySelector('#txtEmail');
    let txtPhone = document.querySelector('#txtPhone');
    let vacio = "";

    const info = JSON.parse(datos);
    console.log(info.names);
    (info.names !== '') ? txtNames.innerHTML = info.names : null;
    (info.surnames !== '') ? txtSurnames.innerHTML = info.surnames : null;
    (info.email !== '') ? txtEmail.innerHTML = info.email : null;
    (info.Phone !== '') ? txtPhone.innerHTML = info.phone : null;
    (info.age !== '') ? txtAge.innerHTML = info.age : null;
}

formProfile.addEventListener("submit", function (e) {
  e.preventDefault();
  saveInfo();
  printInfo()
  formProfile.reset();
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    printInfo();
});

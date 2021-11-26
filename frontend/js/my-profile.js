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
  updateInfo(sNames, sSurnames, sAge, sEmail, sPhone);
}

function printInfo() {
    var datos = localStorage.getItem("datos");

    let txtNames = document.querySelector('#txtNames');
    let txtSurnames = document.querySelector('#txtSurnames');
    let txtAge = document.querySelector('#txtAge');
    let txtEmail = document.querySelector('#txtEmail');
    let txtPhone = document.querySelector('#txtPhone');

    const info = JSON.parse(datos);
    (info.names !== '') ? txtNames.innerHTML = info.names : null;
    (info.surnames !== '') ? txtSurnames.innerHTML = info.surnames : null;
    (info.email !== '') ? txtEmail.innerHTML = info.email : null;
    (info.phone !== '') ? txtPhone.innerHTML = info.phone : null;
    (info.age !== '') ? txtAge.innerHTML = info.age : null;
};

function saveOldInfo(){
    let pullNames = document.querySelector('#txtNames').innerHTML;
    let pullSurnames = document.querySelector('#txtSurnames').innerHTML;
    let pullAge = document.querySelector('#txtAge').innerHTML;
    let pullEmail = document.querySelector('#txtEmail').innerHTML;
    let pullPhone = document.querySelector('#txtPhone').innerHTML;

    var oldInfo = {
      oNames: pullNames,
      oSurnames: pullSurnames,
      oAge: pullAge,
      oEmail: pullEmail,
      oPhone: pullPhone,
    };
    localStorage.setItem("viejosDatos", JSON.stringify(oldInfo));
};

function printOldInfo(){
  var oldDatos = localStorage.getItem("viejosDatos");

    let txtNames = document.querySelector('#txtNames');
    let txtSurnames = document.querySelector('#txtSurnames');
    let txtAge = document.querySelector('#txtAge');
    let txtEmail = document.querySelector('#txtEmail');
    let txtPhone = document.querySelector('#txtPhone');

    const oldInfo = JSON.parse(oldDatos);
    txtNames.innerHTML = oldInfo.oNames;
    txtSurnames.innerHTML = oldInfo.oSurnames;
    txtEmail.innerHTML = oldInfo.oEmail;
    txtPhone.innerHTML = oldInfo.oPhone;
    txtAge.innerHTML = oldInfo.oAge;
};

// Cambiar la imagen del usuario///////////////////////////////////////////

function changeUserImage(){
  let userImage = document.getElementById('imageLink').value;
  localStorage.setItem('userImage', userImage);
  printUserImage();
}

function printUserImage(){
  let userImage = localStorage.getItem('userImage');
  console.log(userImage)
  
  document.getElementById("imgUser").innerHTML = `<img src="${userImage}" alt="" class="img-thumbnail" border="0">`
}

////////////////////////////////////////////////////////////////////////////

formProfile.addEventListener("submit", function (e) {
  e.preventDefault();
  saveInfo();
  printInfo();
  saveOldInfo();
  changeUserImage();
  console.log(localStorage.getItem("viejosDatos"))
  // printOldInfo();
  formProfile.reset();
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    printOldInfo();
    printUserImage();
});

const isActive = document.getElementsByClassName("is-active");
const razas = document.getElementById("razas");
const bntsearchRazas = document.getElementById("searchRazas");
const searchFiltros = document.getElementById("searchFiltros");
const menus = document.querySelectorAll(".tabs li");
const tabsSections = document.querySelectorAll(".tab-section");
const randomGatit = document.getElementById("random");
const btnRandomCat = document.getElementById("random-cat-btn");
const inputSearchRazas = document.getElementById("breed-search-input");
const btnInputSearchRazas = document.getElementById("breed-search-btn");
const resultSearch = document.querySelector("#breed-search-results")
const  selectDropdown = document.getElementById("breed-dropdown")
const description = document.querySelector("#breed-description")
const imgRaza = document.querySelector("#breed-img")
const tituloRaza = document.getElementById("breed-name")

const clearAllClass = () => {
  menus.forEach((element) => {
    element.classList.remove("is-active");
  });
};

menus.forEach((element) => {
  element.addEventListener("click", () => {
    clearAllClass();
    element.classList.add("is-active");
    let href = getHash(element.children[0].href);
    addClassHidden(href);
    document.getElementById(href).classList.remove("is-hidden");
  });
});

const addClassHidden = (href) => {
  tabsSections.forEach((element) => {
    if (element.id !== href) {
      element.classList.add("is-hidden");
    }
  });
};

const getHash = (text) => {
  return text.slice(text.indexOf("#") + 1);
};

const catImg = document.getElementById("cat-img");
const randomGatite = async () => {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search/`);
  const randomGatit = (await response.json())[0];
  catImg.src = randomGatit.url;
  catImg.width = randomGatit.width;
  catImg.height = randomGatit.height;
};

// const spinner = (seccion, estado)=>{
//  const spinner = seccion.querySelector('.cat-spinner');
//    if(estado === "ocultar") {
//     spinner.classList.remove('is-loading');
//     } else {
//     spinner.classList.add('is-loading');
//     }
// };


const searchRazas = async (name) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/breeds/search?q=${name}`
  );
  const getRaza = await response.json();
 
    // getRaza.forEach((raza)=>{
    // `<tr><td>${raza.name}</td></tr>`
    resultSearch.innerHTML = getRaza.reduce((html, raza)=> {
      return (html + `<tr><td>${raza.name}</td></tr>`)
    }, `  <tr>
    <th>Razas</th>

  </tr>`);
  
};


btnInputSearchRazas.addEventListener("click", (e) => {
  searchRazas(inputSearchRazas.value);
  
});
let descriptionRaza;
const seccionRazas = async () =>{
  const response = await fetch(`https://api.thecatapi.com/v1/breeds`
  );
   descriptionRaza = await response.json();
  

  selectDropdown.innerHTML = descriptionRaza.reduce((html, raza)=>{
    return (html + `<option value="${raza.id}">${raza.name}</option>`)
  },``);



  selectDropdown.addEventListener("change", (e) =>{
   changeInfo();
  })
  changeInfo();
  changeImg()
}

const changeInfo = async ()=>{
  const gatito = descriptionRaza.find(description => selectDropdown.value == description.id)
    description.innerHTML = `<p>${gatito.description}</p>`
    tituloRaza.innerHTML = `<h1>${gatito.id}</h1>`
    let imagen = await fetch (`https://api.thecatapi.com/v1/images/search?breed_id=${gatito.id}`)
    imagen = await imagen.json();
    imgRaza.src = imagen[0].url

  }
 
seccionRazas()
    
randomGatite();


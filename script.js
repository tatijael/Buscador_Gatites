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
const checkbox = document.querySelectorAll(".breed-filter")

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

const searchRazas = async (name) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/breeds/search?q=${name}`
  );
  const getRaza = await response.json();
    resultSearch.innerHTML = getRaza.reduce((html, raza)=> {
      return (html + `<tr><td>${raza.name}</td></tr>`)
    }, `<tr>
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
}

const changeInfo = async ()=>{
  const gatito = descriptionRaza.find(description => selectDropdown.value == description.id)
    description.innerHTML = `<p>${gatito.description}</p>`
    tituloRaza.innerHTML = `<h1>${gatito.id}</h1>`
    let imagen = await fetch (`https://api.thecatapi.com/v1/images/search?breed_id=${gatito.id}`)
    imagen = await imagen.json();
    imgRaza.src = imagen[0].url
}

// const checked = document.querySelectorAll("input[type=checkbox]:checked")

// primero voy a pedir las razs y luego las imagenes de cada raza
// 1 consulta para el listado y 72 consulta una por imagen
// 0.5 ms *1 + 72*0.5ms 41s
// primera carga donde guardo initBreedWithFilters
// necesito uuna variable global que guarde todo
// necesito una funcion que renderice las card para le paso un lista de razas
// armar algo para poder filtralos

const breedResults = document.getElementById("breed-results");
let breedsComplete;


const getInfo = async() =>{
  const response = await fetch(`https://api.thecatapi.com/v1/breeds`);
  const descriptionRaza = await response.json();

  const img =[];
  for(let description of descriptionRaza){
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${description.id}`);
    const data = await response.json();
    img.push(data[0].url)
    console.log("Hola")
  }

  breedsComplete = descriptionRaza.map((description,index)=>{
    return {...description ,url: img[index]}
  })
}
const createCards = (breeds) => {
 console.log(breeds)
 breedResults.innerHTML = breeds.reduce((html,breed)=>{
 return html+
 `
 <div class="column is-6">
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          src="${breed.url}"
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-5">${breed.name}</p>
    </div>
  </div>
</div>
`
},"")
}


const initBreedWithFilters = async() =>{
  await getInfo();

  createCards(breedsComplete);
}

const filters =[];

checkbox.forEach(check =>{
  check.addEventListener("click",event=>{
    const {value,checked} = event.target;

    if(checked){
      filters.push(value)
    }else{
      filters.splice(filters.indexOf(value),1);
    }

    const breedWithFilter = breedsComplete.filter(breed =>{
      return filters.every(filter => {
      
       return  breed[filter]
      })
    })

    createCards(breedWithFilter);

  })
})


seccionRazas();
randomGatite();
initBreedWithFilters();


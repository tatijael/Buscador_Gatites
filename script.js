const isActive = document.getElementsByClassName("is-active");
const razas = document.getElementById("razas");
const searchRazas = document.getElementById("searchRazas");
const searchFiltros = document.getElementById("searchFiltros");
const menus = document.querySelectorAll('.tabs li')
const tabsSections = document.querySelectorAll('.tab-section')

const clearAllClass = () => {
  menus.forEach(element => {
      element.classList.remove('is-active');
  });
};

menus.forEach(element =>{
    element.addEventListener("click",() => {
    // console.log(getHash(element.children[0].href))
    clearAllClass()
    element.classList.add('is-active')
    let href = getHash(element.children[0].href)
    addClassHidden(href)
    } );
});

const addClassHidden = (href) => {
    tabsSections.forEach(element => {
        // console.log('target del element', element.id)
      if(element.id !== href){
        element.classList.add('is-hidden')
      }
    })
}

const getHash = (text) => {    
   return text.slice(text.indexOf('#') + 1)
}




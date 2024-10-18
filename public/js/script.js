// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for(info of taxInfo){
      if(info.style.display != "inline"){
       info.style.display = "inline" ;
      }else{
        info.style.display = "none" ;
      }
    }
  });
   

  const searchInput = document.getElementById("search-input");
  const items = document.getElementsByClassName("card-link");
  const searchBtn = document.getElementById("search-btn")
 
  function filterList() { 
    const filter = searchInput.value.toLowerCase();
    
    // Loop through all the items and hide those that don't match the search
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const text = item.textContent || item.innerText;
        
        if (text.toLowerCase().indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }
};
searchBtn.addEventListener("click" , filterList);
searchInput.addEventListener("input" , filterList);


const slider = document.querySelector('.slider-items');
let scrollAmount = 0;
const scrollStep = 200; // Amount of pixels to scroll by

// Scroll to the right
function scrollRight() {
    slider.scrollBy({ 
        left: scrollStep, 
        behavior: 'smooth' 
    });
}

// Scroll to the left
function scrollLeft() {
    slider.scrollBy({ 
        left: -scrollStep, 
        behavior: 'smooth' 
    });
}

// badges
let tx = 0;
let container = document.getElementById("filters")


function slideforward () {
     if(tx > -30){
       tx -= 10;
     }
     container.style.transform = `translateX(${tx}%)`;
} 
function slidebackward () {
   if(tx < 0){
     tx += 10;
   }
    container.style.transform = `translateX(${tx}%)`;
} 
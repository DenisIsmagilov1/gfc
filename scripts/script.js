$('.header__toggle').on("click", function() {
  $('.header__toggle').toggleClass('active');
  $('.header__menu').toggleClass('active');
})

let openedPopup;

function showPopup(event) {
  event.preventDefault();
  event.stopPropagation();
  event.target.parentElement.classList.toggle("active")
  event.target.parentElement.lastElementChild.classList.toggle("show")
  openedPopup = event.target;
  window.addEventListener("click", listenClickPopup)
}

function listenClickPopup (event) {
  if (event.target != openedPopup) {
    window.removeEventListener("click", listenClickPopup)
    var dropdowns = document.getElementsByClassName("header__popup");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }	
  }
}
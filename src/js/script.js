function ibg(){
  let ibg=document.querySelectorAll(".ibg");
  for (var i = 0; i < ibg.length; i++) {
    const img = ibg[i].querySelector('img');
    if(img){
      ibg[i].style.backgroundImage = 'url('+img.getAttribute('src')+')';
    }
  }
}

ibg();

$('.header__toggle').on("click", function() {
  $('.header__toggle').toggleClass('active');
  $('.header__menu').toggleClass('active');
})

let openedPopup;

function showPopup(event) {
  // event.preventDefault();
  // event.stopPropagation();
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

let openedLang;

function showLang(event) {
  // event.preventDefault();
  // event.stopPropagation();
  event.target.parentElement.parentElement.parentElement.lastElementChild.classList.toggle("active")
  openedLang = event.target;
  window.addEventListener("click", listenClickLang)
}

function listenClickLang (event) {
  if (event.target != openedLang) {
    window.removeEventListener("click", listenClickLang)
    var dropdowns = document.getElementsByClassName("header__lang__options");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('active')) {
        openDropdown.classList.remove('active');
      }
    }	
  }
}

$('.tabs__tab').on('click', function() {
  const tab = this;
  const targetId = tab.getAttribute('target');
  const tabContent = $(`#tabs__tab-body-${targetId}`)[0];
  if (tabContent) {
    $('.tabs__tab-body').each(function() {
      this.classList.remove('active')
    });
    $('.tabs__tab').each(function() {
      this.classList.remove('active')
    });
    tab.classList.add('active');
    tabContent.classList.add('active');
  }
})
// below one is for the menu-bars icon changing and navbar display 
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');
menu.onclick = () =>{
    menu.classList.toggle('fa-times');   
    navbar.classList.toggle('active'); 
}

//  Q1 以下没看懂和下面的是呼应的，影响了navbar运行
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');


// below one is for the search page show or unshow when click search-icon 
document.querySelector('#search-icon').onclick = () =>{
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
    document.querySelector('#search-form').classList.remove('active');
}

//below one is for the swiper of home
var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
});

//below one is for the swiper of review
var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    
    loop: true,
    breakpoints:{
        0:{
            slidesPerView: 1,
        },
        640:{
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 2,
        },
        1024:{
            slidesPerView: 3,
        },
    },
});


//下面的js是为了实现loader功能，然后3000代表的延迟时间，这个是目前前段的结果，应该联网后，
// 可以调整为和网络质量同步
function loader(){
    document.querySelector('.loader-container').classList.add('fade-out')
}

function fadeOut(){
    setInterval(loader, 500);
}

window.onload = fadeOut;

//下面是实现前后端结合第一步，将login page链接向html

// const button = document.getElementById('login-button');
// button.addEventListener('click', function(e) {
  
// });
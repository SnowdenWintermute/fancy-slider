let slideTimer = 5000;
let slideContainer = document.getElementById('slide-container');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let txt1 = document.getElementById('txt1');
let txt2 = document.getElementById('txt2');
let txt3 = document.getElementById('txt3');
let icon1 = document.getElementById('icon1');
let icon2 = document.getElementById('icon2');
let icon3 = document.getElementById('icon3');
let slides = [img1, img2, img3];
let headers = [txt1, txt2, txt3];
let icons = [icon1, icon2, icon3];
let tabs = [];
let nextButton = document.getElementById('slider-btn-next');
let prevButton = document.getElementById('slider-btn-prev');
let currentSlideIndex = 2;
let nextSlideIndex = 0;
let prevSlideIndex = 1;

let nextTextIndex = 0;

//set initial slide and create slide tabs
window.onload = function(){
    changeSlides("forward");
    let myDF = document.createDocumentFragment();
    for(let i=1; i<slides.length+1; i++){
        let slideTab = document.createElement('div');
        slideTab.className = "slide-tab";
        slideTab.id = `slide-tab${i}`;
        tabs.push(slideTab);
        slideTab.addEventListener('click', function(){
            jumpToSlide(i-1);
        });
        tabs[0].className = "slide-tab slide-tab-active";
        console.log(tabs);
        myDF.appendChild(slideTab);
    }
    document.getElementById('slide-tab-holder').appendChild(myDF);
}

function jumpToSlide(index){
    clearInterval(moveSlides);
    slideOut(slides[currentSlideIndex]);
    textOut(headers[currentSlideIndex]);
    iconOut(icons[currentSlideIndex]);
    tabs[currentSlideIndex].className = "slide-tab slide-tab-active";
    currentSlideIndex = index;
    nextSlideIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
    prevSlideIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
    slideIn(slides[currentSlideIndex], false);
    textIn(headers[currentSlideIndex]);
    iconIn(icons[currentSlideIndex]);
}
function slideOut(slide){
    slide.className = "slide-img slide-fade";
    console.log("slide faded");
    setTimeout(function(){
    slides.forEach(function(s){
        if(s.className === "slide-img slide-fade"){
            s.className = "slide-img slide-offscreen-right";
            console.log("slide out");
            };
        });
    }, 1000);
    }
function slideIn(slide){
    slide.className = "slide-img slide-visible";
}

function textIn(txt){
    txt.className = "slide-item slide-text-visible";
}
function textOut(txt){
    txt.className = "slide-item slide-text-fade";
    setTimeout(function(){
    headers.forEach(function(h){
        if(h.className === "slide-item slide-text-fade"){
            h.className = "slide-item slide-text-hidden";
            };
        });
    }, 1000);
}
function iconIn(icon){
    icon.className = "slide-item slide-icon slide-icon-visible";
}
function iconOut(icon){
    icon.className = "slide-item slide-icon slide-icon-fade";
    setTimeout(function(){
    icons.forEach(function(i){
        if(i.className === "slide-item slide-icon slide-icon-fade"){
            i.className = "slide-item slide-icon slide-icon-hidden";
            };
        });
    }, 1000);
}
let moveSlides = setInterval(function(){
    changeSlides("forward");
}, slideTimer);

function changeSlides(direction){
    slideOut(slides[currentSlideIndex]);
    textOut(headers[currentSlideIndex]);
    iconOut(icons[currentSlideIndex]);
    
    if(direction === "forward"){
        slideIn(slides[nextSlideIndex]);
        textIn(headers[nextSlideIndex]);
        iconIn(icons[nextSlideIndex]);
        currentSlideIndex = nextSlideIndex;
        nextSlideIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
        prevSlideIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
    }
    if(direction === "back"){
        slideIn(slides[prevSlideIndex]);
        textIn(headers[prevSlideIndex]);
        iconIn(icons[prevSlideIndex]);
        currentSlideIndex = prevSlideIndex;
        nextSlideIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
        prevSlideIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
    }
    clearInterval(moveSlides);
    moveSlides = setInterval(function(){
        changeSlides("forward");
    }, slideTimer);
}

nextButton.addEventListener('click', function(){
    changeSlides("forward");
});
prevButton.addEventListener('click', function(){
    changeSlides("back");
});

//hover reveals buttons
slideContainer.onmouseenter = function(){
    nextButton.className = "slider-btn slider-btn-next";
    prevButton.className = "slider-btn slider-btn-prev";
}
slideContainer.onmouseleave = function(){
    nextButton.className = "slider-btn slider-btn-next btn-hidden";
    prevButton.className = "slider-btn slider-btn-prev btn-hidden";
}
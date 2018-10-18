let slideTimer = 5000;
let slideContainer = document.getElementById('slide-container');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let txt1 = document.getElementById('txt1');
let txt2 = document.getElementById('txt2');
let txt3 = document.getElementById('txt3');
let slides = [img1, img2, img3];
let headers = [txt1, txt2, txt3];
let nextButton = document.getElementById('slider-btn-next');
let prevButton = document.getElementById('slider-btn-prev');
let currentSlideIndex = 2;
let nextSlideIndex = 0;
let prevSlideIndex = 1;

let nextTextIndex = 0;

//set initial slide and create slide tabs
window.onload = function(){
    changeSlides("forward", false);
    let myDF = document.createDocumentFragment();
    for(let i=1; i<slides.length+1; i++){
        let slideTab = document.createElement('div');
        slideTab.className = "slide-tab";
        slideTab.id = `slide-tab${i}`;
        slideTab.addEventListener('click', function(){
            jumpToSlide(i-1);
        });
        myDF.appendChild(slideTab);
    }
    document.getElementById('slide-tab-holder').appendChild(myDF);
}

function jumpToSlide(index){
    clearInterval(moveSlides);
    slideOut(slides[currentSlideIndex], false);
    currentSlideIndex = index;
    slideIn(slides[currentSlideIndex], false);
    nextSlideIndex = index >= slides.length ? 0 : index + 1;
    prevSlideIndex = index < 0 ? 3 : index - 1;
}
function slideOut(slide, forced){
    if(forced){
        slide.className = "slide-img slide-offscreen-right no-transition" 
    } else {
    slide.className = "slide-img slide-fade";
    console.log("slide faded");
    setTimeout(function(){
    slides.forEach(function(s){
        if(s.className === "slide-img slide-fade"){
            s.className = "slide-img slide-offscreen-right";
            console.log("slide out");
            };
        });
    }, 3000);
    }
}
function slideIn(slide, forced){
    slide.className = "slide-img slide-visible";
    if(forced){ slide.className = "slide-img slide-visible no-transition" }
    console.log("slided in");
}

function textIn(txt){
    txt.className = "slide-text slide-text-visible";
}
function textOut(txt){
    txt.className = "slide-text slide-text-fade";
    setTimeout(function(){
    txt.className = "slide-text slide-text-offscreen-right";
    }, 3000);
}
let moveSlides = setInterval(function(){
    changeSlides("forward");
}, slideTimer);

function changeSlides(direction, forced){
    slideOut(slides[currentSlideIndex], forced);
    if(direction === "forward"){
        slideIn(slides[nextSlideIndex], forced);
        currentSlideIndex = nextSlideIndex;
        nextSlideIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
        prevSlideIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
    }
    if(direction === "back"){
        slideIn(slides[prevSlideIndex], forced);
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
    changeSlides("forward", false);
});
prevButton.addEventListener('click', function(){
    changeSlides("back", false);
});

//hover reveals buttons
slideContainer.onmouseenter = function(){
    
}
slideContainer.onmouseleave = function(){

}
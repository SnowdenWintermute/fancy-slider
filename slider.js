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
        tabs[0].className = "slide-tab";
        myDF.appendChild(slideTab);
    }
    tabs[0].className = "slide-tab slide-tab-active"
    document.getElementById('slide-tab-holder').appendChild(myDF);
}

//start rolling the slides
let moveSlides = setInterval(function(){
    changeSlides("forward");
}, slideTimer);

//move elemens of the slides in or out by giving certain classes
function moveItemOut(item, itemArray, fadeClass, hiddenClass, timeout){
    item.className = fadeClass;
    setTimeout(function(){
    itemArray.forEach(function(i){
        if(i.className === fadeClass){
            i.className = hiddenClass;
            };
        });
    }, timeout);
    }
function moveItemIn(item, inClass){
    item.className = inClass;
}

//change the slides forward or back
function changeSlides(direction){
    moveItemOut(slides[currentSlideIndex], slides, "slide-img slide-fade", "slide-img slide-offscreen-right", 1000);
    moveItemOut(headers[currentSlideIndex], headers, "slide-item slide-text-fade", "slide-item slide-text-hidden", 1000);
    moveItemOut(icons[currentSlideIndex], icons, "slide-item slide-icon slide-icon-fade", "slide-item slide-icon slide-icon-hidden", 1000);
    
    if(direction === "forward"){
        moveItemIn(slides[nextSlideIndex], "slide-img slide-visible");
        moveItemIn(headers[nextSlideIndex], "slide-item slide-text-visible");
        moveItemIn(icons[nextSlideIndex], "slide-item slide-icon slide-icon-visible");
        currentSlideIndex = nextSlideIndex;
        nextSlideIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
        prevSlideIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
    }
    if(direction === "back"){
        moveItemIn(slides[prevSlideIndex], "slide-img slide-visible");
        moveItemIn(headers[prevSlideIndex], "slide-item slide-text-visible");
        moveItemIn(icons[prevSlideIndex], "slide-item slide-icon slide-icon-visible");
        currentSlideIndex = prevSlideIndex;
        nextSlideIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
        prevSlideIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
    }
    tabs.forEach(function(tab){
        tab.className = "slide-tab";
    });
    if(tabs[0]){ tabs[currentSlideIndex].className = "slide-tab slide-tab-active";}
    clearInterval(moveSlides);
    moveSlides = setInterval(function(){
        changeSlides("forward");
    }, slideTimer);
}

//jump to a specific slide (used for bottom tabs)
function jumpToSlide(index){
    clearInterval(moveSlides);
    moveItemOut(slides[currentSlideIndex], slides, "slide-img slide-fade", "slide-img slide-offscreen-right", 1000);
    moveItemOut(headers[currentSlideIndex], headers, "slide-item slide-text-fade", "slide-item slide-text-hidden", 1000);
    moveItemOut(icons[currentSlideIndex], icons, "slide-item slide-icon slide-icon-fade", "slide-item slide-icon slide-icon-hidden", 1000);
    tabs.forEach(function(tab){
        tab.className = "slide-tab";
    });
    tabs[index].className = "slide-tab slide-tab-active";
    currentSlideIndex = index;
    nextSlideIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
    prevSlideIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
    moveItemIn(slides[currentSlideIndex], "slide-img slide-visible");
    moveItemIn(headers[currentSlideIndex], "slide-item slide-text-visible");
    moveItemIn(icons[currentSlideIndex], "slide-item slide-icon slide-icon-visible");
}

//events for next and prev buttons
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

//detect swipes (requires touchevents.js)
swipedetect(slideContainer, function (direction){
    if(direction === "right") {changeSlides("forward")};
    if(direction === "left") {changeSlides("back")};
});
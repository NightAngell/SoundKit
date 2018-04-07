window.addEventListener("DOMContentLoaded", ()=>{
    let mobileViewport = window.matchMedia("screen and (max-width: 991px)");
    let firstButons = document.querySelectorAll(".btn-custom-primary");
    mobileViewport.addListener((mq)=>{
        if(mq.matches)
        {   
            firstButons.forEach(function(element) {
                element.classList.remove("col");
                element.classList.add("btn-block");
            }, this);
        }
        else
        {
            firstButons.forEach(function(element) {
                element.classList.add("col");
                element.classList.remove("btn-block");
            }, this);
        }
    });
});
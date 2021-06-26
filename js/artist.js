gsap.registerPlugin(ScrollTrigger);

init();

function init(){
    gsap.to('.round1', {
        duration: 0,
        x: 500,
    });
    gsap.to('.round2', {
        duration: 0,
        x: 300,
    });
    gsap.to('.round4', {
        duration: 0,
        x: -300,
    });
    gsap.to('.round5', {
        duration: 0,
        x: -500,
    });
    gsap.to('.intro1 .intro-round', {
        duration: 0,
        x: -500,
    });
    gsap.to('.intro2 .intro-round', {
        duration: 0,
        x: 500,
    });
    gsap.to('.intro3 .intro-round', {
        duration: 0,
        x: -500,
    });
    gsap.to('.intro1 .intro-info', {
        duration: 0,
        opacity: 0
    });
    gsap.to('.intro2 .intro-info', {
        duration: 0,
        opacity: 0
    });
    gsap.to('.intro3 .intro-info', {
        duration: 0,
        opacity: 0
    });
}

gsap.to('.round1', {
    duration: 1,
    x: 0,
});
gsap.to('.round2', {
    duration: 1,
    x: 0,
});
gsap.to('.round4', {
    duration: 1,
    x: 0,
});
gsap.to('.round5', {
    duration: 1,
    x: 0,
});
/* scrollTrigger */
gsap.to('.intro1 .intro-round', {
    duration: 1,
    x: 0,
    scrollTrigger: '.intro1 .intro-round'
});
gsap.to('.intro2 .intro-round', {
    duration: 1,
    x: 0,
    scrollTrigger: '.intro2 .intro-round'
});
gsap.to('.intro3 .intro-round', {
    duration: 1,
    x: 0,
    scrollTrigger: '.intro3 .intro-round'
});
gsap.to('.intro1 .intro-info', {
    duration: 2,
    opacity: 1,
    scrollTrigger: '.intro1 .intro-round'
});
gsap.to('.intro2 .intro-info', {
    duration: 2,
    opacity: 1,
    scrollTrigger: '.intro2 .intro-round'
});
gsap.to('.intro3 .intro-info', {
    duration: 2,
    opacity: 1,
    scrollTrigger: '.intro3 .intro-round'
});
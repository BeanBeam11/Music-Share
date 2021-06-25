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

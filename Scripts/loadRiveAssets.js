
const handleLoadingComplete = () => {
    setTimeout(() => {
        loadingScreen.stateMachineInputs('Loading State').find(i => i.name === 'Loading Complete').fire();
        setTimeout(() => {
            document.getElementById("loading-container").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("loading-container").remove();
            }, 500);
        }, 2500);       
    }, 100);
};

let loadingScreenLoaded = false
const loadingScreen = new rive.Rive({
    src: "./Assets/Rive/MHz.riv", 
    canvas: document.getElementById("loading-animation"),
    autoplay: true,
    stateMachines: "Loading State",
    fit: rive.Fit.cover,
    onload: () => {
        handleLoadingComplete()
    }
});
let layout = new rive.Layout({
    fit: rive.Fit.Fill
});
const backgroundScreen = new rive.Rive({
    src: "./Assets/Rive/sineBG.riv", 
    canvas: document.getElementById("home-background"),
    autoplay: true,
    stateMachines: "State Machine 1",
    layout: layout
});

const hardwareSim = new rive.Rive({
    src: "./Playgrounds/computer.riv", 
    canvas: document.getElementById("hardware-model"),
    autoplay: true,
    stateMachines: "Website Sequence",
    fit: rive.Fit.cover
});






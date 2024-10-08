const loadingScreen = new rive.Rive({
    src: "./Assets/Rive/MHz.riv", // URL to the .riv file
    canvas: document.getElementById("loading-animation"),
    autoplay: true,
    stateMachines: "State Machine 1",
    fit: rive.Fit.cover,
    onLoad: () => {
        setTimeout(() => {
            handleLoadingComplete();
        }, 500);
    }
});
let layout = new rive.Layout({
    fit: rive.Fit.Fill, // Choose your desired fit option
});
const backgroundScreen = new rive.Rive({
    src: "./Assets/Rive/sineBG.riv", // URL to the .riv file
    canvas: document.getElementById("home-background"),
    autoplay: true,
    stateMachines: "State Machine 1",
    layout: layout
});

const handleLoadingComplete = () => {
    loadingScreen.stateMachineInputs('State Machine 1').find(i => i.name === 'Loading Complete').fire();
    setTimeout(() => {
        document.getElementById("loading-container").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loading-container").remove();
        }, 500);
    }, 2500);
};


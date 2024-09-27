const r = new rive.Rive({
    src: "Rive assets/MHz.riv", // URL to the .riv file
    canvas: document.getElementById("canvas"),
    autoplay: true,
    stateMachines: "State Machine 1",
    fit: rive.Fit.cover,
  });
setTimeout(() => {
    r.stateMachineInputs('State Machine 1').find(i => i.name === 'Loading Complete').fire()
}, 500);

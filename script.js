let r = new rive.Rive({
    src: "MHz.riv", // URL to the .riv file
    canvas: document.getElementById("canvas"),
    autoplay: true,
    stateMachines: "State Machine 1" // Replace with your desired state machine name
  });

document.getElementById("canvas").addEventListener("click", () => {
    r.stateMachineInputs('State Machine 1').find(i => i.name === 'Loading Complete').fire()
})

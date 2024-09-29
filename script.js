const loadingScreen = new rive.Rive({
    src: "Rive assets/MHz.riv", // URL to the .riv file
    canvas: document.getElementById("loading-animation"),
    autoplay: true,
    stateMachines: "State Machine 1",
    fit: rive.Fit.cover,
    onLoad: () => {
        setTimeout(() => {
            handleLoadingComplete()
        }, 500);
    }
});

let layout = new rive.Layout({
    fit: rive.Fit.Fill, // Choose your desired fit option
});

const backgroundScreen = new rive.Rive({
    src: "Rive assets/sineBG.riv", // URL to the .riv file
    canvas: document.getElementById("home-background"),
    autoplay: true,
    stateMachines: "State Machine 1",
    layout: layout
});
let MHZData
fetch("mhzdata.json").then(response => response.json()).then((data) => {
    MHZData = data
})


const handleLoadingComplete = () => {
    loadingScreen.stateMachineInputs('State Machine 1').find(i => i.name === 'Loading Complete').fire()
    setTimeout(() => {
            document.getElementById("loading-container").style.opacity = "0"
            setTimeout(() => {
                document.getElementById("loading-container").remove()
            }, 500);
    }, 2500);
}


let clickedSubject
const selectSubject = (subject) => {
    const subjectHTMLID = subject.toLowerCase().replace(" ", "-")
    const buttonContainer = document.getElementById("home-button-container")
    const hardwareButton = document.getElementById("hardware-button")
    const behavioralAIButton = document.getElementById("behavioral-ai-button")
    const networkButton = document.getElementById("network-button")
    const subjectButton = document.getElementById(subjectHTMLID + "-button")
    const subjectSelectionBox = document.getElementById("subject-selection-box")
    const subjectTitleBox = document.getElementById("subject-selection-title")
    const subjectDescriptionBox = document.getElementById("subject-selection-description")


    hardwareButton.style.boxShadow = "none"
    behavioralAIButton.style.boxShadow = "none"
    networkButton.style.boxShadow = "none"

    buttonContainer.style.height = "70%"
    subjectButton.style.boxShadow = "white 0px 0px 50px"
    subjectSelectionBox.style.backgroundColor = `var(--${subjectHTMLID}-bg)`
    subjectSelectionBox.style.border = `var(--${subjectHTMLID}-border) solid 10px`
    subjectTitleBox.textContent = subject
    subjectDescriptionBox.textContent = MHZData[subject]["description"]

    if (clickedSubject === subject) {
        viewSubjectContent(subject)
        console.log("viewing " + subject)
        return
    }
    clickedSubject = subject
}

const viewSubjectContent = (subject) => {
    const subjectHTMLID = subject.toLowerCase().replace(" ","-")
    const backButton = document.getElementById("subject-selection-back")
    const contentViewBox = document.getElementById("content-view-box")
    document.getElementById("home-container").style.transform = "translateY(-65%)"
    document.getElementById("subject-selection-title").style.width = "60%"
    document.getElementById("subject-selection-description").style.width = "0%"
    backButton.style.opacity = "1"
    backButton.style.width = "10%"
    backButton.style.height = "40%"
    backButton.style.border = `var(--${subjectHTMLID}-border) solid 5px`
    backButton.style.backgroundColor = `var(--${subjectHTMLID}-bg)`
    contentViewBox.style.border = `var(--${subjectHTMLID}-border) solid 10px`
    contentViewBox.style.backgroundColor = `var(--${subjectHTMLID}-bg)`
}

const goBack = () => {
    const backButton = document.getElementById("subject-selection-back")
    document.getElementById("home-container").style.transform = "translateY(0)"
    document.getElementById("subject-selection-title").style.width = "30%"
    document.getElementById("subject-selection-description").style.width = "70%"
    setTimeout(() => {
        backButton.style.opacity = "0"
    }, 500)
    backButton.style.width = "0"
    backButton.style.height = "0"
}
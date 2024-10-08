let MHZData;
fetch("Data/mhzdata.json").then(response => response.json()).then((data) => {
    MHZData = data;
});

let clickedSubject
const selectSubject = (subject) => {
    const subjectHTMLID = subject.toLowerCase().replace(" ", "-")
    const hardwareButton = document.getElementById("hardware-button")
    const behavioralAIButton = document.getElementById("behavioral-ai-button")
    const networkButton = document.getElementById("network-button")
    const selectedSubjectButton = document.getElementById(subjectHTMLID + "-button")
    const subjectSelectionBox = document.getElementById("subject-selection-box")
    const subjectTitleBox = document.getElementById("subject-selection-title")
    const subjectDescriptionBox = document.getElementById("subject-selection-description")

    // Reset all 3 button's glow
    hardwareButton.style.boxShadow = "none"
    behavioralAIButton.style.boxShadow = "none"
    networkButton.style.boxShadow = "none"

    // Glow the selected subject's button
    selectedSubjectButton.style.boxShadow = "white 0px 0px 50px"

    // Change the selection box's colors according to selected subject
    subjectSelectionBox.style.backgroundColor = `var(--${subjectHTMLID}-bg)`
    subjectSelectionBox.style.border = `var(--${subjectHTMLID}-border) solid 10px`

    // Change layout
    subjectTitleBox.style.width = "35%"
    subjectDescriptionBox.style.width = "65%"

    // Change text contents
    subjectTitleBox.textContent = subject
    subjectDescriptionBox.textContent = MHZData[subject]["description"]

    if (clickedSubject === subject) {
        viewSubjectContent(subject)
        return
    }
    clickedSubject = subject
}

const viewSubjectContent = (subject) => {
    alert("Quick start functions isn't available yet.")
}

const renderScreen = (screenName) => {
    const mainScreen = document.getElementById("main-screen")
    const screenOrder = ["Quick Start", "About Us", "Lessons", "Glossary", "My Statistics"]
    mainScreen.style.transform = `translateX(-${screenOrder.indexOf(screenName) * 10}%)`
}

const showfile = (source) => {
    const fileViewer = document.getElementById("about-us-file-viewer") 
    const fileElement = document.getElementById("about-us-file")
    fileViewer.style.transform = "translateY(0%)"
    fileElement.setAttribute("src", "")
    fileElement.setAttribute("src",source)
}

const closefile = () => {
    const fileViewer = document.getElementById("about-us-file-viewer") 
    fileViewer.style.transform = "translateY(110%)"
}
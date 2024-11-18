let Data;
fetch("Data/data.json").then(response => response.json()).then((data) => {Data = data;});
let keyWordsData
fetch("Data/keyWords.json").then(response => response.json()).then((data) => {
    keyWordsData = data["Key words"].sort((a,b) => a["Terms"] < b["Terms"] ? -1 : 1)
    updateGlossary()
})

const updateGlossary = () => {
    keyWordsData.forEach(word => {
        document.getElementById("glossary-container").insertAdjacentHTML("beforeend",`
            <div class="glossary-word-container">
            <p class="glossary-word">${word['Terms']}</p>
            <p class="glossary-definition">${word['Definitions']}</p>
          </div>
            `)
    })
}
const renderScreen = (screenName) => {
    alert("Cooking still in progress :D")
    return
    const mainScreen = document.getElementById("main-screen")
    const screenOrder = ["Playground", "Materials", "Tests", "Dictionary", "About Us"]
    mainScreen.style.transform = `translateX(-${screenOrder.indexOf(screenName) * 10}%)`
}

const showfile = (source) => {
    const fileViewer = document.getElementById("about-us-file-viewer") 
    const fileElement = document.getElementById("about-us-file")
    fileViewer.style.transform = "translateY(0%)"
    fileElement.setAttribute("src",source)
}

const closefile = () => {
    const fileViewer = document.getElementById("about-us-file-viewer") 
    fileViewer.style.transform = "translateY(110%)"
}

let selectedPart
const showPart = (chosenButtonID) => {
    selectedPart = chosenButtonID
    const chosenButton = document.getElementById(chosenButtonID)

    document.getElementById("part-selector-buttons-container").style.justifyContent = "center"
    // Zoom the chosen part button
    chosenButton.style.scale = "1.5"

    // Disable the color changing thingy when button is hovered
    chosenButton.classList.add("no-hover")

    // The .filter() method return an array that satisfies id != chosenButtonID => baiscally filters out the chosen button id from the array
    let removedPartsList = ["part-A","part-B","part-C","part-D"].filter(id => id != chosenButtonID)

    // Shink every buttons that arent chosen
    removedPartsList.forEach(id => {
        const button = document.getElementById(id)
        button.classList.add("shrunk-part")
    })
    document.querySelector(".part-selector-title-container").classList.add("shrunk-part")
    
    setTimeout(() => {
        document.getElementById("part-selector-buttons-container").style.transform = "skewY(-2deg)"
        document.getElementById("part-selector-container").id = "lesson-selector-container"
        document.querySelector(".part-viewer-container").classList.remove("hidden-part-container")
        document.getElementById("part-close-button-hidden").id = "part-close-button"
    }, 1000);
}

const closePart = () => {
    const chosenButton = document.getElementById(selectedPart)

    let removedPartsList = ["part-A","part-B","part-C","part-D"].filter(id => id != selectedPart)

    document.getElementById("lesson-selector-container").id = "part-selector-container"
    document.querySelector(".part-viewer-container").classList.add("hidden-part-container")
    document.getElementById("part-close-button").id = "part-close-button-hidden"
    
    removedPartsList.forEach(id => {
    const button = document.getElementById(id)
    button.classList.remove("shrunk-part")
    })
    chosenButton.classList.remove("no-hover")
    document.querySelector(".part-selector-title-container").classList.remove("shrunk-part")
    document.getElementById("part-selector-buttons-container").style.justifyContent = "space-evenly"
    document.getElementById("part-selector-buttons-container").style.transform = "skew(0deg)"
    chosenButton.style.scale = "1"
}

const showLesson = (lessonType) => {
    if (!Data[selectedPart][lessonType]) {
        alert("We haven't done this part yet :(")
        return
    }
    
    const fileViewer = document.getElementById("lessons-file-viewer") 
    const fileElement = document.getElementById("lessons-file")
    if (lessonType === "Study Guide") {
        renderScreen("Study Guide")
        document.getElementById("study-guide").setAttribute("src","")
        setTimeout(() => {
            document.getElementById("study-guide").setAttribute("src",Data[selectedPart][lessonType]) 
        }, 1000);
        return
    }
    fileViewer.style.transform = "translateY(0%)"
    fileElement.setAttribute("src",Data[selectedPart][lessonType])
}

const closelessonsfile = () => {
    const fileViewer = document.getElementById("lessons-file-viewer") 
    fileViewer.style.transform = "translateY(110%)"
}
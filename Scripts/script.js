let keyWordsData
fetch("Data/keyWords.json").then(response => response.json()).then((data) => {
    keyWordsData = data["Key words"].sort((a,b) => a["Terms"] < b["Terms"] ? -1 : 1)
    updateGlossary(keyWordsData)
})

let testData
let numberOfQuestions
fetch("Data/tests.json").then(response => response.json()).then((data) => {
    testData = data;
    numberOfQuestions = testData["Multiple Choice"].length + testData["True False"].length
    updateQuestionCounter()
})

let tableOfContent 
fetch("Data/tableOfContent.json").then(response => response.json()).then((data) => {
    tableOfContent= data;
})

const updateGlossary = (data) => {
    document.getElementById("dictionary-content-container").innerHTML = ""
    data = data.sort((a,b) => a["Terms"] < b["Terms"] ? -1 : 1)
    document.getElementById("dictionary-content-container").insertAdjacentHTML("beforeend",`
        <div class="scroll-support dictionary-word-container"><div>
        <div class="scroll-support dictionary-word-container"><div>
    `)
    data.forEach(word => {
        document.getElementById("dictionary-content-container").insertAdjacentHTML("beforeend",`
            <div class="${word['Part'].toLowerCase()}-dictionary dictionary-word-container ">
                <p class="dictionary-word">${word['Terms']}</p>
                <p class="dictionary-definition">${word['Definitions']}</p>
            </div>
        `)
    })
    document.getElementById("dictionary-content-container").insertAdjacentHTML("beforeend",`
        <div class="scroll-support dictionary-word-container"><div>
        <div class="scroll-support dictionary-word-container"><div>
    `)
}
const renderScreen = (screenName) => {
    const mainScreen = document.getElementById("main-screen")
    const screenOrder = ["Playground", "Tests", "Dictionary", "About Us"]
    mainScreen.style.transform = `translateX(-${screenOrder.indexOf(screenName) * 20}%)`
}
renderScreen("Tests")

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

let currentPlayground
const showPlayground = (playgroundName) => {
    if (playgroundName === "rl-playground") {
        window.open("https://alazareva.github.io/rl_playground/","_blank");
        return
    }
    if (playgroundName === "wireshark") {
        window.open("https://www.wireshark.org/#downloadLink","_blank")
        return
    }
    document.getElementById("playground").style.transform = "translateY(-50%)"
    if (currentPlayground) {
        document.getElementById(currentPlayground).style.opacity = "0"
        document.getElementById(currentPlayground).style.zIndex = "0"
    }
    currentPlayground = playgroundName
    document.getElementById(currentPlayground).style.opacity = "1"
    document.getElementById(currentPlayground).style.zIndex = "1"
    let notes = {
        "hardware-model": `This is a model including most of the important hardware components of a computer. Just hover over any buttons.<br><br>While looking like a 3D model, this is actually a 2D model that's made in <b>Rive</b>, a web/application tool used by Duolingo. Yes, everysingle thing you see in this model had to be carefully drawn with vertices, all the parralelograms and whatnot (That's why we didn't bother with the fans lmao @v@). In the end, the whole thing took 2 people a total of 8 hours to model - 3-4 hours of which was poured into the motherboard alone - and an extra 3 hours to animate.<br><br>Well, due to limitted time, this model wasn't able to cover everything that you'd see on a computer these days, like a cooling unit or I/O devices (which are really annoying to model). Nevertheless, this should give you a good idea on what basic computer hardwares do.
        <br><br>Our tip: go deeper into it! There are so many things to discover in the world of hardware!<br><br>
        Also, this is <a href="https://rive.app/community/files/14620-27590-computer-model" style="color:cyan;">our Rive file</a> if you want to learn how this was made.`,
        "altair-8800": `
            Spoiler alert: you will actually have no idea how this machine work at all.<br>
            <br>
            The Altair 8800 was developed by MITS in 1975 based on the Intel 8080 microprocessor. It was simple by today's standards, consisting of a box with switches for input and lights for output. Its release sparked the personal computer revolution and attracted the attention of Bill Gates and Paul Allen, who developed the first version of Microsoft BASIC. So in another way, the Altair 8800 is credited with igniting the modern personal computing era.<br>
            <br>
            As simple as the design is, inputting instructions into this machine is a whole different story. You'll have to use quite literally the lowest level of "Programming language" - binary numbers.<br>
            <br>
            To summarize it, if you look at the A0-A15, that's going to be the memory address that's being examined, and D0-D7 line displays the value of that memory address. Both of these are displayed in binary.<br>
            <br>
            If you look at the "Ref" tab in the simulator, you'll also see the instructions it takes just to calculate 1+2. Yeah, you'll actually need to flick like 100 switches just to calculate 1+2. And if you ever flick any one of them wrong, you'll have to start all over again.<br>
            <br>
            Looking at this computer, it's quite incredible how much technology has changed in just the past 50 years. Now, computer calculations have been made not only simpler and more understandable, it's also more accessible for everyone through all the programming language courses online. But nevertheless, the Altair 8800 was a legend, is a legend, and always has been a legend in the history of hardware.<br>
        `,
        "eliza": `
            ELIZA is the first ever language processing program ever created by humanity. It was developed between 1964 and 1967 in MIT by Joseph Weizenbaum. <br>
            <br>
            ELIZA takes character as a Rogerian psychotherapist that helps the user in their time of distress and so on. This program was also one of the first programs that could qualify for the Turing Test!<br>
            <br>
            While people back then was easily convinced that ELIZA can understand the text that the user sends, the creator, Joseph, insisted the opposite. And it's for good reason as well.<br>
            <br>
            If you look at <span onclick="window.open('Playgrounds/eliza/source.txt')" style="color:cyan; cursor:pointer;">the source code</span>, you can see that the whole thing is just looking for a certain values of keywords provided by the user, converting them into values, and them printing out a prewritten response. Or in other words, as an early Symbolic AI program, ELIZA was just a bunch of if else statements, without any understanding of human text or emotions.<br>
            <br>
            Another interesting I found: Every time you input something into ELIZA, there would be a small delay before she responds. 
            This is not actually ELIZA calculating what response she should pick. She's actually hardcoded to wait for 1-4 seconds 
            in order to create an illusion that she's actually thinking like a human. Nice try, Weizenbaum.<br>
            <br>
            In code:<br>
            <span style="font-style:italic;font-size:12px;">setTimeout("think()", 1000 + Math.random()*3000);</span><br>
            <br>
            Nowadays, people have invented multiple other chatbots that we still use to this day, such as Siri, Alexa and ChatGPT. But still, to think that the first ever chatbot was invented even before the first general purpose computer. It's fascinating.
        `
    }
    document.getElementById("playground-notes-body").innerHTML = notes[currentPlayground]
}

let filtered = []

const filterCategory = (categoryName) => {
    if (filtered.includes(categoryName)) {
        filtered = filtered.filter(element => element != categoryName)
    } else {
        filtered.push(categoryName)
    }
    filterSearch()
}

document.getElementById("dictionary-search-bar").addEventListener("input", () => {
    filterSearch()
})
const filterSearch = () => {
    let searchValue = document.getElementById("dictionary-search-bar").value
    if (!searchValue) {
        searchValue = ""
    }
    updateGlossary(keyWordsData.filter(element => element["Terms"].toLowerCase().includes(searchValue.toLowerCase()) && !filtered.includes(element["Part"])))
}
const backPlayground = () => {
    document.getElementById("playground").style.transform = "translateY(0%)"
}


let bindings = []

const toggleBinding = (bindingID) => {
    const bindingElement = document.getElementById(bindingID)
    if (!bindings.includes(bindingID)) {
        selectBinding(bindingID)
    } else {
        deselectBinding(bindingID)
    }
    console.log(bindings)
}

const updateQuestionCounter = () => {
    compileTestBank(bindings, false);
    document.getElementById("test-counter").textContent = `Selected ${testBank.length}/${numberOfQuestions} questions`
    document.getElementById("test-percentage").textContent = `Around ${Math.floor(testBank.length*100/numberOfQuestions)}% of our test bank`
}
const selectBinding = (bindingID) => {
    const bindingElement = document.getElementById(bindingID)
    bindingElement.classList.remove("deselected-binding")
    bindingElement.classList.add("selected-binding")
    bindings.push(bindingID)
    updateQuestionCounter()
}

const deselectBinding = (bindingID) => {
    const bindingElement = document.getElementById(bindingID)
    bindingElement.classList.add("deselected-binding")
    bindingElement.classList.remove("selected-binding")
    bindings = bindings.filter(element => element != bindingID)
    updateQuestionCounter()
}

const selectAllBinding = (chapterID) => {
    for (i=1; i<=3; i++) {
        let bindingID = chapterID + i
        if (bindings.includes(bindingID)) {
            continue;
        }
        selectBinding(bindingID)
    }
}

const deselectAllBinding = (chapterID) => {
    for (i=1; i<=3; i++) {
        let bindingID = chapterID + i
        if (!bindings.includes(bindingID)) {
            continue;
        }
        deselectBinding(chapterID + i)
    }
}

const selectEverything = () => {
    selectAllBinding("A")
    selectAllBinding("B")
    selectAllBinding("C")
    selectAllBinding("D")
}

const deselectEverything = () => {
    deselectAllBinding("A")
    deselectAllBinding("B")
    deselectAllBinding("C")
    deselectAllBinding("D")
}

let testBank = []
let currentQuestionNumber = 0
let numCorrectAnswers = 0
const startTest = () => {
    compileTestBank(bindings, true);
    if (!testBank[0]) {
        alert("Select at least 1 subject")
        return
    }
    document.getElementById("tests").style.transform = "translateY(-50%)"
    currentQuestionNumber = 0
    numCorrectAnswers = 0
    document.getElementById("test-viewer-container").innerHTML = ""
    moveToQuestion(0)
    updateTestStats()
    renderQuestion(0)
    renderQuestion(1)
    renderQuestion(2)
    renderQuestion(3)
}

const renderQuestion = (questionNumber) => {
    let question
    if (questionNumber > testBank.length) {
        return
    } else if (questionNumber === testBank.length) {
        document.getElementById("test-viewer-container").insertAdjacentHTML("beforeend", `
            <div id="results-container" class="test-container">
                <p id="test-results-label">Results</p>
                <p id="test-results"></p>
                <p id="test-results-percentage"></p>
                <button id="test-retry" onclick="retrytest()">Retry?</button>
            </div>
        `)
        return
    } else {      
        question = testBank[questionNumber]
    }
    if (question["Type"] === "multiple-choice") {
        document.getElementById("test-viewer-container").insertAdjacentHTML("beforeend", `
            <div class="test-container">
              <div class="question-container">
                <p class="question-text">${question["Question"]}</p>
              </div>
              <div class="answers-container multiple-choice" id="question-${questionNumber}">
                <button class="answer-A answer" onclick="answerQuestion('A')">${question["A"]}</button>
                <button class="answer-B answer" onclick="answerQuestion('B')">${question["B"]}</button>
                <button class="answer-C answer" onclick="answerQuestion('C')">${question["C"]}</button>
                <button class="answer-D answer" onclick="answerQuestion('D')">${question["D"]}</button>
              </div>
            </div>
        `)
    } else if (question["Type"] === "true-false") {
        document.getElementById("test-viewer-container").insertAdjacentHTML("beforeend", `
            <div class="test-container">
              <div class="question-container">
                <p class="question-text">${question["Question"]}</p>
              </div>
              <div class="answers-container true-false" id="question-${questionNumber}">
                <button class="answer-true answer" onclick="answerQuestion(true)">True</button>
                <button class="answer-false answer" onclick="answerQuestion(false)">False</button>
              </div>
            </div>
        `)
    } else {

    }
}

const moveToQuestion = (questionNumber) => {
    document.getElementById("test-viewer-container").style.transform = `translateX(${-0.5*questionNumber}%)`
}

let answered = false
const answerQuestion = (givenAnswer) => {
    if (answered) {
        return
    }
    let correctAnswer = testBank[currentQuestionNumber]["Answer"]
    answered = true
    if (givenAnswer == correctAnswer) {
        numCorrectAnswers ++
    } else {
        // Maybe for future algorithms
    }

    if (testBank[currentQuestionNumber]["Type"] === "multiple-choice") {
        ["A","B","C","D"].forEach(answer => {
            if (answer === correctAnswer) {
                document.querySelector(`div#question-${currentQuestionNumber} .answer-${answer}`).classList.add("right-answer")
            } else if (answer === givenAnswer) {
                document.querySelector(`div#question-${currentQuestionNumber} .answer-${answer}`).classList.add("wrong-answer")
            }
        })
    } else {
        [true, false].forEach(answer => {
            if (answer === correctAnswer) {
                document.querySelector(`div#question-${currentQuestionNumber} .answer-${answer}`).classList.add("right-answer")
            } else if (answer === givenAnswer) {
                document.querySelector(`div#question-${currentQuestionNumber} .answer-${answer}`).classList.add("wrong-answer")
            }
        })
    } 
    
    setTimeout(() => {
        nextQuestion()
    }, 1000);
    setTimeout(() => {
        answered = false
    }, 2000);

}

const nextQuestion = () => {
    currentQuestionNumber ++
    updateTestStats()
    moveToQuestion(currentQuestionNumber)
    renderQuestion(currentQuestionNumber+3)
}

const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}


const compileTestBank = (selectedBindings, isShuffled) => {
    let multipleChoiceBank = testData["Multiple Choice"].filter(element => selectedBindings.includes(element["Chapter"] + element["Lesson"]))
    multipleChoiceBank.map(element => {
        element["Type"] = "multiple-choice" 
        return element
    })
    let trueFalseBank = testData["True False"].filter(element => selectedBindings.includes(element["Chapter"] + element["Lesson"]))
    trueFalseBank.map(element => {
        element["Type"] = "true-false"
        return element
    })
    testBank = multipleChoiceBank.concat(trueFalseBank)
    if (isShuffled) {
        testBank = shuffle(testBank)
    }
}

const updateTestStats = () => {
    const currentQuestion = currentQuestionNumber + 1
    const totalQuestions = testBank.length
    const progress = Math.floor(currentQuestionNumber*100/totalQuestions) + "%"
    const rightAnswers = numCorrectAnswers
    const wrongAnswers = currentQuestionNumber - numCorrectAnswers
    const accuracy = currentQuestionNumber === 0 ? "100%" : Math.floor(rightAnswers*100/currentQuestionNumber) + "%"
    let topic
    if (testBank[currentQuestionNumber]) {
        let questionData = testBank[currentQuestionNumber]
        topic = tableOfContent[questionData["Chapter"]]["Name"] + " - " + tableOfContent[questionData["Chapter"]][questionData["Lesson"]]
    } else {
        topic = "Done"
        document.getElementById("test-results").textContent = rightAnswers + "/" + totalQuestions
        document.getElementById("test-results-percentage").textContent = accuracy
    }
    
    document.getElementById("stat-question-number").textContent = currentQuestion > totalQuestions ? totalQuestions : currentQuestion
    document.getElementById("stat-total-question").textContent = totalQuestions
    document.getElementById("stat-progress").textContent = progress
    document.getElementById("stat-right-answers").textContent = rightAnswers
    document.getElementById("stat-wrong-answers").textContent = wrongAnswers
    document.getElementById("stat-accuracy").textContent = accuracy
    document.getElementById("stat-topic").textContent = topic
}
const redirect = (link) => {
    window.open(link, "_blank")
}

const retrytest = () => {
    document.getElementById("tests").style.transform = "translateY(0)"
}
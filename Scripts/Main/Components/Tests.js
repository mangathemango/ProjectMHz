let testData = {}
let counter = {}
fetch("Json/tests.json").then(response => response.json()).then((data) => {
    testData = data;
    let multipleChoiceBank = testData["Multiple Choice"]
    multipleChoiceBank.map(element => {
        element["Type"] = "multiple-choice" 
        return element
    })
    let trueFalseBank = testData["True False"]
    trueFalseBank.map(element => {
        element["Type"] = "true-false"
        return element
    })
    testData = multipleChoiceBank.concat(trueFalseBank)
    numberOfQuestions = testData.length
    testData.forEach(question => {
        if (!counter[question["Module"]]) {
            counter[question["Module"]] = 1
        } else {
            counter[question["Module"]] ++
        }
    })
    appendTestPacks()
})

let testBank = []
const appendTestPacks = () => {
    let icon = {
        "Network":              '<i class="test-pack-icon fa-solid fa-wifi"></i>',
        "Hardware":             '<i class="test-pack-icon fa-solid fa-microchip"></i>',
        "Connectionist AI":     '<i class="test-pack-icon fa-solid fa-hexagon-nodes"></i>',
        "Symbolic AI":          '<i class="test-pack-icon fa-solid fa-icons"></i>',
        "AI Overview":          '<i class="test-pack-icon fa-solid fa-brain"></i>',
        "Algorithms":           '<i class="test-pack-icon fa-solid fa-laptop-code"></i>',
        "Big Data":             '<i class="test-pack-icon fa-solid fa-database"></i>',
        "Behaviorist AI":       '<i class="test-pack-icon fa-solid fa-robot"></i>',
        "Software":             '<i class="test-pack-icon fa-brands fa-app-store-ios"></i>'
    }
    Object.keys(counter).sort((a,b) => counter[b] - counter[a]).forEach(module => {
        let moduleID = module.replace(" ","-")
        document.getElementById("test-packs-container").insertAdjacentHTML("beforeend",`
            <div class="test-pack-container" id="${moduleID}-pack" onclick="togglePack('${module}')">
                ${icon[module]}
                <span class="test-pack-tooltip" id="${moduleID}-pack-tooltip">
                    ${module} Pack<br>
                    ${counter[module]} Questions
                </span>
            </div>
        `)
    })
}

let selectedPacks = []

const togglePack = (pack) => {
    let packID = pack.replace(" ","-") + "-pack"
    if (selectedPacks.includes(pack)) {
        document.getElementById(packID).classList.remove("selected-test-pack")
        selectedPacks = selectedPacks.filter(selectedPack => selectedPack != pack)
    } else {
        document.getElementById(packID).classList.add("selected-test-pack")
        selectedPacks.push(pack)
    }
    compileTestBank()
    updateQuestionCounter()
    updateTestTime()
}

const updateQuestionCounter = () => {
    document.getElementById("test-pool-question-number").textContent = testBank.length + " Questions"
    document.getElementById("test-amount-scroll").max = testBank.length
    document.getElementById("test-amount-scroll").value = testBank.length
    document.getElementById("test-amount-text-input").value = testBank.length
}

document.getElementById("test-amount-scroll").addEventListener("input", () => {
    document.getElementById("test-amount-text-input").value = document.getElementById("test-amount-scroll").value
    updateTestTime()
})

document.getElementById("test-amount-text-input").addEventListener("input", () => {
    if (document.getElementById("test-amount-text-input").value > testBank.length) {
        document.getElementById("test-amount-text-input").value = testBank.length
    }
    document.getElementById("test-amount-scroll").value = document.getElementById("test-amount-text-input").value
    updateTestTime()
})

const updateTestTime = () => {
    let timePerQuestion = 10;
    let totalQuestions = document.getElementById("test-amount-text-input").value;
    let totalSeconds = timePerQuestion * totalQuestions
    let totalMinutes = Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    let totalHours = Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    let timeText = "Takes around<br>"


    timeText += totalHours + " Hours "

    timeText += totalMinutes + " Minutes "

    timeText += totalSeconds + " Seconds "

    document.getElementById("test-time").innerHTML = timeText
}

let correctStreak = 0
const startTest = () => {
    let totalQuestions = document.getElementById("test-amount-text-input").value;
    testBank = testBank.filter(element => testBank.indexOf(element) < totalQuestions)
    if (!testBank[0]) {
        alert("Select at least 1 subject")
        return
    }
    testBank = shuffle(testBank)
    document.getElementById("tests").style.transform = "translateY(-50%)"
    correctStreak = 0
    currentQuestionNumber = 0
    numCorrectAnswers = 0
    document.getElementById("test-streak-viewer").style.setProperty("--streak",correctStreak)
    document.getElementById("streak-number").textContent = correctStreak
    document.getElementById("streak-number").style.transform = `translateX(${100 * (correctStreak > 10 ? 9 : correctStreak - 1)}%)`
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
    let answers = []
    if (question["Type"] === "multiple-choice") {
        answers = [
            `<button class="answer-A answer" onclick="answerQuestion('A')">${question["A"]}</button>`,
            `<button class="answer-B answer" onclick="answerQuestion('B')">${question["B"]}</button>`,
            `${question["C"]? `<button class="answer-C answer" onclick="answerQuestion('C')">${question["C"]}</button>`: ""}`,
            `${question["D"]? `<button class="answer-D answer" onclick="answerQuestion('D')">${question["D"]}</button>`: ""}`,
        ]
    } else if (question["Type"] === "true-false") {
        answers = [
            '<button class="answer-true answer" onclick="answerQuestion(true)">True</button>',
            '<button class="answer-false answer" onclick="answerQuestion(false)">False</button>'
        ]
    }
    answers = answers.toString()
    while (answers.includes(",")) {
        answers = answers.replace(",","")
    }

    document.getElementById("test-viewer-container").insertAdjacentHTML("beforeend", `
        <div class="test-container">
          <div class="question-container">
            <p class="question-text">${question["Question"]}</p>
          </div>
          <div class="answers-container ${question["Type"]}" id="question-${questionNumber}">
            ${answers}
          </div>
        </div>
    `)
}

let viewedQuestionNumber = 0
let questionAnswered = false
let viewingPreviousQuestion = false
const moveToQuestion = (questionNumber) => {
    viewedQuestionNumber = questionNumber
    if (viewedQuestionNumber == 0) {
        document.getElementById("test-nav-back").style.scale = "0"
    } else {
        document.getElementById("test-nav-back").style.scale = "1"
    }
    if (viewedQuestionNumber == currentQuestionNumber) {
        document.getElementById("test-nav-forward").style.scale = "0"
        viewingPreviousQuestion = false
    } else {
        document.getElementById("test-nav-forward").style.scale = "1"
        viewingPreviousQuestion = true
    }
    document.getElementById("test-viewer-container").style.transform = `translateX(${-0.5*questionNumber}%)`
    updateTestStats()
}

const moveBack = () => {
    if (viewedQuestionNumber == 0) {
        return;
    } 
    viewedQuestionNumber --;
    moveToQuestion(viewedQuestionNumber)
}

const moveForward = () => {
    if (viewedQuestionNumber == currentQuestionNumber) {
        return;
    } 
    viewedQuestionNumber ++;
    moveToQuestion(viewedQuestionNumber)
}


const answerQuestion = (givenAnswer) => {
    if (questionAnswered || viewingPreviousQuestion) {
        return
    }
    let correctAnswer = testBank[currentQuestionNumber]["Answer"]
    if (typeof(givenAnswer) != typeof(correctAnswer)) {
        return
    }
    console.log("Answer given: " + givenAnswer)
    console.log("Question Data: ") 
    console.log(testBank[currentQuestionNumber])
    questionAnswered = true
    if (givenAnswer == correctAnswer) {
        console.log("Result: Correct")
        numCorrectAnswers ++
        correctStreak ++
        console.log("Streak: " + correctStreak)
    } else {
        console.log("Result: Wrong")
        correctStreak = 0
    }
    document.getElementById("test-streak-viewer").style.setProperty("--streak",correctStreak)
    document.getElementById("streak-number").textContent = correctStreak
    document.getElementById("streak-number").style.transform = `translateX(${100 * (correctStreak > 10 ? 9 : correctStreak - 1)}%)`
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
        questionAnswered = false
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

const compileTestBank = () => {
    testBank = testData.filter(question => selectedPacks.includes(question["Module"]))

    testBank = shuffle(testBank)
}

const compileTestBankByTeam = (team) => {
    testBank = testData.filter(question => question["Team"] == team)

    updateQuestionCounter()
    updateTestTime()
    if (testBank[0]) {
        console.log("Test Bank compiled for: " + team)
    } else {
        console.log(team + " not found in database")
        console.log()
    }
}

const updateTestStats = () => {
    const currentQuestion = viewedQuestionNumber + 1
    const totalQuestions = testBank.length
    const progress = Math.floor(currentQuestionNumber*100/totalQuestions) + "%"
    const rightAnswers = numCorrectAnswers
    const wrongAnswers = currentQuestionNumber - numCorrectAnswers
    const accuracy = currentQuestionNumber === 0 ? "100%" : Math.floor(rightAnswers*100/currentQuestionNumber) + "%"
    let topic
    if (testBank[currentQuestionNumber]) {
        let questionData = testBank[viewedQuestionNumber]
        topic = `${questionData["Team"]} - ${questionData["Module"]}`
        if (questionData["Topic"]) {
            topic += ` (${questionData["Topic"]})`
        }
        
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
    document.getElementById("stat-topic").innerHTML = topic
}

const continuetest = () => {
    document.getElementById("tests").style.transform = "translateY(-50%)"
}

const retrytest = () => {
    document.getElementById("tests").style.transform = "translateY(0)"
}


document.addEventListener("keydown", (event) => {
    console.log(event.key)
    if (event.key == "ArrowRight") {
        moveForward()
    }
    if (event.key == "ArrowLeft") {
        moveBack()
    }
    if (event.key == "1" || event.key == "q") {
        answerQuestion("A")
        answerQuestion(true)
    }
    if (event.key == "2" || event.key == "e") {
        answerQuestion("B")
        answerQuestion(false)
    }
    if (event.key == "3" || event.key == "a") {
        answerQuestion("C")
        answerQuestion(true)
    }
    if (event.key == "4" || event.key == "d") {
        answerQuestion("D")
        answerQuestion(false)
    }
    if (event.key == "Escape") {
        retrytest()
    }
})

let shakeStrength = 5;
setInterval(() => {
    if (correctStreak > 10) {
        let shiftAmmountX = Math.random()*shakeStrength - shakeStrength / 2
        let shiftAmmountY = Math.random()*shakeStrength - shakeStrength / 2
        document.getElementById("test-streak-viewer").style.transform = `translateX(calc(-50% + ${shiftAmmountX}px)) translateY(${shiftAmmountY}px)`
    } else {
        document.getElementById("test-streak-viewer").style.transform = `translateX(-50%)`
    }
}, 1);
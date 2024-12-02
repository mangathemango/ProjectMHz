let keyWordsData
fetch("Json/keyWords.json").then(response => response.json()).then((data) => {
    keyWordsData = data["Key words"].sort((a,b) => a["Terms"] < b["Terms"] ? -1 : 1)
    updateDictionary(keyWordsData)
})


document.getElementById("dictionary-search-bar").addEventListener("input", () => {
    filterSearch(keyWordsData)
})

/**
 * Inserts a dictionary Entry Element into the dictionary 
 * container content container for every key word entries in the database
 * 
 * @param {Array} data - The database we were talking about
 * For details about the database, look at dictionaryEntryElement(wordData)
 */
const updateDictionary = (data) => {
    const dictionaryContainer = document.getElementById("dictionary-content-container")

    // Clear everything in the dictionary
    dictionaryContainer.innerHTML = ""

    // Add a HTML div element for every entry in the alphabetically sorted database
    sortDictionaryAlphabetically(data).forEach(wordData => {
        dictionaryContainer.insertAdjacentHTML("beforeend",dictionaryEntryElement(wordData))
    })

    // Add some invisible elements so that the word Elements
    // can be scrolled to the center of the screen
    const invisibleElement = `
        <div class="scroll-support dictionary-word-container"><div>
        <div class="scroll-support dictionary-word-container"><div>
    `
    dictionaryContainer.insertAdjacentHTML("afterbegin",invisibleElement)
    dictionaryContainer.insertAdjacentHTML("beforeend",invisibleElement)
}

let filtered = []

const filterCategory = (categoryName) => {
    if (filtered.includes(categoryName)) {
        filtered = filtered.filter(element => element != categoryName)
    } else {
        filtered.push(categoryName)
    }
    filterSearch(keyWordsData)
}

const filterSearch = (data) => {
    let searchValue = document.getElementById("dictionary-search-bar").value
    if (!searchValue) {
        searchValue = ""
    }
    updateDictionary(data.filter(element => element["Terms"].toLowerCase().includes(searchValue.toLowerCase()) && !filtered.includes(element["Part"])))
}



/**
 * 
 * @param {Object} data the word's information object
 * @returns {Object} - the alphabetically sorted object
 */
const sortDictionaryAlphabetically = (data) => {
    return data.sort((a,b) => a["Terms"] < b["Terms"] ? -1 : 1)
}

/**
 * Returns a single HTML element inside the dictionary container
 * @param {Object} wordData - the word's information object
 * A wordData object would look like this
 *  {
 *    "Terms": "Auto classfication",
 *    "Part": "AI",
 *    "Definitions": "The application of machine learning,..."
 *  }
 * @returns {HTMLDivElement} The element's HTML string
 */
const dictionaryEntryElement = (wordData) => {
    return `
        <div class="${wordData['Part'].toLowerCase()}-dictionary dictionary-word-container ">
            <p class="dictionary-word">${wordData['Terms']}</p>
            <p class="dictionary-definition">${wordData['Definitions']}</p>
        </div>
    `
}
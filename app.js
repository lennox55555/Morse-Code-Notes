//Assigns button element a variable in js
let startBtn = document.querySelector('#start-btn');

//Assigns the Notes Textarea a variable
let notes = document.getElementById("notes");

//Assigns the Back Button as with a variable
let backPageBtn = document.getElementById("backPageBtn");

//Assigns the Next Button as with a variable
let nextPageBtn = document.getElementById("nextPageBtn");

//Assigns the play Button as with a variable
let playCodeBtn = document.getElementById("playCodeBtn");

//Control panel host all the button mapping for features/actions
let controlPanelMap = document.getElementById("controlPanel");

//Assigns the share code button to a variable
let shareCodeBtn = document.getElementById("shareCodeBtn");

//Assigns the encrypt button to a variable
let encryptCodeBtn = document.getElementById("encryptCodeBtn");

//Assigns the decrypt button to a variable
let decryptCodeBtn = document.getElementById("decryptCodeBtn");

//Assigns the save button to a variable
let saveCodeBtn = document.getElementById("saveCodeBtn");

//Assigns the clearCode button to a variable
let clearCodeBtn = document.getElementById("clearCodeBtn");

//Assigns the wordCount meter to a variable
let wordCountLabel = document.getElementById("wordCount");

//On starting click
startBtn.addEventListener('click', ()=>{
    //CSS class that make opacity 0 over 1sec
    startBtn.className += 'disappear'

    //CSS class elements slide from the left on screen
    notes.className += 'textAreaSlide'

    //Applies the slide class to back button
    backPageBtn.className += 'backPageBtnSlide'

    //Applies the slide class to next button
    nextPageBtn.className += "nextPageBtnSlide"

    //Applies the slide class to control panel
    controlPanelMap.className += "controlPanelSlide"

    //Applies the slide class to play button
    playCodeBtn.className += " playCodeBtnSlide"

    //Applies the slide class to share button
    shareCodeBtn.className += "shareCodeBtnSlide"

    //Applies the slide class to encrypt button
    encryptCodeBtn.className += "encryptCodeBtnSlide"

    //Applies the slide class to decrypt button
    decryptCodeBtn.className += "decryptCodeBtnSlide"

    //Applies the slide class to clear button
    clearCodeBtn.className += "clearCodeBtnSlide"

    //Applies the slide class to save button
    saveCodeBtn.className += "saveCodeBtnSlide"

    // loads the first page from the local storage
    notes.value = localStorage.getItem("0")

})

//Initializes an array to store every page
let allNotes = []

//Initializes an array to store every page in morse code
let allMorseNotes = []

//Initializes page number for reference and display
let pageNumber = 0

//Initializes the number of words
let wordCount = 0

//When next page is clicked
nextPageBtn.addEventListener('click', ()=>{

    // limits the user from creating unused blank pages
    if (notes.value ===``) {
        alert("Unable to create new page, use the current page.")
    }

    //If this is a new page, create a new page
    else if (countLocalStorageItems() === pageNumber && notes.value !== "") {

        // uploads the current page to local storage with current page number
        localStorage.setItem(`${pageNumber}`, `${notes.value}`)

        // adds to note array
        allNotes.push(notes.value)

        // adds to morse note array
        allMorseNotes.push(stringToMorseCode(notes.value))

        // sets the new page equal to blank
        notes.value = ``

        // indexes page number
        pageNumber +=1
    }
    // If there is existing Page, load content
    else if (localStorage.getItem(`${pageNumber + 1}`) !== ``) {

        //updates the notes array with new updated value, this is not reactive
        allNotes[pageNumber] = notes.value

        // updates the morse code array with converted morse code value
        allMorseNotes[pageNumber] = stringToMorseCode(notes.value)

        // removes the previous page  from local storage
        localStorage.removeItem(pageNumber);

        // updates the local storage with the previous page number but new value
        localStorage.setItem(`${pageNumber}`, `${notes.value}`)

        // index page number
        pageNumber += 1

        // obtains the content from nex page and makes it the current page
        notes.value = localStorage.getItem(`${pageNumber}`)

    }

    // counts the number of words
    countWords()
})



//When back page is clicked
backPageBtn.addEventListener('click', ()=>{
    if(pageNumber === 0) {
        pageNumber = 0
    }
    else if (!allNotes.includes(notes.value) && notes.value !== ``) {
        localStorage.setItem(`${pageNumber}`, `${notes.value}`)
        pageNumber -= 1
        notes.value = localStorage.getItem(`${pageNumber}`)
    }
    else {
        pageNumber -= 1
        notes.value = localStorage.getItem(`${pageNumber}`)
    }
    console.log(pageNumber)
    console.log(allNotes)

    countWords()
})

encryptCodeBtn.addEventListener('click', ()=>{
    notes.value = stringToMorseCode(notes.value)
})

decryptCodeBtn.addEventListener('click', ()=>{
    notes.value = decodeMorse(notes.value)
})

// A function that takes the notes of all pages and adds it into a email document
shareCodeBtn.addEventListener('click', ()=>{
    if (countLocalStorageItems() === 0) {
        window.open(`mailto:test@example.com?subject=subject&body=${stringToMorseCode(notes.value)}`);
        save()
    }
    else if (!allNotes.includes(notes.value)) {
        window.open(`mailto:test@example.com?subject=subject&body=${allMorseNotes + stringToMorseCode(notes.value)}`);
        save()
    }
    else {
        if (allNotes.includes(notes.value)) {
            window.open(`mailto:test@example.com?subject=subject&body=${allMorseNotes}`);
        }
    }

})

saveCodeBtn.addEventListener('click', ()=> {
    // formats the text
    notes.value = capitalizeSentences(notes.value)

    // saves
    save()
})



clearCodeBtn.addEventListener('click', ()=>{
    localStorage.clear();
    notes.value = ''
    pageNumber = 0
})

playCodeBtn.addEventListener('click', ()=>{
    textToAudio(stringToMorseCode(notes.value),0)
})

function save() {
    for (let i=0; i<allNotes.length; i++) {
        localStorage.setItem(`${i}`, allNotes[i])

    }
    localStorage.setItem(`${pageNumber}`,notes.value)

}

function countLocalStorageItems() {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            count++;
        }
    }
    return count;
}

function countWords() {

    if (notes.value !== "") {
        wordCount = notes.value.split(" ").length;
        if (wordCount === 1) {
            wordCountLabel.innerText = `${wordCount} word`;
        }
        else {
            wordCountLabel.innerText = `${wordCount} words`;
        }
    }
    else {
        wordCount = 0;
    }
    return wordCount;
}



document.addEventListener("keydown", event => {
    // Check if the space bar was pressed
    if (event.code === "Space" || event.code === "Backspace") {
        // Do something when space bar is clicked
        countWords()
    }
});

function stringToMorseCode(str) {
    const morseCodeMap = {
        "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.", "g": "--.",
        "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..", "m": "--", "n": "-.",
        "o": "---", "p": ".--.", "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-",
        "v": "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", "0": "-----",
        "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....",
        "7": "--...", "8": "---..", "9": "----.", " ": "/", ".":".-.-.-"
    };

    let morseCode = "";

    for (let i = 0; i < str.length; i++) {
        let char = str[i].toLowerCase();

        if (morseCodeMap[char]) {
            morseCode += morseCodeMap[char] + " ";
        } else {
            morseCode += char + " ";
        }
    }

    return morseCode;
}

const audioContext = new AudioContext();


function dotAudioBtn() {
    const audioCtx = new AudioContext();

// create Oscillator node
    const oscillator = audioCtx.createOscillator();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(550, audioCtx.currentTime); // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1)

}


function dashAudioBtn() {
    const audioCtx = new AudioContext();

// create Oscillator node
    const oscillator = audioCtx.createOscillator();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(550, audioCtx.currentTime); // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3)

}

function spaceAudioBtn() {
    // creates a new audio instance
    const audioCtx = new AudioContext();

    // create Oscillator node
    const oscillator = audioCtx.createOscillator();

    // creates a frequency that you cannot hear
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(0, audioCtx.currentTime); // value in hertz
    oscillator.connect(audioCtx.destination);

    //starts the audio
    oscillator.start();

    // plays the audio for 3 mili seconds
    oscillator.stop(audioContext.currentTime + 0.3)

}

function textToAudio(morse, count) {
    //let count;

    let interval = setInterval(function() {

        console.log("Count: " + count);

        if(count === morse.length)
        {
            clearInterval(interval);
        }
        else
        {
            if (morse[count] === ".") {
                dotAudioBtn()
            }
            else if (morse[count] === "-") {
                dashAudioBtn()
            }
            else {
                spaceAudioBtn()
            }
            count++;

        }
    },400);

}

function decodeMorse(morseCode) {
    // Define the Morse code alphabet as a lookup table
    // Ensures there text is morse code and not any letters
    if (/^[./\- ]+$/.test(notes.value)) {
        const morseAlphabet = {
            ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F", "--.": "G",
            "....": "H", "..": "I", ".---": "J", "-.-": "K", ".-..": "L", "--": "M", "-.": "N",
            "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T", "..-": "U",
            "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z", ".----": "1",
            "..---": "2", "...--": "3", "....-": "4", ".....": "5", "-....": "6", "--...": "7",
            "---..": "8", "----.": "9", "-----": "0", "--..--": ",", ".-.-.-": ".", "..--..": "?",
            "-..-.": " ", "-.--.": "(", "-.--.-": ")", ".--.-.": "@", "-....-": "-", "-...-": "=",
            ".-.-.": "+", "-.-.-.": ";", "---...": ":", "-.-.--": "!", ".-..-.": "\"", "...-..-": "$",
            ". ...": "SOS", "/": " "
        };

        // Split the input Morse-code into individual letters
        const letters = morseCode.trim().split(" ");

        // Decode each letter using the lookup table
        const text = letters
            .map(letter => morseAlphabet[letter])
            .join("");

        return capitalizeSentences(text);
    }
    else {
        save()
        alert("The only character that this program can decrypt is: .  -  / ")

        return notes.value
    }

}

function capitalizeSentences(str) {
    // converts value to all lower case
    const lowerSentence = str.toLowerCase()

    // finds every instance of a period followed by a space
    const sentences = lowerSentence.split('. ');

    //maps the improper sentence to an upper case function but only the first letter
    const capitalized = sentences.map(sentence => {
        if (sentence.length > 0) {
            return sentence[0].toUpperCase() + sentence.slice(1);
        }
        return '';
    });
    return capitalized.join('. ');
}


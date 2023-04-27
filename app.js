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

//
let controlPanelMap = document.getElementById("controlPanel");

let shareCodeBtn = document.getElementById("shareCodeBtn");

let encryptCodeBtn = document.getElementById("encryptCodeBtn");

let decryptCodeBtn = document.getElementById("decryptCodeBtn");

let saveCodeBtn = document.getElementById("saveCodeBtn");

let pauseCodeBtn = document.getElementById("pauseCodeBtn");

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

    controlPanelMap.className += "controlPanelSlide"

    playCodeBtn.className += " playCodeBtnSlide"

    shareCodeBtn.className += "shareCodeBtnSlide"

    encryptCodeBtn.className += "encryptCodeBtnSlide"

    decryptCodeBtn.className += "decryptCodeBtnSlide"

    pauseCodeBtn.className += "pauseCodeBtnSlide"

    saveCodeBtn.className += "saveCodeBtnSlide"

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
    if (notes.value ===``) {
        alert("Unable to create new page, use the current page.")
    }
    //New Page
    else if (countLocalStorageItems() === pageNumber && notes.value !== "") {
        localStorage.setItem(`${pageNumber}`, `${notes.value}`)
        allNotes.push(notes.value)
        allMorseNotes.push(stringToMorseCode(notes.value))
        notes.value = ``
        pageNumber +=1
        console.log("new page")
    }
    //Load Page
    else if (localStorage.getItem(`${pageNumber + 1}`) !== ``) {
        allNotes[pageNumber] = notes.value
        allMorseNotes[pageNumber] = stringToMorseCode(notes.value)
        localStorage.removeItem(pageNumber);
        localStorage.setItem(`${pageNumber}`, `${notes.value}`)
        pageNumber += 1
        notes.value = localStorage.getItem(`${pageNumber}`)



    }

    console.log(allMorseNotes)
    console.log(allNotes)
    console.log(pageNumber)
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

shareCodeBtn.addEventListener('click', ()=>{
    if (countLocalStorageItems() === 0) {
        window.open(`mailto:test@example.com?subject=subject&body=${stringToMorseCode(notes.value)}`);
        //save code here
    }
    else if (!allNotes.includes(notes.value)) {
        window.open(`mailto:test@example.com?subject=subject&body=${allMorseNotes + stringToMorseCode(notes.value)}`);

    }
    else {
        if (allNotes.includes(notes.value)) {
            window.open(`mailto:test@example.com?subject=subject&body=${allMorseNotes}`);
        }
    }

})

saveCodeBtn.addEventListener('click', ()=> {
    save()
})

pauseCodeBtn.addEventListener('click', ()=>{

})

playCodeBtn.addEventListener('click', ()=>{
    textToAudio(stringToMorseCode(notes.value))
})

function save() {
    for (let i=0; i<allNotes.length; i++) {
        localStorage.setItem(`${i}`, allNotes[i])
        //localStorage.setItem(`${i + 1}`)
    }
    localStorage.setItem(`${pageNumber}`,notes.value)
    notes.value = capitalizeSentences(notes.value)
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

const buffer = audioContext.createBuffer(1, audioContext.sampleRate * .1, audioContext.sampleRate)

channelData = buffer.getChannelData(0)

for (let i = 0; i < buffer.length; i++) {
    channelData[i] = Math.random() * 2 - 1;
}

const primaryGainControl = audioContext.createGain()

primaryGainControl.gain.setValueAtTime(0.05, 0)

primaryGainControl.connect(audioContext.destination)



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

    //textToAudio(stringToMorseCode(notes.value))

}

function spaceAudioBtn() {
    const audioCtx = new AudioContext();

// create Oscillator node
    const oscillator = audioCtx.createOscillator();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(0, audioCtx.currentTime); // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3)

}

function textToAudio(morse) {
    let count = 0;

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

function capitalizeSentences(str) {
    const lowerSentence = str.toLowerCase()
    const sentences = lowerSentence.split('. ');
    const capitalized = sentences.map(sentence => {
        if (sentence.length > 0) {
            return sentence[0].toUpperCase() + sentence.slice(1);
        }
        return '';
    });
    return capitalized.join('. ');
}


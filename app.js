//Assigns button element a variable in js
let startBtn = document.querySelector('#start-btn');

//Assigns the Notes Textarea a variable
let notes = document.getElementById("notes")

//Assigns the Back Button as with a variable
let backPageBtn = document.getElementById("backPageBtn")

//Assigns the Next Button as with a variable
let nextPageBtn = document.getElementById("nextPageBtn")

//Assigns the play Button as with a variable
let playCodeBtn = document.getElementById("playCodeBtn")

//
let controlPanelMap = document.getElementById("controlPanel")

let shareCodeBtn = document.getElementById("shareCodeBtn")



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

    playCodeBtn.className += "playCodeBtnSlide"

    shareCodeBtn.className += "shareCodeBtnSlide"


})
//Initializes an array to store every page
let allNotes = []
let allMorseNotes = []
//Initializes page number for reference and display
let pageNumber = 0

//When next page is clicked
nextPageBtn.addEventListener('click', ()=>{

    let pageNotes = notes.value;
    //If next page has content load the next page.
    if (pageNumber < allNotes.length) {
        //index page number
        pageNumber += 1;
        //page content is equal to next page
        notes.value = allNotes[pageNumber];

        //Prevents loading new page with undefined once back button is clicked
        if (pageNumber === allNotes.length)  {
            notes.value = '';
        }
    }
    //Prevents from create more pages when user already has a blank page.
    else if (notes.value ==="") {
        //alerts user that page cannot be created
        alert("Cannot advance to next page without any text.")
    }
    //If the current page is not blank, add to array and create new empty page
    else if (pageNotes !== '' && pageNotes !== allNotes[pageNumber - 1]) {
        //index page
        pageNumber += 1;
        //converts all text to morse code and appends to All Notes Array
        allNotes.push(pageNotes);
        //appends to All Notes Array
        allMorseNotes.push(stringToMorseCode(pageNotes));
        //sets the page value to nothing
        notes.value = "";

    }
    //test case
    console.log(pageNumber);
    //test case
    console.log(allNotes);
    console.log(allMorseNotes)
})

//When back page is clicked
backPageBtn.addEventListener('click', ()=>{
    //Prevents program to going to negative page number
    if (pageNumber === 0  ) {
        pageNumber = 0
    }
    // If there is a previous page, display previous page
    else {
        pageNumber -= 1
        //sets the page content to page number
        notes.value = allNotes[pageNumber];
    }
    //test case
    console.log(pageNumber);
    //test case
    console.log(allNotes);
})

shareCodeBtn.addEventListener('click', ()=>{
    window.open(`mailto:test@example.com?subject=subject&body=${allMorseNotes}`);
    console.log("done")
})


playCodeBtn.addEventListener('click', ()=>{
    textToAudio(stringToMorseCode(notes.value))
})
function countWords() {
    return notes.value.split(" ").length;
}

function checkFeatures() {
    if (notes.value === "") {

    }
    else {
        //document.body.appendChild(playAudioBtn)

    }
}


document.addEventListener("keydown", event => {
    // Check if the space bar was pressed
    if (event.code === "Space" || event.code === "Backspace") {
        // Do something when space bar is clicked
        countWords()
        checkFeatures()
        //whiteNoiseSource.start()


    }
});

function stringToMorseCode(str) {
    const morseCodeMap = {
        "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.", "g": "--.",
        "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..", "m": "--", "n": "-.",
        "o": "---", "p": ".--.", "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-",
        "v": "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", "0": "-----",
        "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....",
        "7": "--...", "8": "---..", "9": "----.", " ": "/"
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

console.log(audioContext.sampleRate)

const buffer = audioContext.createBuffer(1, audioContext.sampleRate * .1, audioContext.sampleRate)

channelData = buffer.getChannelData(0)

console.log(channelData.length)

for (let i = 0; i < buffer.length; i++) {
    channelData[i] = Math.random() * 2 - 1;
}

const primaryGainControl = audioContext.createGain()

primaryGainControl.gain.setValueAtTime(0.05, 0)

primaryGainControl.connect(audioContext.destination)

// const playAudioBtn = document.createElement("button");
// playAudioBtn.innerText = "Play"
// playAudioBtn.addEventListener("click", () => {
//     const whiteNoiseSource = audioContext.createBufferSource();
//     whiteNoiseSource.buffer = buffer;
//     whiteNoiseSource.connect(primaryGainControl)
//     whiteNoiseSource.start()
//
// })

const playAudioBtn = document.createElement("button");
playAudioBtn.innerText = "Play"

function dotAudioBtn() {
    const audioCtx = new AudioContext();

// create Oscillator node
    const oscillator = audioCtx.createOscillator();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(550, audioCtx.currentTime); // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1)

    //textToAudio(stringToMorseCode(notes.value))

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

    //textToAudio(stringToMorseCode(notes.value))

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














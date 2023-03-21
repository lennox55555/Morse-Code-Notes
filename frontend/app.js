// Assigns button element a variable in js
let startBtn = document.querySelector('#start-btn');

// Assigns the Notes Textarea a variable
let notes = document.getElementById("notes")

// Assigns the Back Button as with a variable
let backPageBtn = document.getElementById("backPageBtn")

// Assigns the Next Button as with a variable
let nextPageBtn = document.getElementById("nextPageBtn")

// On starting click
startBtn.addEventListener('click', ()=>{
    //CSS class that make opacity 0 over 1sec
    startBtn.className += 'disappear'
    //CSS class elements slide from the left on screen
    notes.className += 'textAreaSlide'
    backPageBtn.className += 'backPageBtnSlide'
    nextPageBtn.className += "nextPageBtnSlide"
})




let allNotes = []
let pageNumber = 0

// When next page is clicked
nextPageBtn.addEventListener('click', ()=>{
    let pageNotes = notes.value;
    if (pageNumber < allNotes.length) {
        pageNumber += 1;
        notes.value = allNotes[pageNumber];
    }
    else {
        allNotes.push(pageNotes);
        notes.value = "";
        pageNumber += 1;
    }
    console.log(pageNumber)
    console.log(allNotes);
})


// When back page is clicked
backPageBtn.addEventListener('click', ()=>{
    let pageNotes = notes.value;
    if (pageNumber === 0  ) {
        pageNumber = 0
        notes.value = allNotes[pageNumber];
    }
    else {
        pageNumber -= 1
        notes.value = allNotes[pageNumber];

    }

})
const baseUrl = 'http://localhost:8383/info'

nextPageBtn.addEventListener('click', getNotes)

async function getNotes(e) {
    e.preventDefault()
    const res = await fetch(baseUrl, {
        method: 'GET'
    })
    console.log(res)
    const data = await res.json()
    notes.value = data.info
}

async function postNotes() {


}


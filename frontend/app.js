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
    //Applies the slide class to back button
    backPageBtn.className += 'backPageBtnSlide'
    //Applies the slide class to next button
    nextPageBtn.className += "nextPageBtnSlide"
})

let allNotes = []
let pageNumber = 0

// When next page is clicked
nextPageBtn.addEventListener('click', ()=>{
    let pageNotes = notes.value;
    //Next page
    if (pageNumber < allNotes.length) {
        pageNumber += 1;
        notes.value = allNotes[pageNumber];


        if (pageNumber === allNotes.length)  {
            notes.value = '';
        }
    }
    else if (notes.value ==="") {
        console.log("Cannot go to next page nothing here")
    }
    //If the current page is not blank, add to array and create new empty page
    else if (pageNotes !== '' && pageNotes !== allNotes[pageNumber - 1]) {
        pageNumber += 1;
        allNotes.push(pageNotes);
        notes.value = "";

    }
    console.log(pageNumber);
    console.log(allNotes);

})


// When back page is clicked
backPageBtn.addEventListener('click', ()=>{
    if (pageNumber === 0  ) {
       pageNumber = 0
    }
    else {
        pageNumber -= 1
        notes.value = allNotes[pageNumber];
    }
    console.log(pageNumber);
    console.log(allNotes);
})

function countWords() {
    let count = notes.value.split(" ").length;
    console.log(count)
}

document.addEventListener("keydown", event => {
    // Check if the space bar was pressed
    if (event.code === "Space") {
        // Do something when space bar is clicked
        countWords(allNotes)
    }
});




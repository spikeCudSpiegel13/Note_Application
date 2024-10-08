import { renderNotes } from "./app.js";

let title = document.querySelector(".title");
let note = document.querySelector(".note");
let addNoteButton = document.querySelector(".add-btn");
let noteDisplay = document.querySelector(".notes-display");
let ShowPinnedNotes = document.querySelector(".pinned-notes-container");
let showOtherNotes = document.querySelector(".notes-container");
let pinTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");
let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

if (arrayOfNotes.length > 0){
    pinTitle.classList.toggle("d-none");
    otherTitle.classList.toggle("d-none");
};



noteDisplay.addEventListener("click", (e) => {
    let type = e.target.dataset.type;
    let noteId = e.target.dataset.id;
    
    switch (type) {
        case "del":
            arrayOfNotes = arrayOfNotes.filter((note) => note.id && note.id.toString() !== noteId);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(note => note.isArchived === false && note.isPinned === false));
            ShowPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(note =>note.isPinned === true));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "pinned":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note, isPinned: !note.isPinned} : note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(note => note.isArchived === false && note.isPinned === false));
            ShowPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(note => note.isPinned === true && note.isArchived === false));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "archive":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note, isArchived: !note.isArchived} : note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(note => note.isArchived === false && note.isPinned === false));
            ShowPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(note => note.isPinned === true && note.isArchived === false));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
        
            
    }
})

addNoteButton.addEventListener("click", () => {
    if (note.value.trim().length > 0 || title.value.trim().length > 0){
        arrayOfNotes = [...arrayOfNotes, {id: Date.now(), title: title.value.trim(), note: note.value.trim(), 
        isPinned:false, isArchived: false    
        }];
        console.log({arrayOfNotes});
        
        note.value = title.value = "";
        showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(note => note.isArchived === false && note.isPinned === false));
        localStorage.setItem("notes", JSON.stringify(arrayOfNotes));

    }

    
})

showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(note => !note.isArchived && !note.isPinned));
ShowPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(note => note.isPinned));


import { renderNotes } from "./app.js";

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

let showArchivedNotes = document.querySelector(".archive-notes-container");

showArchivedNotes.addEventListener("click", (e) => {
    let type = e.target.dataset.type;
    let noteId = e.target.dataset.id;
    switch (type) {
        case "del":
            arrayOfNotes = arrayOfNotes.filter(note => note.id && note.id.toString() !== noteId);
            showArchivedNotes = renderNotes(arrayOfNotes.filter(note => note.isArchived === true));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "archive":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note,isArchived: !note.isArchived} : note);
            showArchivedNotes = renderNotes(arrayofNotes.filter(note => note.isArchived === true));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
    }
      
})

showArchivedNotes.innerHTML = renderNotes(arrayOfNotes.filter(note => note.isArchived));
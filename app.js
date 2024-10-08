export const renderNotes = (notes) => {
  let newNote = notes.map((note) => {
    return`
    <div class="single-note">
      <div class="d-flex align-center title-container">
        <span>${note.title}</span>
        <button class="button v-hidden del-btn" data-type = "del" data-id=${note.id}>
          <span class="material-symbols-outlined" data-type = "del" data-id=${note.id}>delete_forever</span>
        </button>
      </div>
      <p>${note.note}</p>
      <div>
        <button class="button btn pinned-btn" data-type = "pinned" data-id=${note.id}>
          <span class=${note.isPinned ? "material-symbols-outlined" : "material-symbols-outlined"}  data-type = "pinned" data-id=${note.id}>${note.isPinned? "keep_public" : "keep"}</span>
        </button>
        <button class="button btn pinned-btn" data-type = "archive" data-id=${note.id}>
          <span class="material-symbols-outlined"  data-type = "archive" data-id=${note.id}>
box
</span>
        </button>
      </div>
    </div>
    `;
  });
  newNote = newNote.join("")
  return newNote;
};



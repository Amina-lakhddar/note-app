// data
const data = [];

// elements
const showFormBtn = document.querySelector("#showFormBtn");
const overlay = document.querySelector(".overlay");
const addNoteForm = document.querySelector(".form");
const addNoteBtn = document.querySelector("#addNoteBtn");
const textarea = document.querySelector("textarea");
const notesContainer = document.querySelector(".notes-container");
const searchInput = document.querySelector(".search_input");

// show form
showFormBtn.addEventListener("click", () => {
  overlay.classList.add("showOverlay");
  addNoteForm.style.bottom = "0%";
});

// hide form
function hideForm() {
  overlay.classList.remove("showOverlay");
  addNoteForm.style.bottom = "-100%";
}
overlay.onclick = hideForm;

// add note
function addNote(text) {
  if (!text.trim()) return false;
  const newNote = {
    text: text,
    status: "pending",
    createdAt: new Date().toLocaleString(),
  };
  data.push(newNote);
  return true;
}

addNoteBtn.addEventListener("click", () => {
  const text = textarea.value;
  const result = addNote(text);
  if (result) {
    afficherNotes(data);
    updateCounters();
    hideForm();
    textarea.value = "";
  }
});

// afficher notes
function afficherNotes(notes) {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteHtml = `<div class="note ${
      note.status === "pending" ? "note-pending" : "note-done"
    }">
          <p>${note.text}</p>
          <button onclick="toggleStatus(${index})"></button>
          <span>${note.createdAt}</span>
        </div>`;
    notesContainer.innerHTML += noteHtml;
  });
}

// toggle status (pending <-> done)
function toggleStatus(index) {
  data[index].status = data[index].status === "pending" ? "done" : "pending";
  afficherNotes(data);
  updateCounters();
}

// update counters
function updateCounters() {
  const all = data.length;
  const done = data.filter((n) => n.status === "done").length;
  const pending = data.filter((n) => n.status === "pending").length;

  document.querySelector(".btn-gray span:first-child").textContent = all;
  document.querySelector(".btn-green span:first-child").textContent = done;
  document.querySelector(".btn-yellow span:first-child").textContent = pending;
}

// search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const filteredNotes = data.filter((note) =>
    note.text.toLowerCase().includes(query)
  );
  afficherNotes(filteredNotes);
});

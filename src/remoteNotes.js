import cuid from 'cuid';

const EMPTY_NOTE = {
  id: '',
  title: '',
  description: '',
  images: [],
};

function updateNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

export function getAll() {
  return JSON.parse(localStorage.getItem('notes') || '[]');
}

export function updateNote(note) {
  let notes = getAll();
  const index = notes.findIndex(otherNote => otherNote.id === note.id);

  if (index > -1) {
    notes.splice(index, 1, note);
  }

  updateNotes(notes);
  return notes;
}

export function addNote(noteWithoutId) {
  const id = cuid();

  const note = {
    ...EMPTY_NOTE,
    ...noteWithoutId,
    id,
  };

  const notes = getAll().concat(note);

  updateNotes(notes);
  return note;
}

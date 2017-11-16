import cuid from 'cuid';

const DEFAULT_ATTRIBUTES = {
  title: '',
  contents: '',
  images: [],
};

const newNote = () => ({
  ...DEFAULT_ATTRIBUTES,
  id: cuid(),
});

function updateNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

export function getAll() {
  return JSON.parse(localStorage.getItem('notes') || '[]')
    .map(note => ({
      ...DEFAULT_ATTRIBUTES,
      ...note,
    }));
}

export function updateNote(note) {
  const notes = getAll()
    .map(otherNote => (
      otherNote.id === note.id
        ? note
        : otherNote
    ));

  updateNotes(notes);

  return notes;
}

export function createNote() {
  const note = newNote();
  const notes = getAll().concat(note);

  updateNotes(notes);

  return notes;
}

export function deleteNote(note) {
  const notes = getAll()
    .filter(otherNote => otherNote.id !== note.id);

  updateNotes(notes);

  return notes;
}

import "./styles/global.scss"
import { useEffect, useState } from "react"
import axios from "axios"
import { Pencil, Trash } from 'lucide-react';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");

  async function getNotes() {
    await axios.get("http://localhost:3000/notes")
      .then(response => {
        setNotes(response.data.notes);
      })
      .catch(error => {
        console.log(error);
      })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editId) {
        await axios.patch(`http://localhost:3000/notes/${editId}`, {
          title, description
        });
        setEditId(null);
      } else {
        await axios.post("http://localhost:3000/notes", {
          title, description
        });
      }

      getNotes();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(id) {
    console.log(id);
    axios.delete(`http://localhost:3000/notes/${id}`)
      .then(response => {
        console.log(response);
        getNotes();
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleEdit(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note._id);
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <main className="main-page">

      <h1>Notes App</h1>

      <form className="create-note-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="input-title" />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description" className="input-description"></textarea>
        <button type="submit" className="submit-btn">
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">
              <h2 className="note-title">{note.title}</h2>
              <p className="note-description">{note.description}</p>
              <button className="delete-btn" onClick={() => handleDelete(note._id)}>
                <Trash size={15} />
              </button>
              <button className="edit-btn" onClick={() => handleEdit(note)}>
                <Pencil size={15} />
              </button>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default App
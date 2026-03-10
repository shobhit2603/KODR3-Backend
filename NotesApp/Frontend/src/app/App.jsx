import "./styles/global.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash, Notebook, Plus, PenSquare } from "lucide-react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");

  async function getNotes() {
    await axios
      .get("http://localhost:3000/notes")
      .then((response) => {
        setNotes(response.data.notes);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editId) {
        await axios.patch(`http://localhost:3000/notes/${editId}`, {
          title,
          description,
        });
        setEditId(null);
      } else {
        await axios.post("http://localhost:3000/notes", {
          title,
          description,
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
    axios
      .delete(`http://localhost:3000/notes/${id}`)
      .then((response) => {
        console.log(response);
        getNotes();
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <Notebook size={28} className="brand-icon" />
          <h1>Notes App</h1>
        </div>

        <form className="create-note-form" onSubmit={handleSubmit}>
          <h2>{editId ? "Update Note" : "Create New Note"}</h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Note title..."
            className="input-title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your note description here..."
            className="input-description"
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            {editId ? (
              <>
                <PenSquare size={18} /> Update Note
              </>
            ) : (
              <>
                <Plus size={18} /> Add Note
              </>
            )}
          </button>
        </form>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <h2>Your Notes</h2>
          <div className="notes-count">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </div>
        </header>

        <div className="notes-grid">
          {notes.length === 0 ? (
            <div className="empty-state">
              <Notebook size={48} className="empty-icon" />
              <p>No notes yet. Create your first note from the sidebar!</p>
            </div>
          ) : (
            notes.map((note) => {
              return (
                <div key={note._id} className="note-card">
                  <div className="note-header">
                    <h3 className="note-title">{note.title}</h3>
                    <div className="note-actions">
                      <button
                        className="icon-btn edit-btn"
                        onClick={() => handleEdit(note)}
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="icon-btn delete-btn"
                        onClick={() => handleDelete(note._id)}
                        title="Delete"
                      >
                        <Trash size={15} />
                      </button>
                    </div>
                  </div>
                  <p className="note-description">{note.description}</p>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

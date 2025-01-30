import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Notes = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState({
    Mathematics: [],
    Physics: [],
    Chemistry: [],
  });
  const [uploading, setUploading] = useState(false);
  const [subject, setSubject] = useState("Mathematics");
  const params = useParams();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/notes/${params.id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      // Group notes by subject
      const groupedNotes = {
        Mathematics: [],
        Physics: [],
        Chemistry: [],
      };

      response.data.forEach((note) => {
        if (note.subject === "Mathematics") {
          groupedNotes.Mathematics.push(note);
        } else if (note.subject === "Physics") {
          groupedNotes.Physics.push(note);
        } else if (note.subject === "Chemistry") {
          groupedNotes.Chemistry.push(note);
        }
      });

      setNotes(groupedNotes); // Update state with grouped notes
    } catch (error) {
      console.error("Error fetching notes:", error);
      alert("Failed to fetch notes!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("course", params.id);
    formData.append("subject", subject); // Include the selected subject

    try {
      setUploading(true);
      const response = await axios.post(
        `http://localhost:5000/api/notes/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );

      alert("Note uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      fetchNotes(); // Refresh notes after upload
    } catch (error) {
      console.error("Error uploading note:", error);
      alert("Failed to upload note!");
    } finally {
      setUploading(false);
    }
  };

  const deleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/delete/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        alert("Note deleted successfully!");
        fetchNotes(); // Refresh notes after deletion
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("Failed to delete note!");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [params.id]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      {user && user.role === "admin" && (
        <div style={{ marginBottom: "30px" }}>
          <h1>Upload a Note</h1>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  padding: "10px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{
                  padding: "10px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>File:</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <div>
              <label>Subject:</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  padding: "10px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={uploading}
              style={{
                padding: "10px",
                width: "100px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {uploading ? "Uploading..." : "Upload Note"}
            </button>
          </form>
        </div>
      )}

      <h2>Uploaded Notes</h2>
      {["Mathematics", "Physics", "Chemistry"].map((subject) => (
        <div key={subject} style={{ marginBottom: "30px" }}>
          <h3>{subject}</h3>
          <ul>
            {notes[subject]?.length > 0 ? (
              notes[subject].map((note) => (
                <li
                  key={note._id}
                  style={{
                    marginBottom: "20px",
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  <strong>{note.title}</strong>: {note.description} <br />
                  <a
                    href={`http://localhost:5000/${note.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#007BFF",
                      textDecoration: "none",
                      marginRight: "10px",
                    }}
                  >
                    View PDF
                  </a>
                  {user && user.role === "admin" && (
                    <button
                      onClick={() => deleteNote(note._id)}
                      style={{
                        backgroundColor: "#ff4d4d",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))
            ) : (
              <h8>No notes available.</h8>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Notes;

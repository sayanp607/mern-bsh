import React, { useState, useEffect } from "react";
import axios from "axios";

const LiveClass = ({ user }) => {
  const [link, setLink] = useState("");
  const [liveClasses, setLiveClasses] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch live classes
  const fetchLiveClasses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/liveclasses/",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setLiveClasses(response.data);
    } catch (error) {
      console.error("Error fetching live classes:", error);
      alert("Failed to fetch live classes!");
    }
  };

  // Add a new live class link
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!link) {
      alert("Please enter a Google Meet link!");
      return;
    }
    try {
      setUploading(true);
      await axios.post(
        "http://localhost:5000/api/liveclasses/create",
        { link },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      alert("Live class link added successfully!");
      setLink("");
      fetchLiveClasses();
    } catch (error) {
      console.error("Error adding live class link:", error);
      alert("Failed to add live class link!");
    } finally {
      setUploading(false);
    }
  };

  // Delete a live class link
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/liveclasses/delete/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      alert("Live class link deleted successfully!");
      fetchLiveClasses();
    } catch (error) {
      console.error("Error deleting live class link:", error);
      alert("Failed to delete live class link!");
    }
  };

  useEffect(() => {
    fetchLiveClasses();
  }, []);

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
          <h1>Add a Google Meet Link</h1>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div>
              <label>Google Meet Link:</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                style={{
                  padding: "10px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              style={{
                padding: "10px",
                width: "120px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {uploading ? "Adding..." : "Add Link"}
            </button>
          </form>
        </div>
      )}

      <h2>Upcoming Live Classes</h2>
      <ul>
        {liveClasses.length > 0 ? (
          liveClasses.map((liveClass) => (
            <li key={liveClass._id} style={{ marginBottom: "20px" }}>
              <a
                href={liveClass.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#007BFF",
                  textDecoration: "none",
                  fontSize: "18px",
                }}
              >
                Join Live Class
              </a>
              {user && user.role === "admin" && (
                <button
                  onClick={() => handleDelete(liveClass._id)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              )}
            </li>
          ))
        ) : (
          <p>No live classes available.</p>
        )}
      </ul>
    </div>
  );
};

export default LiveClass;

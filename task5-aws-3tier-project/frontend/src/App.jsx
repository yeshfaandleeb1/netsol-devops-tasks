import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);

  // Load all messages
  const loadEntries = async () => {
    try {
      const res = await fetch("/api/entries");
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  // Run once when page loads
  useEffect(() => {
    loadEntries();
  }, []);

  // Insert message
  const insertData = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      await fetch("/api/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      setMessage("");
      loadEntries();
    } catch (error) {
      console.error("Error inserting message:", error);
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1 className="title">🚀 DevOps Assessment</h1>

        <p className="subtitle">
          Store Messages using React, Flask & PostgreSQL
        </p>

        <div className="form">

          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={insertData}>
            Insert Message
          </button>

        </div>

        <div className="stats">

          <h2>📋 Recent Messages</h2>

          <span className="badge">
            Total : {entries.length}
          </span>

        </div>

        <div className="message-list">

          {entries.length === 0 ? (

            <div className="empty">

              <h3>📭 No Messages Found</h3>

              <p>Insert your first message.</p>

            </div>

          ) : (

            entries.map((item) => (

              <div className="message-card" key={item.id}>

                <div className="message">

                  💬 {item.message}

                </div>

                <div className="time">

                  🕒 {item.created_at}

                </div>

              </div>

            ))

          )}

        </div>

        <div className="footer">

          Developed with ❤️ using React + Flask + PostgreSQL

        </div>

      </div>

    </div>
  );
}

export default App;

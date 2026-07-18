from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2
import os

# --------------------------------------------------
# Load Environment Variables
# --------------------------------------------------
load_dotenv()

# --------------------------------------------------
# Flask App
# --------------------------------------------------
app = Flask(__name__)
CORS(app)

# --------------------------------------------------
# PostgreSQL Connection
# --------------------------------------------------
conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)

# --------------------------------------------------
# Home Route
# --------------------------------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "success",
        "message": "Flask Backend is Running 🚀"
    })


# --------------------------------------------------
# Insert Message API
# --------------------------------------------------
@app.route("/insert", methods=["POST"])
def insert():

    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({
            "status": "error",
            "message": "Message is required"
        }), 400

    message = data["message"].strip()

    if message == "":
        return jsonify({
            "status": "error",
            "message": "Message cannot be empty"
        }), 400

    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO entries(message)
        VALUES(%s)
        """,
        (message,)
    )

    conn.commit()

    cur.close()

    return jsonify({
        "status": "success",
        "message": "Message Inserted Successfully"
    })


# --------------------------------------------------
# Get All Messages API
# --------------------------------------------------
@app.route("/entries", methods=["GET"])
def get_entries():

    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            message,
            created_at
        FROM entries
        ORDER BY created_at DESC;
    """)

    rows = cur.fetchall()

    messages = []

    for row in rows:

        messages.append({
            "id": row[0],
            "message": row[1],
            "created_at": row[2].strftime("%d-%b-%Y %I:%M %p")
        })

    cur.close()

    return jsonify(messages)


# --------------------------------------------------
# Run Flask App
# --------------------------------------------------
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )

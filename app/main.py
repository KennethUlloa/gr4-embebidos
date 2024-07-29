from flask import Flask, render_template, request
from flask_socketio import SocketIO
from datetime import datetime

app = Flask(__name__)
socket = SocketIO(app)

events_db = []


@socket.on("connect")
def handle_connect():
    print("Client connected")


@app.post("/events")
def add_event():
    event = {
        "name": request.user_agent.string,
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "ip": request.remote_addr,
    }
    events_db.append(event)
    socket.emit("new_event", event)
    return {"message": "Event added successfully"}


@app.get("/events")
def events():
    return events_db


@app.get("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    socket.run(app, debug=True, host="0.0.0.0", port=5000)

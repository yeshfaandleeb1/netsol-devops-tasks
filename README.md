# Task 1: Python (Flask) on Apache

Flask application deployed on Apache using mod_wsgi.

## Setup
- Port: 8081
- Server: Apache2 with mod_wsgi
- Python venv used for isolated dependencies

## Files
- `app.py` — Flask application
- `wsgi.py` — WSGI entry point for Apache
- `pythonapp.conf` — Apache VirtualHost configuration
- `requirements.txt` — Python dependencies

## Run locally
pip install -r requirements.txt
python app.py

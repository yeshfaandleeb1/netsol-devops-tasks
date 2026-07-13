# Task 2: Node.js (Express) on Nginx

Express application deployed behind Nginx as a reverse proxy.

## Setup
- Node.js app runs on: 127.0.0.1:3000 (internal only)
- Nginx public port: 8082
- Nginx forwards requests from 8082 to the internal Node app

## Files
- `index.js` — Express application
- `package.json` — Node dependencies
- `nodeapp` — Nginx reverse proxy configuration

## Run locally
npm install
node index.js

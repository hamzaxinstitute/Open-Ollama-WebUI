@echo off

REM Quick start script for Open Ollama WebUI
REM This script starts the application with minimal setup

echo 🚀 Starting Open Ollama WebUI...

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

echo 🌐 Starting server at http://localhost:5173
echo 💡 Make sure Ollama is running: ollama serve
echo.

npm run dev

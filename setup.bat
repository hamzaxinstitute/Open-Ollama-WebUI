@echo off
setlocal enabledelayedexpansion

REM Open Ollama WebUI - One-Command Setup Script for Windows
REM This script sets up and runs the Open Ollama WebUI with a single command

echo.
echo 🚀 Welcome to Open Ollama WebUI Setup!
echo ======================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo Recommended version: Node.js 18 or higher
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [SUCCESS] Node.js found: %NODE_VERSION%

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed!
    echo Please install npm (usually comes with Node.js)
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [SUCCESS] npm found: %NPM_VERSION%

REM Check if Ollama is installed
ollama --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Ollama is not installed!
    echo To use this WebUI, you need to install Ollama first:
    echo Visit: https://ollama.ai/download
    echo.
    echo After installing Ollama, you can:
    echo 1. Run: ollama serve
    echo 2. Download a model: ollama pull llama3.2
    echo 3. Then refresh this WebUI
    echo.
) else (
    for /f "tokens=*" %%i in ('ollama --version') do set OLLAMA_VERSION=%%i
    echo [SUCCESS] Ollama found: %OLLAMA_VERSION%
)

echo.
echo [INFO] Setting up Open Ollama WebUI...

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed successfully!
) else (
    echo [SUCCESS] Dependencies already installed!
)

echo.
echo [INFO] Starting Open Ollama WebUI...
echo.
echo 🌐 Open Ollama WebUI will be available at:
echo    http://localhost:5173
echo.
echo 📖 Features:
echo    • Beautiful chat interface
echo    • Model management
echo    • Settings panel
echo    • Dark/Light mode
echo    • GitHub integration
echo.
echo 💡 Tips:
echo    • Press Ctrl+C to stop the server
echo    • Make sure Ollama is running: ollama serve
echo    • Download models: ollama pull llama3.2
echo.
echo ======================================
echo [SUCCESS] Starting server...

npm run dev

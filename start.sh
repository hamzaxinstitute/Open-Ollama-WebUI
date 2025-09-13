#!/bin/bash

# Quick start script for Open Ollama WebUI
# This script starts the application with minimal setup

echo "🚀 Starting Open Ollama WebUI..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🌐 Starting server at http://localhost:5173"
echo "💡 Make sure Ollama is running: ollama serve"
echo ""

npm run dev

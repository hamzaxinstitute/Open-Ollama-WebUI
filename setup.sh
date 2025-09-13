#!/bin/bash

# Open Ollama WebUI - One-Command Setup Script
# This script sets up and runs the Open Ollama WebUI with a single command

set -e

echo "🚀 Welcome to Open Ollama WebUI Setup!"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed!"
        echo "Please install Node.js from https://nodejs.org/"
        echo "Recommended version: Node.js 18 or higher"
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_success "Node.js found: $NODE_VERSION"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed!"
        echo "Please install npm (usually comes with Node.js)"
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    print_success "npm found: $NPM_VERSION"
}

# Check if Ollama is installed
check_ollama() {
    if ! command -v ollama &> /dev/null; then
        print_warning "Ollama is not installed!"
        echo "To use this WebUI, you need to install Ollama first:"
        echo "Visit: https://ollama.ai/download"
        echo ""
        echo "After installing Ollama, you can:"
        echo "1. Run: ollama serve"
        echo "2. Download a model: ollama pull llama3.2"
        echo "3. Then refresh this WebUI"
        echo ""
    else
        OLLAMA_VERSION=$(ollama --version)
        print_success "Ollama found: $OLLAMA_VERSION"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully!"
}

# Start the development server
start_server() {
    print_status "Starting Open Ollama WebUI..."
    echo ""
    echo "🌐 Open Ollama WebUI will be available at:"
    echo "   http://localhost:5173"
    echo ""
    echo "📖 Features:"
    echo "   • Beautiful chat interface"
    echo "   • Model management"
    echo "   • Settings panel"
    echo "   • Dark/Light mode"
    echo "   • GitHub integration"
    echo ""
    echo "💡 Tips:"
    echo "   • Press Ctrl+C to stop the server"
    echo "   • Make sure Ollama is running: ollama serve"
    echo "   • Download models: ollama pull llama3.2"
    echo ""
    print_success "Starting server..."
    echo "======================================"
    
    npm run dev
}

# Main setup function
main() {
    echo "Checking prerequisites..."
    check_node
    check_npm
    check_ollama
    
    echo ""
    print_status "Setting up Open Ollama WebUI..."
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        install_dependencies
    else
        print_success "Dependencies already installed!"
    fi
    
    echo ""
    start_server
}

# Run main function
main "$@"

# 🚀 Quick Installation Guide

## One-Command Installation

### Option 1: Direct Download & Run (Recommended)

#### For macOS/Linux:
```bash
curl -fsSL https://raw.githubusercontent.com/hamzaxinstitute/Open-Ollama-WebUI/main/setup.sh | bash
```

#### For Windows:
```cmd
# Download and run the setup script
git clone https://github.com/hamzaxinstitute/Open-Ollama-WebUI.git
cd Open-Ollama-WebUI
setup.bat
```

### Option 2: Clone & Run

```bash
# Clone the repository
git clone https://github.com/hamzaxinstitute/Open-Ollama-WebUI.git
cd Open-Ollama-WebUI

# Run setup script
./setup.sh        # macOS/Linux
# or
setup.bat         # Windows
```

### Option 3: Manual Installation

```bash
# Clone the repository
git clone https://github.com/hamzaxinstitute/Open-Ollama-WebUI.git
cd Open-Ollama-WebUI

# Install dependencies
npm install

# Start the application
npm run dev
```

## Prerequisites

Before running, make sure you have:

- ✅ **Node.js 18+** - [Download here](https://nodejs.org/)
- ✅ **Ollama** - [Download here](https://ollama.ai/download)

## First Run

1. **Start Ollama**:
   ```bash
   ollama serve
   ```

2. **Download a Model** (optional):
   ```bash
   ollama pull llama3.2
   ```

3. **Open WebUI**: Navigate to `http://localhost:5173`

## Troubleshooting

### Node.js Not Found
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation

### Ollama Not Found
- Install Ollama from [ollama.ai](https://ollama.ai/download)
- Make sure Ollama is in your PATH

### Port 5173 Already in Use
- Stop other development servers
- Or change the port in `package.json`

### Permission Denied (macOS/Linux)
- Make script executable: `chmod +x setup.sh`

## Need Help?

- 📖 Check the [README.md](README.md) for detailed documentation
- 🐛 Report issues on [GitHub Issues](https://github.com/hamzaxinstitute/Open-Ollama-WebUI/issues)
- ⭐ Star the repository if you find it useful!

---

**That's it! You're ready to use Open Ollama WebUI! 🎉**

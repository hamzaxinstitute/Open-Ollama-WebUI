# Open Ollama WebUI

A beautiful, modern, and feature-rich web interface for Ollama CLI. Chat with your AI models through an intuitive and responsive web interface.

![Open Ollama WebUI](https://img.shields.io/badge/Open%20Ollama-WebUI-blue?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)

## 🚀 Support us on Product Hunt

<a href="https://www.producthunt.com/products/open-ollama-webui?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-open&#0045;ollama&#0045;webui" target="_blank">
  <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1015896&theme=light&t=1757824649764" 
       alt="Open-ollama-webui - Open-Ollama-WebUI makes running and exploring local AI models | Product Hunt" 
       style="width: 250px; height: 54px;" 
       width="250" height="54" />
</a>



## ✨ Features

- 🎨 **Beautiful Interface** - Clean, modern design with dark/light mode
- 💬 **Chat Popup** - Popup chat interface for each model
- 🤖 **Model Management** - Add, delete, and manage Ollama models
- ⚙️ **Dynamic Settings** - Configurable temperature, max tokens, system prompt
- 🌐 **Dynamic Endpoint** - Change Ollama server URL easily
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- ⭐ **GitHub Integration** - Easy access to repository and starring
- 🚀 **One-Command Setup** - Get started with a single command

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Ollama** - [Download here](https://ollama.ai/download)

### One-Command Setup

#### For macOS/Linux:
```bash
curl -fsSL https://raw.githubusercontent.com/hamzaxinstitute/Open-Ollama-WebUI/main/setup.sh | bash
```

Or clone and run:
```bash
git clone https://github.com/hamzaxinstitute/Open-Ollama-WebUI.git
cd Open-Ollama-WebUI
chmod +x setup.sh && ./setup.sh
```

#### For Windows:
```cmd
git clone https://github.com/hamzaxinstitute/Open-Ollama-WebUI.git
cd Open-Ollama-WebUI
setup.bat
```

### Manual Setup

If you prefer manual setup:

```bash
# Clone the repository
git clone https://github.com/hamzaxinstitute/Open-Ollama-WebUI.git
cd Open-Ollama-WebUI

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🎯 Usage

1. **Start Ollama**: Make sure Ollama is running
   ```bash
   ollama serve
   ```

2. **Download a Model** (optional):
   ```bash
   ollama pull llama3.2
   # or
   ollama pull tinyllama
   ```

3. **Open WebUI**: Navigate to `http://localhost:5173`

4. **Start Chatting**: Click "Start Chatting" on any model card

## 🖼️ Screenshots

### Home Page
- Beautiful model cards with chat buttons
- Easy model management
- Settings and GitHub integration

### Chat Interface
- Popup chat windows
- Real-time streaming responses
- Markdown support
- Message history

### Settings Panel
- Dynamic Ollama endpoint configuration
- Temperature and token settings
- System prompt customization

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

```
src/
├── components/          # React components
│   ├── ChatPopup.tsx    # Chat popup interface
│   ├── HomePage.tsx     # Main home page
│   ├── Header.tsx       # Application header
│   ├── GitHubButton.tsx # GitHub integration
│   └── ...
├── services/            # API services
│   └── ollamaService.ts # Ollama API integration
└── App.tsx             # Main application
```

## ⚙️ Configuration

### Ollama Endpoint

You can change the Ollama server endpoint in two ways:

1. **Settings Panel**: Click the settings icon and modify the endpoint
2. **Header Input**: Change directly in the header (desktop view)

Supported formats:
- `http://localhost:11434` (default)
- `http://192.168.1.100:11434` (remote server)
- `https://your-ollama-server.com:11434` (HTTPS)

### Settings

Access settings by clicking the ⚙️ icon:

- **Temperature**: Controls response creativity (0.0 - 2.0)
- **Max Tokens**: Maximum response length
- **System Prompt**: Customize AI personality

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Star the Repository** ⭐ - Show your support
2. **Report Issues** 🐛 - Found a bug? Let us know
3. **Suggest Features** 💡 - Have an idea? Open an issue
4. **Submit Pull Requests** 🔄 - Help improve the code

### Development Setup

```bash
git clone https://github.com/hamzaxinstitute/Open-Ollama-WebUI.git
cd Open-Ollama-WebUI
npm install
npm run dev
```

## 📋 Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Ollama**: Latest version
- **Modern Browser**: Chrome, Firefox, Safari, Edge

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to Ollama server"**
- Make sure Ollama is running: `ollama serve`
- Check if the endpoint URL is correct
- Verify Ollama is accessible at the specified URL

**"No models available"**
- Download a model: `ollama pull llama3.2`
- Check if models are installed: `ollama list`
- Refresh the WebUI

**Port 5173 already in use**
- Stop other development servers
- Or change the port in `package.json`

### Getting Help

- 📖 Check the [Issues](https://github.com/hamzaxinstitute/Open-Ollama-WebUI/issues) page
- 💬 Join discussions in [GitHub Discussions](https://github.com/hamzaxinstitute/Open-Ollama-WebUI/discussions)
- ⭐ Star the repository if you find it useful!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai/) - For the amazing local LLM server
- [React](https://reactjs.org/) - For the powerful UI framework
- [Tailwind CSS](https://tailwindcss.com/) - For the beautiful styling
- [Vite](https://vitejs.dev/) - For the fast development experience

---

<div align="center">

**Made with ❤️ by the Open Ollama WebUI Team**

[⭐ Star us on GitHub](https://github.com/hamzaxinstitute/Open-Ollama-WebUI) | [🐛 Report Issues](https://github.com/hamzaxinstitute/Open-Ollama-WebUI/issues) | [💡 Request Features](https://github.com/hamzaxinstitute/Open-Ollama-WebUI/discussions)

</div>

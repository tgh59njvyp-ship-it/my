# ⚡ Superserver Creator

AI-powered JavaScript code generator for Superserver. Describe the server you want, and AI generates the code for you!

## Features

- 🤖 **AI-Powered Code Generation** - Uses Gemini API to generate clean JavaScript code
- 🚀 **Superserver Integration** - Generate code ready for Superserver deployment
- 🎨 **Modern UI** - Clean and intuitive interface
- ⚡ **Fast & Easy** - Get your custom server URL in seconds
- 🔐 **No Login Required** - Works without authentication

## Getting Started

### Prerequisites

- Node.js 16+ 
- Gemini API Key (get one at [aistudio.google.com](https://aistudio.google.com/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tgh59njvyp-ship-it/my.git
cd my
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Describe** - Write what kind of server/API you want to create
2. **Generate** - Click "Generate Code" to create JavaScript code
3. **Copy** - Copy the generated code
4. **Deploy** - Go to [Superserver.io](https://superserver.io) and paste the code
5. **Share** - Get your custom public URL instantly!

## Example Prompts

- "Create a REST API that returns a list of todos with GET and POST endpoints"
- "Build a webhook handler that logs incoming requests and returns a 200 status"
- "Make an API that generates random quotes"
- "Create an endpoint that accepts a JSON body and echoes it back"

## Technology Stack

- **Next.js** - React framework
- **Gemini API** - AI code generation
- **Superserver** - Serverless code deployment
- **CSS Modules** - Styling

## Deployment

This app is designed to run on Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Add `GEMINI_API_KEY` to environment variables
4. Deploy!

## Environment Variables

```
GEMINI_API_KEY=your_api_key_here
```

## License

MIT

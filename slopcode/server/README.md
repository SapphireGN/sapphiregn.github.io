Local HuggingFace proxy

This small proxy forwards POST requests to the HuggingFace Inference API and attaches the server-side API key. Use it to avoid CORS errors when calling the HF inference API from browser-based demos.

Setup

1. From this folder install deps:

```bash
cd slopcode/server
npm install
```

2. Start the proxy with your HF key:

```bash
export HUGGINGFACE_API_KEY=hf_...yourkey...
npm start
```

The server listens on port 3000 by default. In the editor UI check "Use local proxy" and the app will POST to `/proxy/models/<model>` on the same host (e.g. http://localhost:3000/proxy/models/...).

Security

- Never commit your HF key. Keep it in environment variables on the machine running the proxy.
- This proxy is intentionally minimal for local development only.

#!/usr/bin/env node
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));

const HF_KEY = process.env.HUGGINGFACE_API_KEY;
if(!HF_KEY){
  console.warn('Warning: HUGGINGFACE_API_KEY not set. Proxy will return 401 until set.');
}

const PORT = process.env.PORT || 3000;

app.post('/proxy/models/:model', async (req, res) => {
  try{
    const model = req.params.model;
    const url = `https://api-inference.huggingface.co/models/${model}`;
    const body = req.body || {};

    if(!HF_KEY){
      return res.status(401).json({ error: 'Server missing HUGGINGFACE_API_KEY env var' });
    }

    const hfRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + HF_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const contentType = hfRes.headers.get('content-type') || '';
    const text = await hfRes.text();
    // Forward status and body
    if(contentType.includes('application/json')){
      try{ return res.status(hfRes.status).json(JSON.parse(text)); }catch(e){}
    }
    res.status(hfRes.status).type('text').send(text);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, ()=> console.log(`HF proxy listening on http://localhost:${PORT}`));

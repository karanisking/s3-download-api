// server.js
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/api/download', async (req, res) => {
  try {
    const { s3Url } = req.body;
    const response = await axios.get(s3Url, { responseType: 'stream' });
    response.data.pipe(res); // Stream file to client
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// For Deno Deploy compatibility, export the app
module.exports = app;

// Local testing (optional)
if (require.main === module) {
  app.listen(3000, () => console.log('Local: http://localhost:3000'));
}
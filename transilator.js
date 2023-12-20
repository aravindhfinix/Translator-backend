// server.js

const express = require('express');
const translate = require('translate-google');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())

app.use(express.json());

app.post('/translate', async (req, res) => {
  try {
    const { text, sourceLanguage, targetLanguage } = req.body;

    // Perform translation
    translate(text, { from: sourceLanguage, to: targetLanguage })
      .then((translatedText) => {
        console.log(`Original Text (${sourceLanguage}): ${text}`);
        console.log(`Translated Text (${targetLanguage}): ${translatedText}`);
        res.json({ translatedText });
      })
      .catch((err) => {
        console.error('Error occurred during translation:', err);
        res.status(500).json({ error: 'Translation failed' });
      });
  } catch (error) {
    console.error('Translation Error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

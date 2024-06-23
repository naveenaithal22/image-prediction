const express = require('express');
const multer = require('multer');
var cors = require('cors')
const vision = require('@google-cloud/vision');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });

app.use(cors())
// Creates a client
const client = new vision.ImageAnnotatorClient();

// Endpoint to upload an image
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path;
    // Performs label detection on the image file
    const [result] = await client.labelDetection(filePath);

    res.json({
      success: true,
    response:result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

router.get(('/:filename', async (req, res) => {
    // Our code for the GET /files/:filename route goes here
  }));
  
  router.post('/', async (req, res) => {
    // Our code for the POST /files route goes here
  });
  
  // ... more file routes ...
  
  module.exports = router;
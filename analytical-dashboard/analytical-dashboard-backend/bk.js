const express = require('express');
const Dashboard = require('../models/Dashboard');

const router = express.Router();

// GET /api/dashboard
router.get('/', async (req, res) => {
  try {
    const data = await Dashboard.find(); // Fetch all documents from the collection
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

module.exports = router;

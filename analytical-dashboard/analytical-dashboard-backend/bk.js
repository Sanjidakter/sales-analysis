const express = require('express');
const Dashboard = require('../models/Dashboard');

const router = express.Router();

// GET /api/dashboard
router.get('/', async (req, res) => {
  try {
    // Extract query parameters
    const { Division, Gender, MaritalStatus, AgeMin, AgeMax } = req.query;

    // Build the query object dynamically
    const query = {};
    if (Division) query.Division = Division;
    if (Gender) query.Gender = Gender;
    if (MaritalStatus) query.MaritalStatus = MaritalStatus;
    if (AgeMin || AgeMax) {
      query.Age = {};
      if (AgeMin) query.Age.$gte = parseInt(AgeMin, 10); // Minimum age
      if (AgeMax) query.Age.$lte = parseInt(AgeMax, 10); // Maximum age
    }

    // Fetch data based on query
    const data = await Dashboard.find(query);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

module.exports = router;

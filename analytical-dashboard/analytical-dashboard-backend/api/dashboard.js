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
// GET /api/dashboard/average-income
router.get('/average-income', async (req, res) => {
  try {
    const averages = await Dashboard.aggregate([
      {
        $group: {
          _id: "$MaritalStatus", // Group by MaritalStatus
          averageIncome: { $avg: "$Income" }, // Calculate average income
        },
      },
    ]);

    res.status(200).json(averages);
  } catch (err) {
    res.status(500).json({ message: 'Error calculating averages', error: err.message });
  }
});

// GET /api/dashboard/average-age
router.get('/average-age', async (req, res) => {
  try {
    const averages = await Dashboard.aggregate([
      {
        $group: {
          _id: null, // Group all documents together
          averageAge: { $avg: "$Age" }, // Calculate the average age
        },
      },
    ]);

    // Extract the average age value or handle empty result
    const averageAge = averages.length > 0 ? averages[0].averageAge : null;

    res.status(200).json({ averageAge });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating average age', error: err.message });
  }
});

module.exports = router;

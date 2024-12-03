const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({}, { strict: false }); // No schema restrictions
const Dashboard = mongoose.model('Dashboard', DashboardSchema, 'dashboard'); // 'dashboard' is the collection name

module.exports = Dashboard;

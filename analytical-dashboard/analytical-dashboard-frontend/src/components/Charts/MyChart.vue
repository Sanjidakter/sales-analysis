<template>
  <div>
    <!-- Dropdown for city selection -->
    <select v-model="selectedCity" @change="fetchDataAndUpdateChart">
      <option value="">All Cities</option>
      <option value="Dhaka">Dhaka</option>
      <option value="Chattogram">Chattogram</option>
      <option value="Rajshahi">Rajshahi</option>
      <option value="Khulna">Khulna</option>
      <option value="Sylhet">Sylhet</option>
      <option value="Barishal">Barishal</option>
      <option value="Mymensingh">Mymensingh</option>
    </select>

    <!-- Chart -->
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

export default {
  name: "AreaChart",
  data() {
    return {
      chartInstance: null, // Holds the Chart.js instance
      selectedCity: "", // Selected city (initially empty for "All Cities")
    };
  },
  mounted() {
    this.fetchDataAndCreateChart();
  },
  beforeUnmount() {
    // Ensure chart instance is destroyed when the component is unmounted
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  },
  methods: {
    async fetchDataAndCreateChart() {
      try {
        // Build the API URL based on the selected city
        const apiUrl = this.selectedCity
          ? `https://analytical-dashboard-backend-rosy.vercel.app/api/dashboard?Division=${this.selectedCity}`
          : "https://analytical-dashboard-backend-rosy.vercel.app/api/dashboard";

        console.log("Fetching data from:", apiUrl);

        // Fetch data from the API
        const response = await fetch(apiUrl);
        const rawData = await response.json();

        console.log("Fetched Data:", rawData);

        // Extract Age and Income
        const labels = rawData.map((item) => item.Age); // X-axis (Age)
        const dataPoints = rawData.map((item) => item.Income); // Y-axis (Income)

        console.log("Labels:", labels);
        console.log("Data Points:", dataPoints);

        // Destroy the existing chart instance if it exists
        if (this.chartInstance) {
          console.log("Destroying old chart instance");
          this.chartInstance.destroy();
          this.chartInstance = null; // Ensure no lingering reference
        }

        // Get the canvas context
        const canvas = this.$refs.chartCanvas; // Access the canvas via `ref`
        const ctx = canvas.getContext("2d");

        // Create a new chart
        this.chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Income by Age",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: dataPoints,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                displayColors: false,
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || "";
                    const value = context.raw;
                    return `${label}: $${value.toLocaleString()}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Age",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Income ($)",
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data or updating chart:", error);
      }
    },
    async fetchDataAndUpdateChart() {
      console.log("Selected City:", this.selectedCity);
      await this.fetchDataAndCreateChart();
    },
  },
};
</script>

<style>
/* Add custom styles if needed */
select {
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

canvas {
  max-width: 100%;
  max-height: 400px;
  display: block;
}
</style>

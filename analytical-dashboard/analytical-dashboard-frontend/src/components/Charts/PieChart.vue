<template>
  <div>
    <canvas id="myPieChart"></canvas>
  </div>
</template>

<script>
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default {
  name: "PieChart",
  data() {
    return {
      chartInstance: null, // Holds the Chart.js instance
    };
  },
  mounted() {
    this.fetchDataAndCreatePieChart();
  },
  methods: {
    async fetchDataAndCreatePieChart() {
      try {
        // Fetch data from the API
        const apiUrl = "https://analytical-dashboard-backend-rosy.vercel.app/api/dashboard?Gender=F";
        console.log("Fetching data from:", apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const femaleData = await response.json();
        console.log("Fetched Female Data:", femaleData);

        // Calculate counts
        const totalEntries = 50; // Total number of entries
        const femaleCount = femaleData.length;
        const maleCount = totalEntries - femaleCount;

        const labels = ["Male", "Female"];
        const values = [maleCount, femaleCount];
        console.log("Labels:", labels);
        console.log("Data Points:", values);

        // Destroy existing chart instance to update dynamically
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }

        // Create the pie chart
        const ctx = document.getElementById("myPieChart").getContext("2d");
        this.chartInstance = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: ["#4e73df", "#1cc88a"], // Male: Blue, Female: Green
                hoverBackgroundColor: ["#2e59d9", "#17a673"],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                backgroundColor: "rgb(0,0,0,0.8)",
                bodyFont: {
                  color: "#858796",
                },
                borderColor: "#dddfeb",
                borderWidth: 1,
                padding: 15,
                displayColors: false,
                caretPadding: 10,
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
            cutout: "80%", // Makes it a doughnut chart
          },
        });
      } catch (error) {
        console.error("Error fetching or rendering pie chart data:", error);
      }
    },
  },
};
</script>

<style>
/* Ensure the chart is responsive and visible */
#myPieChart {
  max-width: 400px;
  max-height: 400px;
  width: 100%;
  height: auto;
}
</style>

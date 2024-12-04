<template>
    <div>
      <canvas id="maritalStatusPieChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
  
  Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
  
  export default {
    name: "MaritalStatusPieChart",
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
          const apiUrl =
            "https://analytical-dashboard-backend-rosy.vercel.app/api/dashboard?MaritalStatus=Married";
          console.log("Fetching data from:", apiUrl);
          const response = await fetch(apiUrl);
  
          if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
          }
  
          const marriedData = await response.json();
          console.log("Fetched Married Data:", marriedData);
  
          // Calculate counts
          const totalEntries = 50; // Total number of entries
          const marriedCount = marriedData.length;
          const singleCount = totalEntries - marriedCount;
  
          const labels = ["Single", "Married"];
          const values = [singleCount, marriedCount];
          console.log("Labels:", labels);
          console.log("Data Points:", values);
  
          // Destroy existing chart instance to update dynamically
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }
  
          // Create the pie chart
          const ctx = document
            .getElementById("maritalStatusPieChart")
            .getContext("2d");
          this.chartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: labels,
              datasets: [
                {
                  data: values,
                  backgroundColor: ["#ff6384", "#36a2eb"], // Single: Red, Married: Blue
                  hoverBackgroundColor: ["#ff4d67", "#258bd6"],
                  hoverBorderColor: "rgba(234, 236, 244, 1)",
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  backgroundColor: "rgba(0,0,0,0.8)",
                  bodyFont: {
                    color: "#ffffff",
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
  #maritalStatusPieChart {
    max-width: 400px;
    max-height: 400px;
    width: 100%;
    height: auto;
  }
  </style>
  
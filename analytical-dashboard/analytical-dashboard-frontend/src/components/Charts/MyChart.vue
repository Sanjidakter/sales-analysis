<template>
  <div>
    <!-- Dropdown for city selection -->
    <select v-model="selectedCity" @change="fetchDataAndUpdateChart">
      <option value="">All Cities</option>
      <option value="Dhaka">Dhaka</option>
      <option value="Rajshahi">Rajshahi</option>
      <option value="Khulna">Khulna</option>
      <option value="Barishal">Barishal</option>
      <option value="Mymensingh">Mymensingh</option>
    </select>

    <!-- Chart -->
    <canvas id="myAreaChart"></canvas>
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

// Utility function for number formatting
function number_format(number, decimals = 0, dec_point = ".", thousands_sep = ",") {
  number = (number + "").replace(",", "").replace(" ", "");
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const toFixedFix = (n, prec) => {
    const k = Math.pow(10, prec);
    return "" + Math.round(n * k) / k;
  };

  let s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands_sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec_point);
}

export default {
  name: "AreaChart",
  data() {
    return {
      chartInstance: null, // Reference to the Chart.js instance
      selectedCity: "", // Selected city (initially empty for "All Cities")
    };
  },
  mounted() {
    this.fetchDataAndCreateChart();
  },
  methods: {
    async fetchDataAndCreateChart() {
  try {
    // Build the API URL based on the selected city
    const apiUrl = this.selectedCity
      ? `https://analytical-dashboard-backend-rosy.vercel.app/api/dashboard?Division=${this.selectedCity}`
      : "https://analytical-dashboard-backend-rosy.vercel.app/api/dashboard";

    console.log("Fetching data from:", apiUrl); // Debugging

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const rawData = await response.json();

    console.log("Fetched Data:", rawData); // Debugging

    // Process data: Extract Age and Income
    const labels = rawData.map((item) => item.Age); // X-axis (Age)
    const dataPoints = rawData.map((item) => item.Income); // Y-axis (Income)

    console.log("Labels:", labels); // Debugging
    console.log("Data Points:", dataPoints); // Debugging

    // If no data is returned, log a warning
    if (labels.length === 0 || dataPoints.length === 0) {
      console.warn("No data available for the selected city");
    }

    // Destroy existing chart instance if it exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Create the chart
    const ctx = document.getElementById("myAreaChart").getContext("2d");

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
                let label = context.dataset.label || "";
                if (label) label += ": ";
                label += `$${number_format(context.raw)}`;
                return label;
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
    console.error("Error fetching data:", error);
  }
}
,
    async fetchDataAndUpdateChart() {
      // Trigger fetching and updating chart when the city filter changes
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
</style>

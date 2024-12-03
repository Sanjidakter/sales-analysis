<template>
  <div>
    <!-- Canvas for the chart -->
    <canvas id="myPieChart" ref="pieChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "PieChart",
  setup() {
    const pieChart = ref(null);

    onMounted(() => {
      // Access the canvas element using ref
      const ctx = pieChart.value.getContext("2d");

      // Initialize the Pie Chart
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Direct", "Referral", "Social"],
          datasets: [
            {
              data: [55, 30, 15],
              backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
              hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
              hoverBorderColor: "rgba(234, 236, 244, 1)",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              borderColor: "#dddfeb",
              borderWidth: 1,
              padding: 10,
              displayColors: false,
              caretPadding: 10,
            },
            legend: {
              display: false,
            },
          },
          cutout: "80%", // Equivalent to cutoutPercentage
        },
      });
    });

    return {
      pieChart,
    };
  },
};
</script>

<style>
/* Add custom styles if needed */
</style>

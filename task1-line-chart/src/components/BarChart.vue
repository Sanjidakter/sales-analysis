<template>
    <canvas ref="chartCanvas"></canvas>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { Chart } from "chart.js/auto";
  
  export default {
    props: ["chartData"],
    setup(props) {
      const chartCanvas = ref(null);
      let chartInstance = null;
  
      const renderChart = () => {
        if (chartInstance) {
          chartInstance.destroy(); // Destroy existing chart instance
        }
        chartInstance = new Chart(chartCanvas.value, {
          type: "bar",
          data: props.chartData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Product",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Sales",
                },
              },
            },
          },
        });
      };
  
      onMounted(() => {
        if (chartCanvas.value) {
          renderChart();
        } else {
          console.error("Canvas element not found");
        }
      });
  
      return {
        chartCanvas,
      };
    },
  };
  </script>
  
  <style>
  canvas {
    width: 100%;
    margin: 0 auto;
  }
  </style>
  
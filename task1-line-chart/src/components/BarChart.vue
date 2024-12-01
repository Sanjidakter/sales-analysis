<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    const createChart = () => {
      if (chartInstance) chartInstance.destroy();
      chartInstance = new Chart(chartCanvas.value, {
        type: "bar",
        data: props.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Product",
                font: {
                  size: 14,
                },
              },
            },
            y: {
              title: {
                display: true,
                text: "Sales",
                font: {
                  size: 14,
                },
              },
              beginAtZero: true,
            },
          },
        },
      });
    };

    watch(
      () => props.chartData,
      () => {
        if (props.chartData) {
          createChart();
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      if (props.chartData) {
        createChart();
      }
    });

    return { chartCanvas };
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>

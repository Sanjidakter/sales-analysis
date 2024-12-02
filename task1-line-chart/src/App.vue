<template>
  <div>
    <h1>Interactive Bar Chart</h1>
    <div v-if="loading">Loading chart data...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <BarChart v-if="chartData" :chart-data="chartData" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import BarChart from "./components/BarChart.vue";

export default {
  components: { BarChart },
  setup() {
    const loading = ref(true);
    const error = ref(null);
    const chartData = ref(null);

    const fetchData = async () => {
      try {
        const response = await fetch("data.json"); // Replace with your JSON URL or path
        const rawData = await response.json();
        chartData.value = processChartData(rawData);
      } catch (err) {
        error.value = "Failed to load data";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const processChartData = (data) => {
  // Prepare datasets for October and November sales
  const octoberSales = {};
  const novemberSales = {};

  data.forEach((item) => {
    const dateParts = item.Date.split("/");
    const month = parseInt(dateParts[1]);
    const product = item.Product;

    if (month === 10) {
      octoberSales[product] = item.MonthSales;
    } else if (month === 11) {
      novemberSales[product] = item.MonthSales;
    }
  });

  // Ensure both datasets contain all products
  const labels = Array.from(new Set([...Object.keys(octoberSales), ...Object.keys(novemberSales)]));

  const octSalesData = labels.map((product) => octoberSales[product] || 0);
  const novSalesData = labels.map((product) => novemberSales[product] || 0);

  return {
    labels,
    datasets: [
      {
        label: "October Sales",
        data: octSalesData,
        backgroundColor: "blue",
        order: 1, // Bars rendered below the line
      },
      {
        label: "November Sales",
        data: novSalesData,
        type: "line",
        borderColor: "red",
        borderWidth: 2,
        fill: false,
        order: 2, // Line rendered above bars
      },
    ],
  };
};


    onMounted(fetchData);

    return {
      loading,
      error,
      chartData,
    };
  },
};
</script>

<style>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>

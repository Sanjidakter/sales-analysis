<template>
  <div>
    <h1>Interactive Bar Chart</h1>
    <div v-if="loading">Loading chart data...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <BarChart :chart-data="chartData" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import BarChart from "./components/BarChart.vue";

export default {
  components: { BarChart },
  setup() {
    const chartData = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const processChartData = (data) => {
      const parsedData = data.map((item) => ({
        ...item,
        Date: new Date(item.Date),
      }));

      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      const groupSalesByProduct = (month, year) => {
        return parsedData
          .filter(
            (item) =>
              item.Date.getMonth() === month && item.Date.getFullYear() === year
          )
          .reduce((acc, item) => {
            acc[item.Product] = (acc[item.Product] || 0) + item.MonthSales;
            return acc;
          }, {});
      };

      const currentMonthData = groupSalesByProduct(currentMonth, currentYear);
      const previousMonthData = groupSalesByProduct(previousMonth, previousYear);

      const allProducts = Array.from(
        new Set([
          ...Object.keys(currentMonthData),
          ...Object.keys(previousMonthData),
        ])
      );

      const currentMonthSales = allProducts.map(
        (product) => currentMonthData[product] || 0
      );
      const previousMonthSales = allProducts.map(
        (product) => previousMonthData[product] || 0
      );

      chartData.value = {
        labels: allProducts,
        datasets: [
          {
            label: "Current Month Sales",
            data: currentMonthSales,
            backgroundColor: "blue",
            borderWidth: 1,
          },
          {
            label: "Previous Month Sales",
            data: previousMonthSales,
            type: "line",
            borderColor: "red",
            borderWidth: 2,
            tension: 0.4,
            fill: false,
          },
        ],
      };
    };

    const fetchChartData = async () => {
      try {
        const response = await fetch("data.json"); // Place the JSON file in the `public` folder
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        processChartData(data);
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchChartData);

    return { chartData, loading, error };
  },
};
</script>

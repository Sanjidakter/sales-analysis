<template>
  <div>
    <h1>Interactive Bar Chart</h1>
    <BarChart />
  </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";

export default {
  name: "App",
  components: {
    BarChart,
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  text-align: center;
}
</style>

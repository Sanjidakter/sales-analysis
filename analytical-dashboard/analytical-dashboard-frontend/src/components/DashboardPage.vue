<template>
    <div class="dashboard">
      <FiltersPanel @filter="handleFilter" />
      <div class="charts">
        <BarChart :data="chartData" />
        <PieChart :data="chartData" />
      </div>
    </div>
  </template>
  
  <script>
  import FiltersPanel from './FiltersPanel.vue';
  import BarChart from './Charts/BarChart.vue';
  import PieChart from './Charts/PieChart.vue';
  import { fetchDashboardData } from '../api/api';
  
  export default {
    components: { FiltersPanel, BarChart, PieChart },
    data() {
      return {
        dashboardData: [],
        chartData: [],
      };
    },
    methods: {
      async fetchData() {
        try {
          this.dashboardData = await fetchDashboardData();
          this.chartData = this.dashboardData; // Adjust for chart format
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      handleFilter(filters) {
        const filteredData = this.dashboardData.filter((item) =>
          filters.division ? item.Division === filters.division : true
        );
        this.chartData = filteredData;
      },
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
  }
  .charts {
    display: flex;
    justify-content: space-around;
  }
  </style>
  
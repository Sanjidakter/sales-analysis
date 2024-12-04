<template>
    <section class="container">
      <div class="row">
        <div class="col-md-6">
          <PieChart />
        </div>
        <div class="col-md-6">
          <MaritalStatus />
        </div>
      
      </div>
    </section>
  </template>
  
  <script>
  import MaritalStatus from "./MaritalStatus.vue";
  import PieChart from "./PieChart.vue";
  
  export default {
    components: {
      PieChart,
      MaritalStatus,
    },
  };
  </script>
  
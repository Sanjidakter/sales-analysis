<template>
    <div class="filters">
      <h3>Filters</h3>
      <label>
        Division:
        <select v-model="selectedDivision">
          <option value="">All</option>
          <option v-for="division in divisions" :key="division" :value="division">
            {{ division }}
          </option>
        </select>
      </label>
      <button @click="applyFilters">Apply</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedDivision: '',
        divisions: ['Dhaka', 'Rajshahi', 'Khulna', 'Barishal', 'Mymensingh', 'Sylhet', 'Rangpur', 'Chattogram'],
      };
    },
    methods: {
      applyFilters() {
        this.$emit('filter', { division: this.selectedDivision });
      },
    },
  };
  </script>
  
  <style scoped>
  .filters {
    margin: 20px;
  }
  label {
    display: block;
    margin-bottom: 10px;
  }
  </style>
  
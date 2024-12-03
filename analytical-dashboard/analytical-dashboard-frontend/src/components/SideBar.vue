<template>
    <div class="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li v-for="item in menuItems" :key="item">{{ item }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuItems: ['Overview', 'Filters', 'Charts'],
      };
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
  }
  </style>
  
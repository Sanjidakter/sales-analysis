
import PieCompare from '@/components/Charts/PieCompare.vue';
import HomePage from '@/components/views/HomePage.vue';
import SendMail from '@/components/views/SendMail.vue';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/piechart',
    name: 'PieCompare',
    component: PieCompare,
  },
  {
    path: '/mail',
    name: 'SendMail',
    component: SendMail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { remove } from '@vue/shared';
import { createRouter, createWebHistory } from 'vue-router'
import Screen from '../views/Screen'
import store from '../store'


const routes = [
  { path: '/red', component: Screen, meta: {type: 'red'}, alias: '/', props: true },
  { path: '/yellow', component: Screen, meta: {type: 'yellow'}, props: true },
  { path: '/green', component: Screen, meta: {type: 'green'}, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  store.dispatch('reload', to);
  next();
  
});

router.afterEach((to, from) => {

})

export default router

  

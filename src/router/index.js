import { createRouter, createWebHistory } from 'vue-router'
import ListOfExercises from '../views/ListOfExercises.vue'

const routes = [
  {
    path: '/',
    name: 'ListOfExercises',
    component: ListOfExercises
  },
  {
    path: '/exercise/:exerciseName',
    name: 'PerformExercise',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import('../views/PerformExercise.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

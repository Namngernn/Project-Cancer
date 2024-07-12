import { createRouter, createWebHistory } from 'vue-router'
import appointmentView from '../views/newappointmentView.vue'
import appointInfo from '../views/newappointInfo.vue'
import HomePage from '../views/newHomePage.vue'
import MedFormular from '../views/MedFormular.vue'
import LogIn from '../views/LogIn.vue'
import YourPatient from '../views/yourPatient.vue'
import DetailPatient from '../views/DetailPatient.vue'
import RegisPatient from '../views/RegisPatient.vue'
import DetailAppoint from '../views/DetailAppoint.vue'
import guideBook from '../views/guideBook.vue'

const routes = [
  {
    path: '/appointmentView/:userId',
    name: 'appointmentView',
    component: appointmentView
  },
  {
    path: '/appointInfo/:userId/:HN/:treatmentId',
    name: 'appointInfo',
    component: appointInfo
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/HomePage/:userId',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/MedFormular/:userId',
    name: 'MedFormular',
    component: MedFormular
  },
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/YourPatients/:userId',
    name: 'yourPatient',
    component: YourPatient
  },
  {
    path: '/DetailPatient/:userId/:HN/:treatmentId',
    name: 'DetailPatient',
    component: DetailPatient
  },
  {
    path: '/RegisPatient/:userId/',
    name: 'RegisPatient',
    component: RegisPatient
  },
  {
    path: '/DetailAppoint/:userId/:HN/:treatmentId',
    name: 'DetailAppoint',
    component: DetailAppoint
  },
  {
    path: '/guideBook/:userId',
    name: 'guideBook',
    component: guideBook
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

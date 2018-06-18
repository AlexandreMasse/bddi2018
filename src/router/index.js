import Vue from 'vue'
import Router from 'vue-router'
import About from '../views/About.vue'
import MobileMenu from '../views/MobileMenu.vue'
import Menu from '../views/Menu.vue'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Project from '../views/Project.vue'
import Students from '../views/Students.vue'
import StudentProfile from '../views/StudentProfile.vue'

// import {TweenLite, Power2} from 'gsap'
// import 'gsap/ScrollToPlugin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '/bddi2018/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/mobile-menu',
      name: 'mobile-menu',
      component: MobileMenu
    },
    {
      path: '/category/:ident',
      name: 'category',
      component: Category
    },
    {
      path: '/project/:categoryIdent/:projectId/:projectIdent',
      name: 'project',
      component: Project
    },
    {
      path: '/bddi',
      name: 'students',
      component: Students
    },
    {
      path: '/bddi/:studentId/:studentFirstname',
      name: 'studentProfile',
      component: StudentProfile
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ]
})

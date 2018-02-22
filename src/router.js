import Vue from 'vue'
import Router from 'vue-router'
import HomeExemple from './views/HomeExemple.vue'
import About from './views/About.vue'
import Menu from './views/Menu.vue'
import Home from './views/Home.vue'
import Category from './views/Category.vue'
import Project from './views/Project.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-exemple',
      component: HomeExemple
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
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/project',
      name: 'project',
      component: Project
    }
  ]
})

<template>
  <div class="mobile-menu">
    <div class="menu_items">
      <ul>
        <li>
          <router-link to="/menu" class="highlight-hover">Works</router-link>
        </li>
        <li>
          <router-link to="/bddi" class="highlight-hover">Les BDDI</router-link>
        </li>
        <li>
          <router-link to="/about" class="highlight-hover">About</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  import canvasBackground from '@/components/CanvasBackground.vue'
  export default {
    name: 'MobileMenu',
    components: {canvasBackground}
  }
</script>

<style lang="scss" scoped>
  .mobile-menu {
    .menu_items {
      ul {
        margin: 0;
        padding: 0;
        li {
          list-style: none;
        }
      }
    }
  }
</style>
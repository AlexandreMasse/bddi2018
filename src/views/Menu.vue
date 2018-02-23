<template>
  <div class="menu">
   <p>{{text}}</p>
    <menu-item text="Item 1"></menu-item>
    <menu-item text="Item 2"></menu-item>
    <menu-item text="Item 3"></menu-item>
  </div>
</template>

<script>
  import MenuItem from '@/components/MenuItem.vue'
  export default {
    name: 'menu',
    components: {MenuItem},
    data () {
      return {
        text: 'Menu'
      }
    }
  }
</script>

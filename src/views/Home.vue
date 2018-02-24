<template>
  <div class="home">
   <h1>{{text}}</h1>
   <category-item></category-item>
  </div>
</template>

<script>
  import categoryItem from '@/components/CategoryItem.vue'
  export default {
    name: 'home',
    components: {categoryItem},
    data () {
      return {
        text: 'Home'
      }
    }
  }
</script>

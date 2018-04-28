<template>
 <section class="menu" id="menu">
    <nav class="menu__navigation">
      <ul class="menu__items" id="categories-item">
        <menu-item v-for="category in categories" :key="category.id" :categoryId="category.id" :categoryIdent="category.ident" :categoryName="category.name"/>
      </ul>
    </nav>
  </section>
</template>

<script>
  import MenuItem from '@/components/MenuItem.vue'
  import categories from '@/data/categories.json'
  import { TimelineLite, Power3 } from 'gsap'

  export default {
    name: 'menu',
    components: {MenuItem},
    data () {
      return {
        categories
      }
    },
    mounted () {
      const tl = new TimelineLite()
      tl
        .set('li.menu__items-item', {
          opacity: 0
        })
        .staggerTo('li.menu__items-item', 1, {
          opacity: 1,
          ease: Power3.easeOut
        }, 0.2)
    }
  }
</script>

<style lang="scss" scoped>

  .menu {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
    &__navigation {
      width: 700px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 200px;
      margin-bottom: 100px;
    }
    .menu__items {
      padding: 0;
      line-height: 1;
    }
  }
  @media screen and (max-width : 600px) {
    .menu {
      &__navigation {
        top: 150px;
        width: 100%;
      }
    }
  }
</style>

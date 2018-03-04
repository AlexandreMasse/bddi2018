<template>
  <div class="home">
    <div class="landing">
      <div class="landing__content">
        <intro :title="title" :description="description" :backHome="false"></intro>
      </div>
      <div class="landing__start">
        <span>Start here</span>
      </div>
    </div>
    <category-item></category-item>
  </div>
</template>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    .landing {
      width: 100%;
      height: 100%;
      text-align: left;
      &__content {
        position: absolute;
        left: 15%;
        top: 50%;
        transform: translateY(-50%);
      }
      &__start {
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
        span {
          line-height: 50px;
          color: #fefefe;
          text-transform: uppercase;
          font-size: 12px;
          position: relative;
          letter-spacing: 3px;
          opacity: 0.9;
          font-family: $font-aileron-light;
          &:after {
            content: '';
            width: 1px;
            height: 100px;
            background: #fefefe;
            position: absolute;
            opacity: 0.9;
            left: 50%;
            transform: translateX(-50%);
            top: 20px;
          }
        }
      }
    }
  }
</style>

<script>
  import categoryItem from '@/components/CategoryItem.vue'
  import intro from '@/components/Intro.vue'

  export default {
    name: 'home',
    components: {categoryItem, intro},
    data () {
      return {
        title: 'Bachelor Designer & Développeur Intéractif',
        description: 'BBDI 2018, c’est une équipe, une classe, une famille de 42 talents, tous aussi créatifs les uns que les autres, qui puise perpétuellement leurs inspirations dans le numérique et son devenir. Nous aimons les challenges et créer de nouvelles choses que vous pouvez retrouver ici :'
      }
    }
  }
</script>

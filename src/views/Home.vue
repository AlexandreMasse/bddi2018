<template>
  <div class="home">
    <div class="landing">
      <div class="landing__content">
        <h1>{{title}}</h1>
        <p>{{description}}</p>
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
        width: 60%;
        h1 {
          text-transform: uppercase;
          opacity: 0.5;
          font-family: "Aileron-light";
          letter-spacing: 3px;
          font-size: 13px;
        }
        p {
          color: #fefefe;
          font-family: "GTWalsheimProRegular";
          font-size: 20px;
        }
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
          font-family: "Aileron-light";
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
  export default {
    name: 'home',
    components: {categoryItem},
    data () {
      return {
        title: 'Bachelor Designer & Développeur Intéractif',
        description: 'BBDI 2018, c’est une équipe, une classe, une famille de 42 talents, tous aussi créatifs les uns que les autres, qui puise perpétuellement leurs inspirations dans le numérique et son devenir. Nous aimons les challenges et créer de nouvelles choses que vous pouvez retrouver ici :'
      }
    }
  }
</script>

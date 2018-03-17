<template>
  <div class="students__list-item">
    <div class="students__thumbnail">
      <student-character :student="student"></student-character>
    </div>
    <router-link :to="'/bddi/' + student.id + '/' + student.firstname">
      <h2 class="highlight-hover">{{student.firstname}}</h2>
    </router-link>
    <p>{{student.option}}</p>
  </div>
</template>

<script>
  import studentCharacter from '@/components/StudentCharacter.vue'
  export default {
    name: 'studentItem',
    props: ['student'],
    components: {studentCharacter}
  }
</script>

<style lang="scss" scoped>
  .students__list-item {
    width: 20%;
    height: 280px;
    float: left;

    &:nth-of-type(5n) {
      margin: 0;
    }

    h2 {
      font-family: $font-walsheim-regular;
      margin: 15px 2px 5px;
      font-size: 20px;
      line-height: 25px;
      color: $color-white;
      cursor: pointer;
    }

    p {
      font-family: $font-aileron-light;
      font-size: 12px;
      line-height: 20px;
      opacity: 0.8;
      margin: 0;

      em {
        font-size: 0.9em;
        color: #b4b4b4;
        font-style: normal;
      }
    }
  }
</style>

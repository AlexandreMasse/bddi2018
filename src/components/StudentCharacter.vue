<template>
  <div class="students__thumbnail-img" :style="styles"></div>
</template>

<script>
  export default {
    name: 'studentCharacter',
    props: ['student'],
    computed: {
      styles () {
        let path = `${this.student.id}_${this.student.firstname.toLowerCase()}`
        let url = require(`../assets/images/students/${path}.png`)
        return {
          'background-image': `url(${url})`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .students__thumbnail {
    width: 100%;
    height: 150px;

    &-img {
      width: 100%;
      height: 150px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: all 0.7s ease;
    }
  }
</style>

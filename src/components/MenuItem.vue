<template>
  <router-link :to="'/category/' + categoryIdent">
    <li class="menu__items-item">
      <div class="menu__thumbnail" :style="styles"></div>
      <span>{{categoryName}}</span>
    </li>
  </router-link>
</template>
<script>
  export default {
    name: 'MenuItem',
    props: ['categoryId', 'categoryIdent', 'categoryName'],
    computed: {
      styles () {
        let url = require(`../assets/images/thumbnail-${this.categoryId}.jpg`)
        return {
          'background-image': `url(${url})`
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }
  .menu__items {
    &-item {
      height: 100px;
      text-transform: uppercase;
      text-decoration: none;
      font-family: 'GTWalsheimProRegular';
      letter-spacing: 15px;
      font-size: 50px;
      margin: 50px 0;
      transition: all 0.5s ease;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
      .menu__thumbnail {
        width: 700px;
        height: 300px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        text-align: center;
        position:absolute;
        top: -100%;
        left: 0;
        opacity: 0;
        z-index: 1;
        transition: all 0.5s ease;
      }
      span {
        cursor: pointer;
        position: relative;
        z-index: 2;
        opacity: 0.5;
        transition: all 0.5s ease;
        color: #fefefe;
      }
      &:hover {
        .menu__thumbnail {
          opacity: 1;
        }
        span {
          opacity: 1;
          font-weight: bold;
        }
      }
    }
  }
  @media screen and (max-width : $media-mobile) {
    .menu__items {
      &-item {
        font-size: 20px;
        margin: 20px auto;
        letter-spacing: 5px;
        height: 80px;
        width: 80%;

        .menu__thumbnail {
          width: 90%;
          height: 100px;
          top: -15%;
          left:50%;
          transform: translateX(-50%);
        }
      }
    }
  }
</style>

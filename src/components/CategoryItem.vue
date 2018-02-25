<template>
  <div class="projects__category">
    <div class="projects__category-title">
      <h2>Lorem Ipsum Dolor Sit Amet</h2>
    </div>
    <div class="projects__category-content">
      <div class="projects__category-thumbnail"></div>
      <div class="projects__category-description">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div class="fi flaticon-left-arrow action-show"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.projects {
  &__category {
    width: 100%;
    height: 100%;
    position: relative;
    &-title {
      left: 100px;
      transform: rotate(-180deg);
      position: absolute;
      top: 150px;
      text-align: right;
      line-height: 30px;
      h2 {
        writing-mode: vertical-lr;
        text-transform: uppercase;
        letter-spacing: 3px;
        position:relative;
        opacity: 0.9;
        font-family:'Aileron-light';
        &:after {
          content: '';
          width: 1px;
          height: 50px;
          background: #fefefe;
          position: absolute;
          opacity: 1;
          left: 50%;
          transform: translateX(-50%);
          bottom: -65px;
        }
      }
      &-long {
        max-width: 300px;
        left: -70px;
      }
    }
    &-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 850px;
      height: 500px;
    }
    &-thumbnail {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 700px;
      height: 350px;
      position: absolute;
      left: 0;
      bottom: 0;
      cursor: pointer;
      overflow: hidden;

      &-img {
        display: block;
        width: 100%;
        height: 100%;
        transition: transform .7s;
      }

      &:hover {
        .projects__category-thumbnail {
          &-img {
            transform: scale(1.1);
          }
        }
      }
    }
    &-description {
      cursor: pointer;
      background: #fefefe;
      width: 350px;
      height: 250px;
      padding: 25px;
      position: absolute;
      top: 0;
      right: 0;
      font-family: 'Aileron-regular';
      font-size: 16px;
      text-align: justify;
      p {
        color: #000;
        line-height: 25px;
        font-family: 'Aileron-regular';
        font-size: 16px;
      }
      .action-show {
        text-align: right;
        position: absolute;
        right: 25px;
        bottom: 25px;
        cursor: pointer;
        &:before {
          color: #8625FA;
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>

<script>
  export default {
    name: 'categoryItem'
  }
</script>

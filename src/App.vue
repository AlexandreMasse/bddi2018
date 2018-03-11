<template>
  <div id="app">
    <div id="home-link">
      <router-link to="/" class="home">
        <img src="./assets/images/gobelins_logo_white.png">
        <p>Gobelins - L'école de l'image <br> BDDI 2018</p>
      </router-link>
    </div>
    <div id="menu-link">
      <router-link to="/menu" class="menu"><span>Works</span></router-link>
    </div>
    <div id="about-link">
      <router-link to="/about">About</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <canvas-background></canvas-background>
  </div>
</template>

<script>
  import canvasBackground from '@/components/CanvasBackground.vue'
  export default {
    name: 'App',
    components: {canvasBackground}
  }
</script>

<style lang="scss" scoped>

.fade-enter-active {
  transition: opacity 1s ease-in;
}

.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#app {
  font-family: $font-medium;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  width: 100%;
  height: 100%;

  #home-link {
    position: absolute;
    z-index: 10;
    padding: 30px 30px 0;
    left: 0;
    top: 0;
    .home {
      text-align: left;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 50px;
      }
      p {
        margin: 0;
        margin-left: 20px;
        opacity: 0.5;
        font-family: $font-aileron-light;
        font-size: 15px;
        letter-spacing: 2px;
        line-height: 22px;
      }
    }
  }

  #menu-link {
    padding: 30px;
    z-index:10;
    position: fixed;
    right: 60px;
    top: 0;
    .menu {
      position: relative;
      text-transform: uppercase;
      font-family: $font-aileron-light;
      font-size: 18px;
      letter-spacing: 5px;
      text-decoration: none;
      span {
        padding-right: 10px;
      }
      &:after {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 50px;
        height: 1px;
        background: #fefefe;
      }
    }
  }

  #about-link {
    position: fixed;
    bottom: 20px;
    right: 40px;
    font-family: $font-aileron-light;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 3px;
    z-index: 1000;
    a {
      text-decoration: none;
      color: #afadad;
      &:hover {
        color: $color-purple;
      }
    }
  }
}

</style>

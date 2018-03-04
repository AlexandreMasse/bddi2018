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
    <div id="nav">
      <router-link to="/project">Project</router-link>
    </div>
    <div id="about-link">
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
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
#app {
  font-family: $font-medium;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
  z-index:999;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#menu-link {
  padding: 30px;
  z-index:998;
  position: fixed;
  right: 60px;
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
#home-link {
  padding: 30px;
  position: absolute;
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
</style>

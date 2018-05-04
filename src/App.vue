<template>
  <div id="app">
    <canvas-background/>
    <div id="home-link">
      <router-link :to="{name: 'home'}" class="home">
        <img src="./assets/images/gobelins_logo_white.png">
        <p>Gobelins - L'école de l'image <br> BDDI 2018</p>
      </router-link>
    </div>
    <div id="mobile-nav">
      <transition name="menu" mode="out-in">
        <router-link :to="{name: 'mobile-menu'}" v-if="!menuMobileIsOpen" class="menu" key="work"><span>Menu</span></router-link>
        <router-link :to="lastRoutePathBeforeMenu" v-else class="menu" key="close"><span>Close</span></router-link>
      </transition>
    </div>
    <div id="menu-link">
      <transition name="menu" mode="out-in">
        <router-link :to="{name: 'menu'}" v-if="!menuDesktopIsOpen" class="menu" key="work"><span>Works</span></router-link>
        <a v-else v-on:click="onDesktopMenuClose" class="menu" key="close"><span>Close</span></a>
      </transition>
    </div>
    <div id="footer-links">
      <router-link to="/bddi" class="highlight-hover">Les BDDI</router-link>
      <router-link to="/about" class="highlight-hover">About</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import canvasBackground from '@/components/CanvasBackground.vue'
  import {TweenLite, Power1} from 'gsap'
  import 'gsap/ScrollToPlugin'

  export default {
    name: 'App',
    components: {canvasBackground},
    data () {
      return {
        menuDesktopIsOpen: false,
        menuMobileIsOpen: false,
        lastRoutePathBeforeMenu: '/'
      }
    },
    methods: {
      onDesktopMenuClose () {
        this.$router.go(-1)
      }
    },
    mounted () {
      this.menuDesktopIsOpen = this.$route.path === this.$router.match('menu').fullPath
      this.menuMobileIsOpen = this.$route.path === this.$router.match('mobile-menu').fullPath
    },
    watch: {
      '$route' (to, from) {
        this.menuDesktopIsOpen = to.name === 'menu'

        this.menuMobileIsOpen = (to.name === 'mobile-menu') || (from.name === 'mobile-menu' && to.name === 'menu')

        if (to.name === 'mobile-menu' && from.name !== 'mobile-menu') {
          this.lastRoutePathBeforeMenu = from.fullPath
        }

        // Scroll
        TweenLite.to(window, 0.5, {
          scrollTo: {y: 0},
          ease: Power1.easeInOut
        })
      }
    }
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

.menu-enter-active {
  transition: opacity 1s ease-in;
}

.menu-leave-active {
  transition: opacity 0.5s ease-out;
}

.menu-enter, .menu-leave-to {
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

  #mobile-nav {
    display: none;
  }

  #home-link {
    position: absolute;
    z-index: 10;
    padding: 0 30px;
    left: 0;
    top: 30px;
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
    z-index:10000;
    position: fixed;
    right: 100px;
    top: 32px;
    cursor: pointer;
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
        transition: width 0.3s ease;
      }

      &:hover:after {
        width: 35px;
      }
    }
  }

  #footer-links {
    position: fixed;
    bottom: 20px;
    right: 40px;
    width: 100px;
    font-family: $font-aileron-light;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: right;
    z-index: 10000;
    a {
      position: relative;
      text-decoration: none;
      color: #fff;
      margin: 15px 0;
      display:inline-block;
      font-weight: bold;
    }
  }
}
@media screen and (max-width : $media-mobile) {
  #app {
    #mobile-nav {
      display: block;
      position: fixed;
      z-index: 100;
      right: 65px;
      top:30px;
      cursor: pointer;
      a {
        text-decoration: none;
        text-transform: uppercase;
        font-family: $font-aileron-light;
        font-size: 18px;
        letter-spacing: 5px;
        position: relative;
        &:after {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          content: "";
          width: 30px;
          height: 1px;
          background: #fefefe;
        }
        span {
          margin-right: 10px;
        }
      }
    }
    #home-link {
      padding: 0;
      top: 20px;
      left: 20px;
      p {
        display: none;
      }

    }
    #menu-link, #footer-links {
      display: none;
    }
  }
}

</style>

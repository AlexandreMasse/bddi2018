<template>
  <div class="mobile-menu">
    <div class="menu_items">
      <ul>
        <li>
          <router-link to="/menu">Works</router-link>
        </li>
        <li>
          <router-link to="/bddi">Les BDDI</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MobileMenu'
  }
</script>

<style lang="scss" scoped>
  .mobile-menu {
    width: 100%;
    height: 100%;
    .menu_items {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 100%;
      ul {
        margin: 0;
        padding: 0;
        li {
          list-style: none;
          a {
            display: inline-block;
            text-decoration: none;
            font-family: 'GTWalsheimProRegular';
            letter-spacing: 15px;
            font-size: 25px;
            text-transform: uppercase;
            padding: 20px 0;
          }
        }
      }
    }
  }
</style>

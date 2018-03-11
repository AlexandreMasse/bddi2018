<template>
  <div class="about">
    <h1>About</h1>
    <p>Developed by <a href="#">Circé Grand</a>, <a href="#">Alexandre Massé</a> & <a href="#">Léa Tanda</a></p>
    <p>Website designed by <a href="#">Elisa Dubois</a></p>
    <p>Characters designed by <a href="#">Matthieu Pajot</a></p>
    <p>Bachelor Designer & Developpeur Interactif </p>
    <p>Promo 2018</p>
    <p>Gobelins, l'École de l'Image</p>
  </div>
</template>
<style lang="scss" scoped>
  .about {
    position: relative;
    top: 100px;
    z-index: 2;
    font-family: $font-aileron-light;
    h1 {
      margin: 50px auto 80px;
      text-transform: uppercase;
      letter-spacing: 5px;
      font-size: 15px;
      color: $color-grey;
    }
    p {
      color: $color-grey;
      font-family: $font-walsheim-regular;
      font-size: 20px;
      align-self: auto;
      a {
        position: relative;
        display: inline-block;
        font-weight: bold;
        line-height: 1.4;
        padding: 0 5px;
        transition: color 0.3s;
        text-decoration: none;
        &::before {
          content: "";
          position: absolute;
          background: #611eff;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60%;
          opacity: 0.5;
          transform: scale3d(0,1,1);
          transform-origin: left;
          transition: transform 0.3s;
          z-index: -1;
        }
        &:hover {
          &::before {
            transform: scale3d(1,1,1);
          }
        }
      }
    }
  }
</style>

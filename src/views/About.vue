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
        font-weight: bold;
        line-height: 1.4;
      }
    }
  }
</style>

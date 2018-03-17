<template>
  <div class="about">
    <h1>About</h1>
    <p>Developed by <a href="#" class="highlight-hover">Circé Grand</a>, <a href="#" class="highlight-hover">Alexandre Massé</a> & <a href="#" class="highlight-hover">Léa Tanda</a></p>
    <p>Website designed by <a href="#" class="highlight-hover">Elisa Dubois</a></p>
    <p>Characters designed by <a href="#" class="highlight-hover">Matthieu Pajot</a></p>
    <p>Characters animated by <a href="#" class="highlight-hover">Solal-Dussout Revel</a></p>
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

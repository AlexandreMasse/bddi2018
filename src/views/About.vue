<template>
  <div class="about">
    <h1>About</h1>
    <p>Developed by <a href="http://circegrand.fr/" target="_blank" title="Redirection vers le portfolio de Circé Grand">Circé Grand</a>, <a href="https://alexandremasse.fr/" target="_blank" title="Redirection vers le portfolio d'Alexandre Massé">Alexandre Massé</a> &amp; <a href="http://www.leatanda.fr/" target="_blank" title="Redirection vers le portfolio de Léa Tanda">Léa Tanda</a></p>
    <p>Website designed by <a href="http://elisadubois.fr/" target="_blank" title="Redirection vers le portfolio d'Elisa Dubois">Elisa Dubois</a></p>
    <p>Characters designed by <a href="http://www.matthieupajot.com/" target="_blank" title="Redirection vers le portfolio de Matthieu Pajot">Matthieu Pajot</a></p>
    <p>Bachelor Designer &amp; Developpeur Interactif </p>
    <p>Promo 2018</p>
    <p><a href="https://www.gobelins.fr/" target="_blank" title="Redirection vers le site de l'école des Gobelins">Gobelins, l'École de l'Image</a></p>
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

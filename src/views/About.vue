<template>
  <div class="about">
    <h1>About</h1>
    <p>Developed by <a href="http://circegrand.fr/" class="highlight-hover" target="_blank" title="Redirection vers le portfolio de Circé Grand">Circé Grand</a>, <a href="https://alexandremasse.fr/" class="highlight-hover" target="_blank" title="Redirection vers le portfolio d'Alexandre Massé">Alexandre Massé</a> &amp; <a href="http://www.leatanda.fr/" class="highlight-hover" target="_blank" title="Redirection vers le portfolio de Léa Tanda">Léa Tanda</a></p>
    <p>Website designed by <a href="http://elisadubois.fr/" class="highlight-hover" target="_blank" title="Redirection vers le portfolio d'Elisa Dubois">Elisa Dubois</a></p>
    <p>Characters designed by <a href="http://www.matthieupajot.com/" class="highlight-hover" target="_blank" title="Redirection vers le portfolio de Matthieu Pajot">Matthieu Pajot</a></p>
   <!-- <p>Characters animated by <a href="http://www.solaldussout-revel.com/" class="highlight-hover" target="_blank" title="Redirection vers le portfolio de Solal Dussout">Solal-Dussout Revel</a></p>-->
    <p>Promo 2018 <a href="https://www.gobelins.fr/formation/bddi-bachelor-designer-developpeur-interactif-cycle-1-option-graphisme-ou-developpement" class="highlight-hover" target="_blank" title="Redirection vers la page de la formation bachlor Designer et Développeur Interactif">Bachelor Designer &amp; Developpeur Interactif</a></p>
    <p>School <a href="https://www.gobelins.fr/" class="highlight-hover" target="_blank" title="Redirection vers le site de l'école des Gobelins">Gobelins, l'École de l'Image</a></p>
  </div>
</template>

<script>
  import {TimelineLite, Power2} from 'gsap'

  export default {
    name: 'about',
    mounted () {
      const tl = new TimelineLite()
      tl
        .set(this.$el.querySelectorAll('p'), {
          opacity: 0
        })
        .staggerTo(this.$el.querySelectorAll('p'), 1.4, {
          opacity: 1,
          ease: Power2.easeInOut
        }, 0.2)
    }
  }
</script>
<style lang="scss" scoped>
  .about {
    display: inline-block;
    position: relative;
    top: 100px;
    z-index: 2;
    font-family: $font-aileron-light;
    h1 {
      margin: 50px auto 80px;
      text-transform: uppercase;
      letter-spacing: 5px;
      font-size: 18px;
      color: $color-grey;
    }
    p {
      color: $color-grey;
      font-family: $font-walsheim-regular;
      font-size: 20px;
      margin: 35px auto;
      align-self: auto;
      a {
        font-weight: bold;
        line-height: 1.4;
      }
    }
  }
  @media screen and (max-width : $media-mobile) {
    .about {
      padding: 0 20px;
      h1 {
        margin: 0 auto 35px auto;
      }
      p {
        font-size: 16px;
        margin: 30px auto;
      }
    }
  }
</style>

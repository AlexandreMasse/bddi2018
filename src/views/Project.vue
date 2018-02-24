<template>
  <div class="project">
   <h1>{{text}}</h1>
   <p>Je suis un projet unique !</p>
  </div>
</template>

<script>
  export default {
    name: 'project',
    data () {
      return {
        text: 'Project'
      }
    }
  }
</script>

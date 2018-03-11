<template>
  <section v-if="category" class="category">
    <div class="category__content">
      <div class="category__description">
        <intro :title="category.name" :description="category.description" :backHome="true"></intro>
      </div>
      <project-item v-for="project in category.projectsList" :key="project.id" :data="project" :categoryIdent="category.ident" :categoryId="category.id"></project-item>
    </div>
  </section>
</template>

<script>
  import projectItem from '@/components/ProjectItem.vue'
  import intro from '@/components/Intro.vue'
  import categories from '@/data/categories.json'

  export default {
    name: 'category',
    components: {projectItem, intro},
    data () {
      return {
        text: 'Category',
        categoryIdent: this.$route.params.ident
      }
    },
    computed: {
      category () {
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].ident === this.categoryIdent) {
            return categories[i]
          } else if (i === categories.length - 1) {
            return null
          }
        }
      }
    },
    mounted () {
      if (!this.category) {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category {
    position: relative;
    z-index: 2;
    &__content {
      width: 940px;
      margin: 0 auto;
      margin-top: 200px;
      .category__description {
        color: $color-white;
        font-size: 20px;
        font-family: $font-walsheim-regular;
        margin-bottom: 80px;
      }
    }
  }
</style>

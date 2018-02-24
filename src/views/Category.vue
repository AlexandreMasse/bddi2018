<template>
  <div class="category category__content">
    <h2>Ident : {{categoryIdent}}</h2>
   <div class="category__description">
      <div class="fi flaticon-left-arrow action-back backhome"></div>
      <p>{{category.description}}</p>
    </div>
   <project-item v-for="project in category.projectsList" :key="project.id" :data=project> </project-item>
  </div>
</template>

<script>
  import projectItem from '@/components/ProjectItem.vue'
  import categories from '@/data/categories.json' // To delete soon

  export default {
    name: 'category',
    components: {projectItem},
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
          } else if (this.categoryIdent === 'default') {
            return categories[0]
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .category {
    // opacity: 0;
    &__content {
      width: 940px;
      margin: 0 auto;
      margin-top: 200px;
      .category__description {
        // color: $color-white;
        line-height: 40px;
        font-size: 20px;
        // font-family: $font-walsheim-regular;
        width: 700px;
        margin-bottom: 80px;
        .fi {
          &:before {
            cursor: pointer;
            font-size: 20px;
            // color: $color-purple;
          }
        }
      }
    }
  }
</style>

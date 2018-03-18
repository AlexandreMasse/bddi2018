<template>
  <section class="students">
    <div class="students__content">
      <div class="students__description">
         <intro :title="title" :description="description" :backLinkSrc="'/'"></intro>
      </div>
      <student-item v-for="student in studentList" :key="'student'+student.id" :student="student"></student-item>
    </div>
  </section>
</template>

<script>
  import studentList from '@/data/students.json'
  import intro from '@/components/Intro.vue'
  import studentItem from '@/components/StudentItem.vue'

  export default {
    name: 'students',
    components: {intro, studentItem},
    data () {
      return {
        title: 'La promo des BDDI 2018',
        description: 'Découvrez nos talents tous très créatifs et  qui seront fraichement diplomés en 2018. Tous prêts à relever de nouveaux challenges et à penser autrement, n\'hésitez pas à les contacter si vous êtes porteurs d\'un projet.',
        studentList
      }
    }
  }

</script>

<style lang="scss" scoped>
  .students {
    position: relative;
    z-index: 2;
    &__content {
      width: 940px;
      margin: 0 auto;
      margin-top: 200px;
      .students__description {
        color: $color-white;
        font-size: 20px;
        font-family: $font-walsheim-regular;
        margin-bottom: 80px;
      }
    }
  }
</style>

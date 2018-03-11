<template>
  <transition name="fade" mode="out-in">
    <iframe-project v-if="showIframe" :src="srcIframe" v-on:backToScreen="hideIframe" :backLinkSrc="currentLink" :key="iframe"></iframe-project>
    <div class="project__screens" v-else :key="'screens'">
      <div class="project__informations">
      <router-link :to="backLinkSrc" class="fi flaticon-left-arrow action-back back"></router-link>
        <h1>
          <span v-for="(student, index) in studentsListOutput" :key="student.id">
            {{student[0].firstname}} {{student[0].lastname}}
            <em> ({{student[0].option}})</em>
            <span v-if="index != studentsListOutput.length - 1">-</span>
          </span>
        </h1>
        <h2>{{project.name}}</h2>
        <span v-if="hasIframe" class="callIframe" v-on:click="callIframe" ><i class="fi flaticon-right-arrow"></i> Voir le projet </span>
      </div>
      <div class="project__screen" v-for="(screen, index) in project.screens" :key="'screen_'+ index">
          <img :src="src + index + '.jpg' " alt=""/>
      </div>
    </div>
  </transition>
</template>
<script>
  import studentsList from '@/data/students.json'
  import iframeProject from '@/components/IframeProject.vue'

  export default {
    name: 'screenProject',
    props: ['project', 'categoryIdent', 'students', 'src', 'iframe', 'backLinkSrc'],
    components: {iframeProject},
    data () {
      return {
        showIframe: false,
        currentLink: this.$route.path
      }
    },
    computed: {
      studentsListOutput () {
        var students = []
        for (let i = 0; i < this.project.studentsList.length; i++) {
          let student = this.project.studentsList[i]
          students.push(studentsList.filter(studentList => student === studentList.id))
          if (i === this.project.studentsList.length - 1) {
            return students
          }
        }
      },
      srcIframe () {
        return `/projets/${this.categoryIdent}/${this.project.id}_${this.project.ident}/code/`
      },
      hasIframe () {
        return this.project.view === 'both'
      }
    },
    methods: {
      callIframe () {
        this.showIframe = true
      },
      hideIframe () {
        this.showIframe = false
      }
    }
  }
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: opacity 1s ease-in;
}

.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

  .project__screens {
    width: 940px;
    margin: 200px auto;
    .project__informations {
      margin: 0 auto 60px;
      text-align: left;
       h1 {
        text-transform: uppercase;
        opacity: 0.5;
        font-family: $font-aileron-light;
        letter-spacing: 3px;
        font-size: 13px;
        text-align: left;
      }
      h2 {
        font-family: $font-aileron-light;
        font-size: 30px;
        font-weight: bold;
        text-align: left;
        margin: 0 auto 10px;
      }
      .callIframe {
        text-transform: uppercase;
        font-family: $font-aileron-light;
        letter-spacing: 3px;
        font-size: 13px;
        color: $color-purple;
        cursor: pointer;
      }
      .back {
        display: block;
        text-align: left;
        text-decoration: none;
        &:before {
          cursor: pointer;
          font-size: 20px;
          color: $color-purple;
        }
      }
    }
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
</style>

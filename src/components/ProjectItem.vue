<template>
  <div class="projects__list-item">
    <div class="project__thumbnail">
        <div class="project__thumbnail-img" :style="styles">
        </div>
    </div>
    <h2>{{project.name}}</h2>
    <p>
      <span v-for="student in studentListOutput" :key="student.id">{{student[0].firstname}} {{student[0].lastname}} <em>({{student[0].option}})</em> - </span>
    </p>
  </div>
</template>

<script>
  import studentsList from '@/data/students.json'

  export default {
    name: 'projectItem',
    props: ['data', 'categoryIdent', 'categoryId'],
    data () {
      return {
        project: this.data
      }
    },
    computed: {
      studentListOutput () {
        var students = []
        for (let i = 0; i < this.project.studentsList.length; i++) {
          let student = this.project.studentsList[i]
          students.push(studentsList.filter(studentList => student === studentList.id))
          if (i === this.project.studentsList.length - 1) {
            return students
          }
        }
      },
      styles () {
        let url = ''
        if (this.project.screens && this.project.screens.length) {
          url = require(`../projets/${this.categoryIdent}/${this.project.id}_${this.project.ident}/screens/0.jpg`)
        } else {
          url = require(`../assets/images/thumbnail-${this.categoryId}.jpg`)
        }
        return {
          'background-image': `url(${url})`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .projects__list-item {
    cursor: pointer;
    width: 300px;
    height: 350px;
    float: left;

    &:nth-of-type(3n) {
      margin: 0 20px;
    }

    .project__thumbnail {
      width: 300px;
      height: 200px;
      overflow: hidden;

      &-img {
        width: 300px;
        height: 200px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        // background-image: url('../images/placeholder-thumbnail.png');
        transition: all 0.7s ease;
      }
    }

    h2 {
      // font-family: $font-walsheim-regular;
      margin: 15px 2px 10px 2px;
      font-size: 20px;
      line-height: 25px;
    }

    p {
      // font-family: $font-aileron-light;
      font-size: 12px;
      line-height: 20px;
      opacity: 0.8;
    }

    &:hover {
      .project__thumbnail {
        &-img {
          transform: scale(1.1);
        }
      }
    }
  }
</style>

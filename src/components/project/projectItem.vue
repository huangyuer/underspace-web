<template>
  <div class="project_item_wrapper">

    <img  v-show="project.cover !==''" :src="project.cover+ '?x-oss-process=image/resize,m_fill,w_280,h_180'" />

    <img v-show="project.cover === ''" src="../../assets/images/default.jpg" />

    <div class="project_item">
      <h4 v-text="project.title"></h4>
      <p >
        <span v-for="category in project.categories">{{category.name}}&nbsp;</span>
      </p>
      <p>
        <span v-for="tag in project.tags">{{tag}}&nbsp;</span>
      </p>
      <div class="divider"></div>
      <div class="project_item_footer">
        <img src="../../assets/images/eye_close_up.png"/>
        <span v-text="project.clicks"></span>
        <img src="../../assets/images/shape.png"/>
        <span v-text="project.era"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/project/projectItem";
</style>

<script>
  export default {
    props: {
      project: {
        cover: '',
        title: '',
        info: '',
        category: '',
        count: 0,
        date: ''
      }
    }
  }
</script>

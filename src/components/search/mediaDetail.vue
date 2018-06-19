<template>
  <div class="media-detail">
    <div class="header-bar">
      <div class="inner">
        <span @click="goBack">< &nbsp;返回</span>
      </div>
    </div>
    <div class="container">
      <div class="left-panel">
        <div class="inner">
          <div class="title">
            {{mediaDetail.title}}
          </div>
          <div class="img-container">
            <img :src="mediaDetail.url">
          </div>
          <div class="content">
            <span>{{mediaDetail.description}}</span>
          </div>
        </div>
      </div>
      <div class="right-panel">
        <div class="inner">
          <div class="subtitle">
            <span></span>
            <span>所属类别</span>
          </div>
          <div class="category">
            <span>{{mediaType}}</span>
          </div>
          <div class="underline">

          </div>
          <div class="subtitle">
            <span></span>
            <span>其它</span>
          </div>
          <div class="category">
            <span>{{mediaDetail.clicks}}次查看 </span>
          </div>
          <div class="underline">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../../src/assets/css/search/mediaDetail.scss';
</style>
<script>
  export default {
    mounted: function () {

    },
    components: {},
    data () {
      return {}
    },
    methods: {
      goBack: function () {
        this.$router.go(-1)
      }
    },
    computed: {
      mediaDetail: function () {
        return this.$store.state.mediaDetail.mediaDetail
      },
      mediaType: function () {
        switch (this.mediaDetail.type) {
          case 'bookformulas':
            return '公式'
            break
          case 'bookimages':
            return '图片'
            break
          case 'bookcharts':
            return '图表'
            break
          default:
            break
        }
      }
    },
    filters: {}

  }
</script>

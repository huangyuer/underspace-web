<template>
  <div class="image-item">
    <div class="img-container" @click="seeOrign">
      <img :src="cover" alt="">
    </div>
    <div class="content">
      <div class="inner">
        <div class="title" @click="seeOrign">
          <span>{{title}}</span>
        </div>
        <div class="text">
          <span v-html="summary"></span>
        </div>
        <div class="underline">

        </div>

        <div class="tool-bar">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tupian"></use>
          </svg>
          <span @click="seeOrign">查看详情</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yanjing"></use>
          </svg>
          <span>{{clicks}}次查看</span>
        </div>

        <div class="wap-tool-bar">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tupian"></use>
          </svg>
          <span @click="seeOrign">详情</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yanjing"></use>
          </svg>
          <span>{{clicks}}点击</span>
        </div>

      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/css/search/imageItem.scss";
</style>
<script>
  export default {
    props: ['obj', 'clicks', 'idd', 'cover', 'title', 'summary', 'type'],
    mounted: function () {

    },
    components: {},
    data () {
      return {
        mediaType: ''
      }
    },
    methods: {
      redirectDetail: function () {
        console.log(this.type)
        switch (this.type) {
          case '工程':
            this.$router.push('/project/info/' + this.idd)
            this.mediaType = 'project'
            sbreak
          case '工程师':
            this.$router.push('/engineer/info/' + this.idd)
            this.mediaType = 'engineer'
            break
          case 'bookimages':
            this.$router.push('/media/detail/' + this.idd)
            this.mediaType = 'bookimages'
            break
          case 'bookcharts':
            this.$router.push('/media/detail/' + this.idd)
            this.mediaType = 'bookchart'
            break
          case 'bookformulas':
            this.$router.push('/media/detail/' + this.idd)
            this.mediaType = 'bookformula'
            break
          default:
            break
        }
      },
      seeOrign: function () {
//        this.$store.commit('setMediaPopupUrl', this.cover)
//        this.$store.commit('setMediaPopupStatus', true)
//        this.$store.commit('setMediaPopupContent', this.summary)
//        this.$store.commit('setMediaPopupTitle', this.title)
        console.log(this.type)
        switch (this.type) {
//          case '工程':
//            this.$router.push('/project/info/' + this.idd)
//            this.mediaType = 'project'
//            sbreak
//          case '工程师':
//            this.$router.push('/engineer/info/' + this.idd)
//            this.mediaType = 'engineer'
//            break
          case 'bookimages':
            console.log('adfasdfasf')
//            this.$router.push('/media/detail/' + this.idd)
            this.mediaType = 'bookimages'
            break
          case 'bookcharts':
//            this.$router.push('/media/detail/' + this.idd)
            this.mediaType = 'bookchart'
            break
          case 'bookformulas':
//            this.$router.push('/media/detail/' + this.idd)
            this.mediaType = 'bookformula'
            break
          default:
            break
        }
        this.$store.commit('setMediaClicks', this.clicks)
        this.$store.commit('setMediaDetail', this.obj)
        this.$store.commit('setMediaType', this.mediaType)
        this.$router.push('/media/detail/' + this.idd)
      }
    },
    computed: {},
    filters: {}

  }
</script>

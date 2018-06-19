<template>
  <div class="media-popup" v-show="showMediaPopup">
    <div class="container">
      <div class="inner">
        <svg @click="hideMediaPopup" id="chahao" style="margin-left: 12px;" class="icon" aria-hidden="true">
          <use xlink:href="#icon-chahao1"></use>
        </svg>
        <div class="item item1">
          <img :src="url">
        </div>
        <div class="item item2">
          <div class="content">
            <span style="color: #1E518A;font-size: 20px;">{{title}}</span>
            <p style="font-size: 14px;">
              {{content}}
            </p>
          </div>
          <div class="bottom">
            <svg style="margin-left: 12px;" class="icon" aria-hidden="true">
              <use xlink:href="#icon-yanjing"></use>
            </svg>
            <span>{{clicks}}次查看</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/css/public/MediaPopup.scss";

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
      hideMediaPopup: function () {
        this.$store.commit('setMediaPopupStatus', false)
      }
    },
    computed: {
      showMediaPopup: function () {
        return this.$store.state.mediaPopup.popupStatus
      },
      url: function () {
        return this.$store.state.mediaPopup.url
      },
      content: function () {
        return this.$store.state.mediaPopup.content
      },
      title: function () {
        return this.$store.state.mediaPopup.title
      },
      clicks: function () {
        return this.$store.state.mediaPopup.clicks
      }
    },
    filters: {}

  }
</script>

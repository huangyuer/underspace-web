<template>
  <div class="not-found">
    <!-- <vue-particles
      color="#777"
      :particleOpacity="0.7"
      :particlesNumber="120"
      shapeType="circle"
      :particleSize="3"
      linesColor="#777"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="100"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="repulse"
      class="particles">
    </vue-particles> -->

    <div class="img-container">
      <img src="../../assets/images/404.png">
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/css/public/NotFound404.scss";
</style>
<script>
  import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'

  export default {
    mounted: function () {

    },
    components: {
      VueParticles,
    },
    data () {
      return {}
    },
    methods: {},
    computed: {},
    filters: {}

  }
</script>

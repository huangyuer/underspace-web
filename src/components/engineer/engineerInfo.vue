<template>
  <div class="engineer_info_wrapper">
    <back-bar></back-bar>
    <div class="engineer_info">
      <div class="engineer_info_left">
        <h3>{{engineer.name}}</h3>
        <p class="engineer_content" v-html="engineer.content"></p>
        <!-- 评论组件 -->
        <div style="margin:  0 auto;">
          <app-comment  kind="engineer" :srcId="engineerId"></app-comment>
        </div>
        <!-- 评论组件 -->
      </div>
      <div class="engineer_info_right">
        <h4><span>|&nbsp;</span><span class="blue">专长</span></h4>
        <p>
          <span v-for="profission in engineer.professions">{{profission}}&nbsp;</span>
        </p>

        <div class="engineer_info_right_img">
          <img v-show="engineer.avatar === ''" src="../../assets/images/default.jpg" />
          <img v-show="engineer.avatar !==''" :src="engineer.avatar + '?x-oss-process=image/resize,w_230'" />
        </div>

        <div class="divider" style="margin: 30px 0;"></div>
        <h4><span>|&nbsp;</span><span v-text="engineer.name" class="blue"></span></h4>
        <h5 v-text="engineer.category"></h5>
        <h5>
          <img src="../../assets/images/eye_close_up.png"/>
          <span>{{engineer.clicks||0}}</span>
          <img src="../../assets/images/star.png"/>
          <span>{{engineer.stars||0}}</span>
          <img src="../../assets/images/chat.png"/>
          <span>{{engineer.comment_count||0}}</span>
        </h5>
        <div class="print" @click="clickPrint">
          <span>打印本页</span>
        </div>
        <div class="divider" style="max-width:680px;margin: 30px 0;"></div>
      </div>
      </div>
      <div class="clear"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/css/engineer/engineerInfo";
</style>
<script>
import backBar from "../public/backBar.vue";
import AppComment from "../public/appComment.vue";

export default {
  data() {
    return {};
  },
  components: {
    backBar,
    AppComment
  },
  mounted() {
    this.getData();
  },
  computed: {
    engineerError() {
      return this.$store.getters.engineerError;
    },
    engineerId() {
      console.log(this.$route.params.engineerId);
      return this.$route.params.engineerId || "0";
    },
    engineer() {
      return this.$store.getters.engineerDetail;
    }
  },
  watch: {
    engineerError: {
      handler: function(val, oldVal) {
        if (val) {
          this.error = val;
          this.$message({
            showClose: true,
            message: val,
            type: "error"
          });
          this.$store.commit("clearEngineerError");
        }
      },
      deep: true
    },
    $route: "getData"
  },
  methods: {
    getData: function() {
      console.log(this.engineerId);
      this.$store.dispatch("getEngineerDetail", {
        engineerId: this.engineerId
      });
    },
    backHome: function() {
      this.$router.push("/engineer/list");
    },
    clickPrint: function() {
      window.print();
    }
  }
};
</script>

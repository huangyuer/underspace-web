<template>
  <div class="engineer_item_wrapper">

    <img v-show="engineer.avatar === ''" src="../../assets/images/default.jpg" />

    <img v-show="engineer.avatar !==''" :src="engineer.avatar" />


    <div class="engineer_item">
      <h4 v-text="engineer.name"></h4>
      <p>{{engineer.summary}}</p>
      <!--<p>{{engineer.summary|substr}}</p>-->
      <!--<p v-text="engineer.categories"></p>-->
      <div class="divider"></div>
      <div class="engineer_item_footer">
        <img src="../../assets/images/eye_close_up.png"/>
        <span v-text="engineer.clicks"></span>
        <img src="../../assets/images/shape.png"/>
        <span v-text="engineer.era"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/engineer/engineerItem";
</style>

<script>
  export default {
    data () {
      return {
        url: 'http://118.178.238.202:9988/'
      }
    },
    props: ['engineer'],
    // filters: {
    //   substr: function(value){
    //     if(! value) return '';
    //     value = value.toString();
    //     if(value.length > 40){
    //       return value.substr(0, 40) + '...';
    //     }else{
    //       return value;
    //     }
    //   },
    // }
  }
</script>

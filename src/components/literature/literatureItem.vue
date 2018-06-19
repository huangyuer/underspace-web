<template>
  <div class="literature_item_wrapper">

    <div class="literature_item_wrapper_img">
      <img  v-show="literature.cover !==''" :src="literature.cover+ '?x-oss-process=image/resize,m_fill,w_280,h_210'" />
      <img v-show="literature.cover === ''" src="../../assets/images/default.jpg" />
    </div>

    <div class="literature_item">
      <h4 v-text="literature.name"></h4>
      <p>{{literature.summary}}</p>
      <!--<p>{{literature.summary|substr}}</p>-->
      <h5>作者：{{literature.author}}</h5>
      <h5>
        <span v-for="category in literature.categories">{{category.name}}&nbsp;</span>
      </h5>
      <div class="divider"></div>
      <div class="literature_item_footer">
        <img src="../../assets/images/eye_close_up.png"/>
        <span>0</span>
        <!--<span v-text="literature.clicks">0</span>-->
        <img src="../../assets/images/shape.png"/>
        <span>23</span>
        <!--<span v-text="literature.era">23</span>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/literature/literatureItem";
</style>

<script>
  export default {
    props: {
      literature: {
        cover: '',
        title: '',
        info: '',
        category: '',
        count: 0,
        date: ''
      }
    },
    filters: {
      // substr: function(value){
      //   if(! value) return '';
      //   value = value.toString();
      //   if(value.length > 200){
      //     return value.substr(0, 200) + '...';
      //   }else{
      //     return value;
      //   }
      // },
    }
  }
</script>

<template>
  <div class="book_info">
    <search-component></search-component>
    <nav-bar firstUrl="/" firstNav="首页" secondUrl="/book/list" secondNav="图书列表" :thirdUrl="'/book/info/' + bookId" :thirdNav="bookDetail.name"></nav-bar>
    <book-category-bar></book-category-bar>

    <div class="book_list_main">

      <category-left></category-left>

      <div class="main_left">
        <div class="list_cent">
          <div class="book_li">
            <h3>{{bookDetail.name}}</h3>
            <dl>
              <dd class="left">
                <div class="dl_img">
                  <img :src="coverUrlPrefix + bookDetail.cover" alt="">
                </div>
              </dd>
              <dd class="right">
                <p>英文书名：<span>{{bookDetail.enName}}</span></p>
                <p>作者：<a href="javascript:;">{{bookDetail.chiefEditor}}</a></p>
                <p>出版社：<span>{{bookDetail.publisher}}</span></p>
                <p>出版日期：<span>{{bookDetail.publishedAt}}</span></p>
                <p>印张数：<span>{{bookDetail.sheets}}</span></p>
                <p>定价：<span>{{bookDetail.price}}</span></p>
                <div class="btn-container">
                  <div class="btn" @click="readPdf(bookDetail)">PDF阅读</div> <div @click="readHtml(bookDetail)" class="btn">HTML阅读</div>
                </div>
              </dd>
            </dl>
          </div>
          <div class="clear"></div>
          <div class="book_bt"><span>内容介绍</span></div>
          <div class="book_info">
            <p v-if="bookDetail.summary" v-html="bookDetail.summary"></p>

            <p v-else>无</p>

          </div>
          <div class="book_bt"><span>作者介绍</span></div>
          <div class="book_author">
            <p v-if="bookDetail.authorInfo"> {{bookDetail.authorInfo}}</p>
            <p v-else>无</p>
          </div>
        </div>
      </div>

     <!--  <similar-right></similar-right> -->
       <list-right></list-right>

    </div>
    <div class="clear"></div>

  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/book/bookInfo";
</style>
<script>
  import searchComponent from '../public/searchComponent.vue'
  import navBar from '../public/navBar.vue'
  import bookCategoryBar from './bookCategoryBar.vue'
  import categoryLeft from './categoryLeft.vue'
  import similarRight from './similarRight.vue'
  import {DataTree} from '../../utils/data_tree'
  import listRight from './bookListRight.vue'
  const isMobile = require('ismobilejs');

  export default {
    name: 'book_info',
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      }
    },
    components: {
      navBar,
      searchComponent,
      similarRight,
      bookCategoryBar,
      categoryLeft,
      listRight
    },
    mounted:function(){
       this.init();
    },
    computed:{
      bookId(){
        return this.$route.params.bookId || '0';
      },
      bookDetail(){
        return this.$store.getters.bookDetail;
      },
      coverUrlPrefix(){
        return this.$store.getters.coverUrlPrefix;
      }
    },
    methods: {
      init: function(){
        this.$store.dispatch('getBookDetail', {'bookId': this.bookId});
      },
      readPdf: function(bookDetail){
        let pdfUrl = this.$store.state.BOOKS_PDF_SERVER_PREFIX + bookDetail.pdf
        if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
          pdfUrl = this.$store.state.BOOKS_PDF_MOBILE_SERVER_PREFIX + bookDetail.pdf 
        }
        console.log(pdfUrl)
        window.location.href = pdfUrl
      },
      readHtml: function(bookDetail){
        let htmlUrl = '/book/content/' + bookDetail._id + '/chapter?src=Text%2Fchapter1.html'
        console.log(htmlUrl)
        this.$router.push(htmlUrl)
      },
      handleNodeClick(data, node) {
        //
      },
    }
  }
</script>

<template>
  <div class="book_list">

    <search-component></search-component>
    <nav-bar firstUrl="/" firstNav="首页" secondUrl="/book/list" secondNav="图书列表"></nav-bar>
    <div class="book_list_main">
      <book-list-left></book-list-left>

      <div class="main_left">
        <div class="list_cent">
          <!--wap tool bar-->
          <book-tool-bar></book-tool-bar>

          <tool-bar></tool-bar>

          <div class="list_center">

            <div class="list_count">找到&nbsp;<font color="#E37423">{{booksTotal}}</font>&nbsp;条结果</div>

            <book-list-center></book-list-center>

            <div class="clear"></div>
            <div style="width: 100%; margin: 20px auto; text-align: center;" class="paginator">
              <el-pagination
                small
                background
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="booksTotal" :current-page="currentPage" :page-size="pageSize">
              </el-pagination>
            </div>
          </div>

        </div>
      </div>

      <book-list-right></book-list-right>
    </div>
    <div class="clear"></div>

  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/book/bookList";
</style>

<script>
  import {checkLoginCookie, getCookie} from '../../assets/js/cookie'
  import toolBar from '../search/toolBar.vue'
  import bookToolBar from '../book/bookToolBar.vue'
  import navBar from '../public/navBar.vue'
  import searchComponent from '../public/searchComponent.vue'
  import bookListCenter from './bookListCenter.vue'
  import bookListLeft from './bookListLeft.vue'
  import bookListRight from './bookListRight.vue'
  import pagination from '../public/pagination.vue'
  export default {
    name: 'book_list',
    data () {
      return {
        url: 'http://118.178.238.202:9988/'
      }
    },
    props: {
    },
    components: {
      bookToolBar,
      toolBar,
      navBar,
      searchComponent,
      pagination,
      bookListLeft,
      bookListCenter,
      bookListRight,
    },
    mounted: function() {
      this.getLatestBooks(this.currentCategory,this.currentClc, this.currentLib,this.pageSize, this.currentPage);
    },
    watch:{
      currentCategory: {
        handler: function (val, oldVal) {
          this.getLatestBooks(val, this.currentClc, this.currentLib, this.pageSize, this.currentPage);
        }
      },
      currentClc: {
        handler: function (val, oldVal) {
          this.getLatestBooks(this.currentCategory, val, this.currentLib, this.pageSize, this.currentPage);
        }
      },
      currentLib: {
        handler: function (val, oldVal) {
          this.getLatestBooks(this.currentCategory, this.currentClc, val, this.pageSize, this.currentPage);
        }
      },
    },
    computed: {
      userInfo () {
        let userInfo = getCookie('userInfo');
        if (userInfo) {
          let user = JSON.parse(userInfo);
          return user;
        } else {
          return this.$store.getters.userInfo;
        }
      },
      isSearchResult () {
        return this.$store.getters.latestBooks.isSearchResult;
      },
      booksTotal(){
        return this.$store.getters.booksTotal;
      },
      currentCategory(){
        let category = this.$route.query.category || '';
        return category;
      },
      currentLib(){
        let lib = this.$route.query.lib || '';
        return lib;
      },
      currentClc(){
        let clc = this.$route.query.clc || '';
        return clc;
      },
      pageSize(){
        let pageSize = this.$route.query.limit || 20;
        return parseInt(pageSize);
      },
      currentPage(){
        let currentPage = this.$route.query.page || 1;
        return parseInt(currentPage);
      }
    },
    methods: {
      createBook: function(){
        this.$router.push('/book/create');
      },
      uploadBook: function(){
        this.$router.push('/book/uploader');
      },
      getLatestBooks: function(category,clc, lib, limit,page){
        this.$store.dispatch('getLatestBooks', {'category': category, 'clc': clc, 'lib': lib,'limit': limit, 'page': page});
      },
      handleCurrentChange(val) {
        if(this.isSearchResult){
          this.search(this.pageSize, val);
        }else{
          this.getLatestBooks(this.currentCategory, this.currentClc, this.currentLib, this.pageSize, val);
        }
        document.documentElement.scrollTop = 0;
      },
      search: function(limit, page){
        let keywords = this.searchForm.keywords;
        this.$store.dispatch('searchBooks', {'keywords': keywords, 'limit': limit, 'page': page});
      }
    }
  }
</script>


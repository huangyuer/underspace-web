<template>
  <div class="z_bg">
  <div class="grzx_main">
    <user-left-menu></user-left-menu>
  <div class="grzx_right">
    <div class="grzx_right1">
      <p>收藏夹</p>
    </div>
    <div class="grzx_rightul">
     <!--  <ul>
        <li><a href="" class="a_hover">图书</a></li>
        <li><a href="">工程师</a></li>
        <li><a href="">工程图书</a></li>
        <li><a href="">公式</a></li>
      </ul> -->
    </div>
    <div class="grzx_right_table">
      <table width="100%" border="1">
        <tr>
          <td width="80%" class="td_1">详情</td>
          <td width="20%" class="td_1">操作</td>
        </tr>

        <tr v-for="book in favoriteBooks">
          <td width="80%">{{book.name}}</td>
          <td width="20%">
            <router-link :to="'/book/info/' + book._id">详情</router-link>
            <a @click="cancelFavoriteBook(book)" href="javascript:;">取消收藏</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
  </div>
</div>
</template>

<script>
  import UserLeftMenu from './leftMenu'

  export default {
    name: 'user_favorites',
    data () {
      return {
      }
    },
    components:{
      'user-left-menu': UserLeftMenu
    },

    methods: {
      cancelFavoriteBook: function(book){
        this.$store.dispatch('removeUserFavoriteBooks', {'bookId': book._id})
      }
    },
    computed: {
      favoriteBooks(){
        return this.$store.getters.favoriteBooks;
      },
      favoriteBooksReady(){
        return this.$store.getters.favoriteBooksReady;
      }
    },
    mounted () {
      this.$store.dispatch('getFavoriteBooks', {});
    }

  }
</script>

<style>
</style>

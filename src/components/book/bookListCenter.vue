<template>
  <div class="list_li">
    <!--<image-text-item :obj="i" :idd="i.id" :type="i.type" :author="i.chiefEditor" :name="i.name" :year="i.publishedAt"-->
                     <!--:cover="i.cover"-->
                     <!--:keywords="i.keywords" v-for="i in latestBooks" :content="i.highlight"-->
                     <!--:key="i.id"></image-text-item>-->
    <ul>
      <li v-for="book in latestBooks">
        <div class="list-item">
          <div class="item-left">
            <div class="title" @click="toBookDetail(`${book._id}`)">
              <span v-text="book.name"></span>
            </div>
            <div class="subtitle">
              <div class="category" v-show="book.categories !== ''">
                <span v-for="category in book.categories" v-text="category"></span>
              </div>
              <div class="category-brother">
                <span v-text="'主编：' + book.chiefEditor"></span>
                <span v-text="'出版年份：' + book.publishedAt.substring(0, 4) + '年'"></span>
              </div>
            </div>

            <div class="content">
              <span v-html="book.summary">
              </span>
            </div>

            <div class="btn-container">
              <div class="btn" @click="toBookContent(`${book._id}`)">在线阅读</div>
              <!--<div>-->
                <!--<div v-if="!obj.isFavorited" class="btn" @click="addFavorite">加入收藏</div>-->
                <!--<div v-else class="btn" @click="removeFavorite">取消收藏</div>-->
              <!--</div>-->
            </div>
          </div>
          <div class="item-right">
            <div class="img-wrapper">
              <img :src="preFix + book.cover">
            </div>
          </div>

          <div class="clear-line"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/book/bookListCenter";
</style>

<script>
  import imageTextItem from '../search/imageTextItem'
  export default {
    data () {
      return {
        preFix: this.$store.state.IMAGE_SERVER_PREFIX
      }
    },
    components: {
      imageTextItem
    },
    computed: {
      latestBooks () {
        return this.$store.getters.latestBooks
      }
    },
    methods: {
      // 加入收藏夹
      addToFav: function (book) {
        this.$store.dispatch('addUserFavoriteBooks', {'bookId': book._id, 'userId': this.userInfo.userId})
      },
      // 移除收藏夹
      removeFromFav: function () {
        //
      },
      toBookDetail: function (bookId) {
        this.$router.push({path: '/book/info/' + bookId})
      },
      toBookContent: function (bookId) {
        // let htmlUrl = '/book/content/' + bookId + '/chapter?src=Text%2Fchapter1.html'
        let htmlUrl = '/book/info/' + bookId
        this.$router.push(htmlUrl)
      }
    },
    mounted () {
      console.log(this.latestBooks)
    }
  }
</script>

<template>
  <div class="paginator" v-show="total>0">
    <div class="item" @click="prevPageClick">
      <span><<</span>
    </div>
    <div @click="pageClick(i.name)" class="item" :class="{'item-active': i.active}" v-for="i in displayPageList">
      <span>{{i.name}}</span>
    </div>
    <div class="item" @click="nextPageClick">
      <span>>></span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/public/paginator.scss';
</style>
<script>
  export default {
    mounted: function () {
      console.log('mounted....')
      this.displayPageList = []
      var t = this.totalPage > 5 ? 5 : this.totalPage
      for (var i = 1; i <= t; i++) {
        var p = {
          name: i,
          active: false
        }
        if (i === 1) {
          p.active = true
        }
        this.displayPageList.push(p)
      }
    },
    components: {},
    data () {
      return {
        currentPage: 1,
        displayPageList: []
      }
    },
    methods: {
      pageClick: function (name) {
        let p = {
          clickPage: name,
        }
        this.$emit('pageClick', p)
        let lastPage = this.lastPage
        let firstPage = this.firstPage
//        console.log('currentPage: ' + name + ', firstPage:  ' + firstPage.name + ',  lastPage: ' + lastPage.name)
        // 代表是最后一页
        if (name === lastPage.name) {
          if (this.displayPageList.length > 4) {
            this.displayPageList = []
            var lpage = lastPage.name + 5
            if (lpage > this.totalPage) {
              lpage = this.totalPage + 1
            }
            for (var i = lastPage.name; i < lpage; i++) {
              if (i === lastPage.name) {
                var t = {
                  name: i,
                  active: true,
                }
              } else {
                var t = {
                  name: i,
                  active: false,
                }
              }
              this.displayPageList.push(t)
            }
          } else {
//            console.log('bingo...')
            this.setActivePage(this.lastPage.name)
          }
        }
        // 代表是第一页
        if (name === firstPage.name) {
          if (firstPage.name > 4) { //  避免出现负页数
            console.log('bingo...')
            this.displayPageList = []
            for (var i = firstPage.name; i > firstPage.name - 5; i--) {
              if (i === firstPage.name) {
                var tp = {
                  name: i,
                  active: true,
                }
              } else {
                var tp = {
                  name: i,
                  active: false,
                }
              }
              this.displayPageList.unshift(tp)
            }
          } else {
            this.setActivePage(firstPage.name)
          }
        }
        if (name === firstPage.name || name === lastPage.name) {
        } else {
          this.setActivePage(name)
        }
      },
      prevPageClick: function () {
        var firstPage = this.firstPage
        if (firstPage.name === 1) {

        } else {
          this.displayPageList = []
          for (var i = firstPage.name; i > firstPage.name - 5; i--) {
            var p = {
              name: i,
              active: false
            }
            if (i === firstPage.name - 4) {
              p.active = true
            }
            this.displayPageList.unshift(p)
          }
        }
      },
      nextPageClick: function () {
        var lastPage = this.lastPage
        if (lastPage.name === this.totalPage) {
          //如果当前显示的页码已经是最后一页的页码，不做任何处理
        } else {
          var shouldPage = lastPage.name + 4
          if (shouldPage > this.totalPage) { // 理应的最后一页
            shouldPage = this.totalPage
          } else {
            // none
          }
          this.displayPageList = []
          for (var i = lastPage.name; i <= shouldPage; i++) {
            var p = {
              name: i,
              active: false
            }
            if (i === lastPage.name) {
              p.active = true
            }
            this.displayPageList.push(p)
          }
        }
      },
      setActivePage: function (num) {
        for (var i = 0; i < this.displayPageList.length; i++) {
          if (num === this.displayPageList[i].name) {
            this.displayPageList[i].active = true
          } else {
            this.displayPageList[i].active = false
          }
        }
      }
    },
    computed: {
      rows: function () {
        return this.$store.state.paginator.rows
      },
      totalPage: function () {
        return Math.ceil(this.total / this.rows)
      },
      lastPage: function () {
        return this.displayPageList[this.displayPageList.length - 1]
      },
      firstPage: function () {
        return this.displayPageList[0]
      },
      total: function () {
        return this.$store.state.paginator.total
      }
    },
    filters: {},
    watch: {
      total: function (val) {
        console.log('total page...' + val)
        this.displayPageList = []
        var t = this.totalPage > 5 ? 5 : this.totalPage
        for (var i = 1; i <= t; i++) {
          var p = {
            name: i,
            active: false
          }
          if (i === 1) {
            p.active = true
          }
          this.displayPageList.push(p)
        }
      }
    }

  }
</script>

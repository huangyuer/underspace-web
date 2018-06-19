<template>
  <div class="pages" v-show="displayPagination">
    <div class="list_text3">
      <a href="javascript:;" @click="showPreviousPages(0)"><</a>
      <a href="javascript:;" @click="showPreviousPages()" v-if="pageNum > 1">...</a>
      <a href="javascript:;" v-for="page in pageSize" v-if="page + (pageNum - 1) * pageSize <= pages" @click="pageClick(page + (pageNum - 1) * pageSize)" v-text="page + (pageNum - 1) * pageSize"></a>
      <a href="javascript:;" @click="showNextPages()" v-if="pageNum * pageSize < pages">...</a>
      <a href="javascript:;" @click="showNextPages(0)">></a>
    </div>
    <div class="list_pages">第<span v-text="currentPage"></span>页／共<span v-text="pages"></span>页</div>
  </div>
</template>

<script>
  export default {
    mounted () {
      console.log(this.currentPage)
    },
    data () {
      return {
        pages: 1, // 总页数
        pageSize: 5, // 列表上展示的页数
        pageNum: 1 // 翻页数
      }
    },
    props: {
      total: {
        type: Number,
        required: true
      },
      row: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    watch: {
      total: 'watchPages'
    },
    methods: {
      // 翻页 上一页/最顶页
      showPreviousPages: function (param) {
        if (param === 0) {
          this.pageNum = 1
        }
        if (this.pageNum > 1) {
          this.pageNum -= 1
        }
      },
      // 翻页 下一页/最末页
      showNextPages: function (param) {
        let pageNum = Math.ceil(this.pages / this.pageSize) // 0-0 1-1
        if (param === 0) {
          this.pageNum = pageNum
        }
        if (pageNum === 0) {
          this.pageNum = 1
        }
        if (this.pageNum < pageNum) {
          this.pageNum += 1
        }
      },
      // 加载页数
      watchPages: function () {
        if (this.total > 0) {
          this.pages = Math.ceil(this.total / this.row)
        }
      },
      // 传递给父组件渲染数据
      pageClick: function (page) {
        let p = {
          clickPage: page,
          currentPage: this.currentPage,
          totalPage: this.total
        }
        console.log(p)
        // 定时器 逐渐回到顶部
        var timer = null
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn(){
          var oTop = document.body.scrollTop || document.documentElement.scrollTop;
          if(oTop > 0){
            document.body.scrollTop = document.documentElement.scrollTop = oTop - 30;
            timer = requestAnimationFrame(fn);
          }else{
            cancelAnimationFrame(timer);
          }
        });
        this.$emit('pageClick', p)
      }
    },
    computed: {
      displayPagination: function () {
        if (this.total > 0) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

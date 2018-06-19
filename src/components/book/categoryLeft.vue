<template>
  <div class="list_left">
    <div class="class_title">
      <span>本书目录</span>
    </div>
    <div class="clear"></div>

    <!-- 客户端 -->
    <div class="web-book-category">
      <el-table
        :data="catalogs"
        style="width: 100%"
        :row-style="showRow">
        <el-table-column
          prop="name"
          label="本书目录">
          <template slot-scope="scope">
             <div v-if="scope.row">
              <span v-for="space in scope.row.level" class="ms-tree-space">
                &nbsp;&nbsp;
              </span>
            <el-button  v-if="scope.row.isLeaf===true" type="text" icon="el-icon-document"></el-button>
            <el-button @click="toggle(scope.row,index)"  v-else-if="scope.row.expanded===true"  type="text" icon="el-icon-caret-bottom"></el-button>
            <el-button @click="toggle(scope.row,index)" v-else type="text" icon="el-icon-caret-right"></el-button>
            <a href="javascript:;">
              <span @click="openChapter(scope.row)" style="color: #4A4A4A">{{scope.row.name}}</span>
            </a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 移动端 -->
    <div class="wap-book-category" v-show="bookCategoryVisible">

      <div class="class-title">
        <span>本书目录</span>
        <div class="title-img-close">
          <a href="javascript:;" @click="hideBookCategory()">
            <img src="../../assets/images/wap_cross.png" />
          </a>
        </div>
      </div>

      <el-table
        :data="catalogs"
        style="width: 100%"
        :row-style="showRow">
        <el-table-column
          prop="name"
          label="本书目录">
          <template slot-scope="scope">
              <span v-for="space in scope.row.level" class="ms-tree-space">
                &nbsp;&nbsp;
              </span>
            <el-button  v-if="scope.row.isLeaf===true" type="text" icon="el-icon-document"></el-button>
            <el-button @click="toggle(scope.row,index)"  v-else-if="scope.row.expanded===true"  type="text" icon="el-icon-caret-bottom"></el-button>
            <el-button @click="toggle(scope.row,index)" v-else type="text" icon="el-icon-caret-right"></el-button>
            <a href="javascript:;">
              <span @click="openChapter(scope.row)" style="color: #4A4A4A">{{scope.row.name}}</span>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/book/categoryLeft";
</style>

<script>
  import {DataTree} from '../../utils/data_tree'
  export default {
    mounted () {
      this.init()
    },
    computed: {
      bookId(){
        return this.$route.params.bookId || '0';
      },
      currentCatalog(){
        return this.$store.getters.currentCatalog;
      },
      treeCatalogs(){
        let catalogs = [];
        let oriCatalogs = this.$store.getters.bookCatalogs;
        if(oriCatalogs && oriCatalogs.length > 0){
          catalogs = DataTree.build(oriCatalogs);
        }
        return catalogs;
      },
      catalogs(){
        let catalogs = [];
        catalogs  = this.treeToArray(this.treeCatalogs);
        return catalogs;
      },
      bookCategoryVisible () {
        return this.$store.getters.bookCategoryVisible
      }
    },
    methods: {
      init: function () {
        this.$store.dispatch('listBookCatalogs', {'bookId': this.bookId, 'limit': 1000, 'page':1 });
      },
      showRow: function (row, index) {
        let show = row['row'].display ? true : false;
        return show ? '' : 'display:none;'
      },
      treeToArray: function(oriCatalogs){
        let a = new Array();
        for(let catalog of oriCatalogs){
          this.traverse(a, catalog);
        }
        return a;
      },
      // 遍历节点，并将节点压入数组
      traverse: function(a, node){
        let newNode = {};
        for(let f in node){
          newNode[f] = node[f];
        }
        var children = newNode.children;
        a.push(newNode);
        if(children && children.length > 0){
          for(let child of children){
            this.traverse(a, child);
          }
        }
      },
      toggle: function(row, index){
        row.expanded = ! row.expanded;
        let parentId = row._id;
        let a = new Array();
        this.getAllChildren(a, parentId);
        for(let catalog of this.catalogs){
          if(a.indexOf(catalog._id) >= 0){
            catalog.expanded = row.expanded;
            catalog.display = row.expanded;
          }
        }
      },
      getAllChildren(a, parentId){
        for(let catalog of this.catalogs){
          if(catalog.parentId === parentId){
            a.push(catalog._id);
            this.getAllChildren(a, catalog._id);
          }
        }
      },
      openChapter: function(chapter){
        this.hideBookCategory()
        this.$router.push('/book/content/' + this.bookId + '/chapter?src=' + chapter.src);
        document.documentElement.scrollTop = 0;

      },
      hideBookCategory: function () {
        this.$store.commit('setBookCategoryVisible', false)
      }
    }
  }
</script>

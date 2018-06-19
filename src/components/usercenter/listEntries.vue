<template>
<div class="z_bg">
    <div class="grzx_main">
     
      <user-left-menu></user-left-menu>
      <div class="grzx_right">
          <el-table
          :data="entries"
          style="width: 100%"> 
          <el-table-column  
            label="图片"
            width="180">
              <template slot-scope="scope">
              <img v-show="scope.row.cover" width="64" height="64" :src="scope.row.cover+'?x-oss-process=image/resize,w_100'" />  
              <img v-show="!scope.row.cover" width="64" src="/asssets/images/default.jpg">
           </template>
          </el-table-column>
          <el-table-column 
            prop="title"
            label="标题">
            <template slot-scope="scope">
              <router-link :to="'/entry/detail/' + scope.row._id">{{scope.row.title}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="kind"
            label="分类"
            width="180"> 
          </el-table-column>  
          <el-table-column
            :context="_self" 
            label="操作">
             <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button>  
              <el-button
                size="small"
                type="danger"
                @click="confirmDelete(scope.$index, scope.row)">
                删除
              </el-button>
              </template> 
          </el-table-column>
        </el-table> 
        </div>
   </div>  
  </div>
</template> 
<style>
  .body-content{margin-top: 120px;}
</style>

<script> 
  import UserLeftMenu from './leftMenu'
  import api from '../../store/api/entry';

  export default{
    name: 'EntryList', 
    data(){
      return { 
        msg: '词条列表', 
        deleteConfirmVisible: false,  
      }
    },  
    mounted: function(){
      this.getData();
    },
    computed: {
      entries(){
        return this.$store.getters.entries;
      },
      entryDeleteStatus(){
        return this.$store.getters.entryDeleteStatus;
      },
      entryDeleteResult(){
        return this.$store.getters.entryDeleteResult;
      },
      
      sectionItemDetail(){
        return this.$store.getters.sectionItemDetail;
      }
    },
    components: {
      'user-left-menu': UserLeftMenu
    },
    watch: { 
      entryDeleteStatus: {
        handler: function (val, oldVal) { 
          if(val){ 
            this.$message({
              showClose: true,
              message: '词条删除成功',
              type: 'success'
            });  
          } 
        },
        deep: true
      }
    },
    methods: { 
      getData: function(){ 
        this.$store.dispatch('getMyEntries', {});
      }, 
      handleEdit: function(index, row){
        this.$router.push('/user/edit/entry/' + row._id);
      },
      showDeleteConfirm: function(){
        this.deleteConfirmVisible = true;
      },
      handleDelete: function(index, row) {    
        this.deleteConfirmVisible = false;
        this.$store.dispatch('deleteEntry', row._id);
        //this.entries.splice(index, 1);
        window.history.go(0);
      }, 
      cancelDelete:function(){ 
        console.log(this.deleteConfirmVisible);
        this.deleteConfirmVisible = false;
      },
      confirmDelete(index, row) {
        this.$confirm('此操作将永久删除该词条, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(index);
          this.handleDelete(index, row);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      } 
    }
  }
</script>
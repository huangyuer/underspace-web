<template> 
		<div class="form" id="entry-form">  
  		<el-form :model="entryForm" label-width="100px" :rules="rules" ref="entryForm"> 
  		<el-form-item label="标题" prop="title">
    		<el-input v-model="entryForm.title" placeholder=""  auto-complete="off"></el-input> 
  		</el-form-item>
      <el-form-item label="类别" required>  
          <el-col :span="12">
           <el-form-item prop="kind">
             <el-select placeholder="请选择类别"  style="width: 100%;" v-model="entryForm.kind">
            <el-option v-for="kind in kinds" :label="kind"
                :value="kind"> 
            </el-option>
           </el-select>
           </el-form-item>
          </el-col>  
      </el-form-item>  
      <el-form-item label="图片" prop="cover">
        <cover-uploader v-model="entryForm.cover" :initFile='entryForm.cover'  btnTitle="上传图片像" :handleRemove="handleRemove" :handleSuccess="uploadCoverSuccess"></cover-uploader>
      </el-form-item> 
  		<el-form-item label="摘要" prop="summary">
    		<el-input type="textarea" v-model="entryForm.summary" placeholder="" auto-complete="false"></el-input> 
  		</el-form-item> 
  		<el-form-item label="简介" placeholder="简介" prop="content"> 
        <app-editor 
            :input-content="initContent"
            :upload-url="uploadUrl"
            v-model="entryForm.content">
          </app-editor>
  		</el-form-item>
      <el-form-item label="标签" prop="strTags">
        <el-input v-model="entryForm.strTags" placeholder="多个标签间以空格分隔"  auto-complete="off"></el-input> 
      </el-form-item> 
  		<el-form-item label="">
    		<el-button class="save-btn" size="large" type="primary" @click="saveEntry()">保存</el-button>  
    	</el-form-item> 
  		</el-form>
  </div> 
</template>
<style>
  .form{padding:20px;}
</style>

<script> 
  import AppEditor from '../public/app-editor.vue';
  import CoverUploader from '../public/cover-uploader.vue'; 
   
  var moment = require('moment');
  import {getCookie, deleteCookie} from '../../utils/cookie';
  export default{
    name: 'EntryForm',
    data(){
      return {
        kinds: [ '工程师', '工程', '工程文献'],
        entryForm: {
          _id: '',
          title: '',
          kind: '',
          summary: '', 
          content: '', 
          tags: [],
          strTags: '',
        }, 
        initContent: '',
        uploadUrl: 'http://api.tongjix.cn/v1/uploader/upload',
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur'}, 
          ], 
          kind: [
            { required: true, message: '请选择类别', trigger: 'change'},
          ],  
          summary: [
            { required: false, message: '请输入摘要', trigger: 'blur' },  
          ], 
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' },  
          ],  
        },
      }
    }, 
    props: ['entryId', 'entryDetail'],
    mounted: function(){ 
       this.getData();
    },
    beforeCompile: function () {
      //this.init();
    },
    components:{
       'app-editor': AppEditor,
       'cover-uploader': CoverUploader, 
    },
    computed: { 
      entryError () {
        return this.$store.getters.entryError;
      },
      entrySaveStatus(){
        return this.$store.getters.entrySaveStatus;
      }, 
      entryDetailReady(){  
        return this.$store.getters.entryDetailReady;
      }
    }, 
    watch:{
      entryError: {
        handler: function (val, oldVal) { 
          if(val){ 
            this.$message({
              showClose: true,
              message: 'val',
              type: 'error'
            });
            this.$store.commit('clearEntryError');
          } 
        },
        deep: true
      },
      entrySaveStatus: {
        handler: function (val, oldVal) { 
          if(val){ 
            this.$message({
              showClose: true,
              message: '词条保存成功',
              type: 'success'
            });
            this.$router.push('/user/list/entries');
          } 
        },
        deep: true
      },
      entryDetailReady: {
        handler: function (val, oldVal) { 
           this.init();
        },
        deep: true
      }
    },
    methods: {
      init: function() {  
        for(let k in this.entryDetail){   
          if(k === 'tags'){ 
            this.entryForm[k] = [];
            for(let item of this.entryDetail[k]){
              console.log('entryForm[k]', this.entryForm[k]);
              this.entryForm[k].push(item);
            }
          }else{
            this.entryForm[k] = this.entryDetail[k]; 
          } 
        }
        this.initContent = this.entryDetail.content;
      },
      getData: function() { 

      },
      saveEntry: function() {  
        this.$refs.entryForm.validate((valid) => {
          if (valid) {
            console.log(this.entryForm);
            let userId = getCookie('userId'); 
            let entryId = this.$route.params.id || '';
            let tags = [];
            if(this.entryForm.strTags && this.entryForm.strTags.length > 0){
              tags = this.entryForm.strTags.split(' ');
            }
            this.entryForm.tags = tags;
            this.entryForm.author = userId; 
            if(entryId){ 
              this.$store.dispatch('putEntry', this.entryForm); 
            }else{
              delete(this.entryForm._id);
              this.$store.dispatch('postEntry', this.entryForm); 
            }
          }
          else{
            this.$message({
              showClose: true,
              message: '请检查是否正确填写了相关内容',
              type: 'error'
            });
          }
        }); 
      },
      handlePreview: function (file) {
        console.log(file);
      },
      handleRemove: function (file) {
        console.log(file);
      },
      uploadCoverSuccess: function (response, file, fileList) { 
        this.entryForm.cover = response.url; 
      },
      handleError: function (err, response, file) {
        console.log('error');
      }
    } 
  }
</script>
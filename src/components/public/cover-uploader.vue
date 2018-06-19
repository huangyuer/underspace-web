<template>
  <div>  
    <el-upload
          class="cover-uploader"
          drag
          action="http://api.tongjix.cn/v1/uploader/upload" 
          :headers="headers"
          :accept="uploadType"
          :multiple="false"
          :data="uploadData"
          :show-upload-list="false"
          :thumbnail-mode="true"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload" 
          :file-list="fileList">
          <img v-if="imageUrl" :src="imageUrl" class="thumb">
           <i class="el-icon-upload"></i>
          <div class="el-dragger__text"><em>{{btnTitle}}</em></div> 
    </el-upload>
  </div> 
</template>

<style>
  .cover-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .cover-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .thumb {
    width: 178px;
    height: 178px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>

<script> 
  var md5 = require('js-md5');
  var moment = require('moment');
  import {getCookie, deleteCookie} from '../../utils/cookie';
  export default{
    name: 'CoverUploader',
    data(){
      return {
        msg: '封面上传', 
        uploadType:'',
          
      }
    }, 
    mounted: function () {
      this.getUploadToken();
    },
    props: ['handleSuccess',   'btnTitle', 'initFile', 'showUploadList', 'multiple', 'thumbnailMode'],
    components:{ 
    },
    computed: {  
      uploadToken:function(){
        return this.$store.getters.uploadToken;
      },
      headers: function(){
        let token = getCookie('sessionToken'); 
        return {'Authorization': token}
      },
      uploadData: function () { 
        return {
          'key': '',
          'OSSAccessKeyId': this.uploadToken.accessId, 
          'policy': this.uploadToken.policy,
          'success_action_status': '200',
          'callback': this.uploadToken.callback,
          'signature': this.uploadToken.signature
        }
      }, 
      imageUrl: function(){
        if(this.initFile){
          return this.initFile;
        }
      },
      fileList: function(){
        if(this.initFile){
          return [{name: this.initFile, url: this.initFile}];
        }else{
          return [];
        }
        
      }
    }, 
    watch:{ 
    },
    methods: { 
      getUploadToken: function(){
        this.$store.dispatch('getUploadToken', {'authorizationToken': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZWM2N2JlM2U0OGJhNmI0MmQ1ZGUzNiIsImlhdCI6MTQ5NDIyMTg1OSwiZXhwIjoxNDk0ODI2NjU5fQ.j7UR_LAdYWgGUhD0oVhPQysRBy2LujwCIzmMusrAtKQ'}); 
      },
      handlePreview: function (file) {
        //console.log(file);
      },
      handleError: function (err, response, file) {
        //console.log('error');
      },
      handleRemove: function(file){

      },
      beforeUpload: function (file) {
        let hash = md5.create();
        let m = moment.now();
        hash.update(file.name + m);
        //this.uploader.key = 'upload/' + hash.hex();
        this.uploadData.key = 'upload/' + hash.hex(); 
        
      },
      callbackMethod: function () {
        console.log('called....');
      },
    } 
  }
</script>
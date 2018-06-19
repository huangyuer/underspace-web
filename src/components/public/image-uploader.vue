<template>
    <div>  
        <el-upload
          action="http://engineeringhistory.oss-cn-shanghai.aliyuncs.com"
          type="drag"
          :headers="headers"
          :multiple="false"
          :data="uploadData"
          :show-upload-list="true"
          :thumbnail-mode="true"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload" 
          :default-file-list="fileList">
          <i class="el-icon-upload"></i>
           <div class="el-dragger__text"><em>上传图片</em></div>
         
    </el-upload>
    </div> 
</template>

<script> 
  var md5 = require('js-md5');
  var moment = require('moment');
  export default{
    name: 'ImageUploader',
    data(){
      return {
        msg: '图片上传', 
      }
    }, 
    mounted: function () {
      this.getUploadToken();
    },
    props: ['handleSuccess', 'initFile', 'coverSize'],
    components:{ 
    },
    computed: {  
      uploadToken:function(){
        return this.$store.getters.uploadToken;
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
      fileList: function(){
        if(this.initFile){
          return [{name: 'Image', url: this.initFile}];
        }else{
          return [];
        }
        
      }
    }, 
    watch:{ 
    },
    methods: { 
      getUploadToken: function(){
        this.$store.dispatch('getUploadToken', {'authorizationToken': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4M2NkYzg1YWRiNjk2MTAxYjY5ZDVlNiIsImlhdCI6MTQ4MDM4OTE4MSwiZXhwIjoxNDgwOTkzOTgxfQ.KTkZcMfBeQNIPFlbgmr48J1vrGVFWGKBu2EChyMUKt4'}); 
      },
      handlePreview: function (file) {
        console.log(file);
      },
      handleError: function (err, response, file) {
        console.log('error');
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
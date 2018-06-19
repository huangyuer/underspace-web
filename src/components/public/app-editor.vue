<template>

  <div>  
    <div id="editor" v-html="inputContent" @input="outputContent"></div>
  </div>
</template>
<style lang="css" scoped>
    .clearfix{ clear:both; }
    #editor { 
      width:auto;
      height: 300px;
    } 
    .wangEditor-container {
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid #CCC;
    }
</style>
<script>
  import WangEditor from 'wangeditor'; 
  var md5 = require('js-md5');
  var moment = require('moment'); 

  export default {
    name: "AppEditor",
    props: ['inputContent', 'uploadUrl'],
    data() {
      return {
        content: ''
      }
    },

    computed: { 
       
    }, 
    mounted() {   
      this.createEditor();
    },
    methods: {
      createEditor() {
        const self = this;
        const editor = new WangEditor('editor')
        editor.config.menus = ['source', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
          '|', 'link', 'unlink',  'img', 'video', '|', 'undo', 'redo', 'fullscreen'
        ] 
        editor.config.withCredentials = true;
        editor.config.uploadImgUrl = 'http://api.tongjix.cn/v1/uploader/upload';
        editor.onchange = function () { 
          self.formatContent(this.$txt.html());
        }  
        editor.create()
      },  
       
      formatContent(content) {
        // handle
        // ...  
        this.content = content;
        this.outputContent()
      },
      outputContent() {
        this.$emit('input', this.content);
      }
    },
    components: {}
  }
</script>

<template>
    <div class="app-reply-container">
        <div class="app-reply-wrapper">
            <div>

            </div>
            <div @mouseout="hideDeleteBtn(reply, $event)" @mouseover="showDeleteBtn(reply, $event)" class="child-comment-header">
                <span>{{reply.nickname}}</span>
                <span>{{reply.createdAt}}</span>
                <div  class="child-replay-container">
                    <span v-show='reply.userId===mouseOverUserId' class='deleteBtn' @click="deleteReply(reply)">删除</span>
                    <span class="iconfont icon-reply"> </span>
                    <span @click="showChildReply(reply)">回复</span>
                </div>
                <div class="content">
                    <span>{{reply.content}}</span>
                </div>
            </div>

        </div>
        <div v-show="childReplyForm.parentReplyId===reply._id" class="child-footer" style="margin-left: 12.5%;overflow: hidden;">
            <textarea v-model="childReplyForm.content"></textarea>
            <div>
                <span class="cancel" @click="hideChildReply">取消</span>
                <div>
                    <span @click="postChildReply(reply._id)">发表评论</span>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
    .app-reply-wrapper {
        margin-top: 20px;
    }

    .app-reply-container  .child-comment-header .child-replay-container > span:first-child {
        display: inline-block;
    }

     

    .app-reply-wrapper > div:first-child {
        float: left;
        height: 100px;
        width: 10%;
        border-right: 3px solid #D8D8D8;
        margin-right: 2%;
    }

    .app-reply-wrapper > div:last-child {
        height: 100px;
        width: 86%;
        overflow: hidden;
    }

    .app-reply-wrapper .child-comment-header {
        height: 20px;
    }

    .app-reply-wrapper .child-comment-header > span {
        display: inline-block;
    }

    .app-reply-wrapper .child-comment-header > span:first-child {
        color: #F04D4E;
        margin-right: 44px;
    }

    .app-reply-wrapper .child-comment-header > div {
        float: right;
    }

    .app-reply-wrapper .child-comment-header > div > span {
        display: inline-block;
        color: #F04D4E;
        cursor: pointer;
    }

    .app-reply-wrapper .child-comment-header > div > span:first-child {
        margin-right: 37px;
    }

    .app-reply-wrapper .content {
        height: 70px;
        margin-top: 10px;
        width: 100%;
        overflow: hidden;
    }

    .app-reply-wrapper .child-comment-header .content > span {
        color: #000000;
    }

    .app-reply-container > div:last-child > textarea {
        height: 100px;
        width: 97.3%;
        margin-top: 20px;
    }

    .app-reply-container .child-footer > div:last-child {
        margin-top: 20px;
        margin-right: 10px;
        float: right;
    }

    .app-reply-container .child-footer .cancel {
        display: inline-block;
        line-height: 29px;
        cursor: pointer;
    }

    .app-reply-container .child-footer .cancel:hover {
        color: grey;
    }

    .app-reply-container .child-footer > div:last-child > div {
        float: right;
        margin-left: 40px;
        width: 80px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        user-select: none;
        color: #ffffff;
        background-color: #F04D4E;
        cursor: pointer;
    }

    .app-reply-container .child-footer > div:last-child > div:hover {
    }
</style>
<script>
  import  ObjectID from 'bson-objectid';
  export default{
    data(){
      return { 
        mouseOverUserId: '',
        childReplyForm: {
          _id: '',
          atUserId: '',
          atNickname: '',
          atAvatar:'',
          userId: '',
          nickname: '',
          avatar: '',  
          parentId: '', // commentId
          parentReplyId: '',
          content: '',
          isReply: true
        }, 
        currentReplyId: ''
      }
    },
    props: ['reply'],
    computed: {
      loggedUser(){
        return this.$store.getters.loggedUser;
      },
      savedComment(){
        return this.$store.getters.savedComment;
      },
      commentSaveStatus(){
        return this.$store.getters.commentSaveStatus;
      },
      deletedComment(){
        return this.$store.getters.deletedComment;
      },
      commentDeleteStatus(){
        return this.$store.getters.commentDeleteStatus;
      },
    },
    watch:{
      commentSaveStatus: {
        handler: function (val, oldVal) { 
          if(val){  
            if(this.savedComment.parentId && this.savedComment.parentId.length > 0){
              this.$store.commit('addReply', this.savedComment);
              this.$message({
                showClose: true,
                message: '回复成功!',
                type: 'success'
              });
              this.childReplyForm.parentId = '';
              this.childReplyForm.content = ''; 
            }else{ 
              this.$store.commit('addComment', this.savedComment);
              this.$message({
                showClose: true,
                message: '评论发表成功!',
                type: 'success'
              });
            } 
          }
        },
        deep: true
      },
      commentDeleteStatus: {
        handler: function (val, oldVal) { 
          if(val){   
            this.$store.commit('deleteReply', {'parentId': this.deletedComment.parentId, 'commentId': this.deletedComment._id}); 
            this.$message({
              showClose: true,
              message: '删除回复成功!',
              type: 'success'
            });
          }
        },
        deep: true
      }
    },
    methods: { 
      showChildReply(reply){ // 显示回复框
        this.childReplyForm.atUserId = reply.userId;
        this.childReplyForm.atNickname = reply.nickname;
        this.childReplyForm.atAvatar = reply.avatar; 
        this.childReplyForm.parentId = reply.parentId; 
        this.childReplyForm.parentReplyId = reply._id;

        this.childReplyForm.content = '@' + this.childReplyForm.atNickname + ' '; 
        this.currentReplyId = reply._id;
      },
      showDeleteBtn(reply, event){
        
        if(reply.userId === this.loggedUser.userId){
          this.mouseOverUserId = this.loggedUser.userId;
        }
      },
      hideDeleteBtn(reply, event){
         
        this.mouseOverUserId = '';
      },
      hideChildReply(){
        for(let k in this.childReplyForm){
          this.childReplyForm[k] = '';
        }
        this.childReplyForm.isReply = true; 
      },
      postChildReply(replyId){
        if(this.childReplyForm.parentReplyId === this.currentReplyId){
          this.childReplyForm._id = ObjectID().str; 
          this.childReplyForm.userId = this.loggedUser.userId;
          this.childReplyForm.nickname = this.loggedUser.nickname;
          this.childReplyForm.avatar = this.userAvatar;
          this.$store.dispatch('postComment', this.childReplyForm);
          this.hideChildReply();
        }
      },
      deleteReply(reply){ 
        if(! reply.parentId || reply.parentId === ''){
          return false;
        }
        if(! reply._id || reply._id === ''){
          return false;
        }
        if(reply.userId !== this.loggedUser.userId) return false; 
        this.$store.dispatch('deleteComment', reply);
      }
    },
    components: {}
  }
</script>

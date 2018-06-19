<template>
    <div>
        <div class="comment-textarea-container">
          <div>
            <login-dialog></login-dialog>
          </div>
            <div>
                <span>{{total}}条评论</span>
            </div>
            <div class="container">
                <div>
                    <div>
                        <img :src="userAvatar">
                    </div>
                </div>
                <div>
                    <textarea v-model="commentForm.content"></textarea>
                </div>
                <div>
                    <span @click="postComment">发表评论</span>
                </div>
            </div>
        </div>
        <div v-for="comment in comments" class="app-comment-wrapper">
            <div @mouseout="hideDeleteBtn(comment, $event)" @mouseover="showDeleteBtn(comment, $event)"
                 class="banner-container">
                <div>
                    <img style="width:40px;height:40px;" :src="comment.avatar">
                </div>
                <span>{{comment.nickname}}</span>
                <span>1楼 {{comment.createdAt | timeFormat}}</span>
                <div class="replay-container">
                    <span v-show='comment.userId===mouseOverUserId' @click="deleteComment(comment)"
                          style="margin-right: 37px;">删除</span>

                    <span class="iconfont icon-reply"></span>
                    <span @click="showReply(comment)">回复</span>
                </div>
            </div>
            <div class="content-container">
                <span>{{comment.content}}</span>
            </div>
            <div class="parent-comment-area" v-show="replyForm.parentId===comment._id">
                <div>

                </div>
                <div>
                    <textarea v-model="replyForm.content"></textarea>
                </div>
                <div class="footer">
                    <div>
                        <span @click="postReply()">发表回复</span>
                    </div>
                    <span @click="hideReply">取消</span>
                </div>
            </div>
            <div class="child-comment-container">
                <template v-for="reply in comment.replies">
                    <app-reply :reply="reply"></app-reply>
                </template>
            </div>
            <div class="comment-underline"></div>
        </div>
    </div>
</template>
<style scoped>
    .comment-textarea-container {
        width: 100%;
    }

    .comment-textarea-container > div:first-child {
        font-size: 18px;
        color: #F04D4E;
        margin-top: 52px;
    }

    .comment-textarea-container .container > div:first-child {
        width: 10%;
        float: left;
    }

    .comment-textarea-container .container > div:first-child > div {
        height: 40px;
        width: 40px;
        border-radius: 40px;
        overflow: hidden;
    }

    .comment-textarea-container .container > div:first-child > div > img {
        height: 100%;
        width: 100%;
    }

    .comment-textarea-container .container {
        margin-top: 32px;
        overflow: hidden;
    }

    .comment-textarea-container .container > div:nth-child(2) {
        overflow: hidden;
        height: 100px;
    }

    .comment-textarea-container .container > div:nth-child(2) > textarea {
        width: 99%;
        height: 94%;
        resize: none;
    }

    .comment-textarea-container .container > div:last-child {
        width: 80px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        user-select: none;
        color: #ffffff;
        background-color: #F04D4E;
        margin-top: 10px;
        float: right;
        margin-bottom: 69px;
        cursor: pointer;
    }

    .app-comment-wrapper .banner-container > div:first-child {
        display: inline-block;
        height: 40px;
        width: 40px;
        border-radius: 40px;
        overflow: hidden;
        vertical-align: middle;
    }

    .app-comment-wrapper .replay-container > span:first-child {
        display: inline-block;
    }

    /*.app-comment-wrapper .banner-container:hover > .replay-container > span:first-child {
        display: inline-block;
    }*/

    .app-comment-wrapper .banner-container > div:last-child {
        display: inline-block;
        float: right;
        vertical-align: middle;
        line-height: 40px;
        color: #F04D4E;
        cursor: pointer;
    }

    .app-comment-wrapper .banner-container > div:last-child > span:first-child {
        margin-right: 5px;
    }

    .app-comment-wrapper > .banner-container > span:nth-child(2) {
        margin-left: 20px;
        margin-right: 87px;
    }

    .app-comment-wrapper .banner-container > span {
        display: inline-block;
        line-height: 40px;
        vertical-align: middle;
    }

    .app-comment-wrapper .content-container {
        margin: 20px auto;
    }

    .app-comment-wrapper .parent-comment-area > div:first-child {
        float: left;
        height: 100px;
        width: 5%;
        border-left: 3px solid #D8D8D8;
    }

    .app-comment-wrapper .parent-comment-area > div:nth-child(2) {
        overflow: hidden;
        background-color: #D8D8D8;
        width: 94%;
        height: 100px;
    }

    .app-comment-wrapper .parent-comment-area > div:nth-child(2) > textarea {
        height: 94%;
        width: 99%;
        resize: none;
    }

    .app-comment-wrapper .parent-comment-area .footer {
        margin-top: 12px;
        overflow: hidden;
    }

    .app-comment-wrapper .parent-comment-area .footer > span {
        float: right;
        display: inline-block;
        line-height: 29px;
        cursor: pointer;
    }

    .app-comment-wrapper .parent-comment-area .footer > span:hover {
        color: grey;
    }

    .app-comment-wrapper .parent-comment-area .footer > div {
        width: 80px;
        height: 29px;
        line-height: 29px;
        user-select: none;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        color: #ffffff;
        background-color: #F04D4E;
        float: right;
        margin-right: 3px;
        margin-left: 40px;
    }

    .comment-underline {
        width: 100%;
        border: 1px solid #D8D8D8;
        margin-top: 30px;
        margin-bottom: 20px;
    }
</style>
<script>
  import AppReply from './appReply.vue';
  import LoginDialog from './loginDialog.vue';
  import moment from 'moment';
  import api from '../../store/api/comment';

  import {getCookie, deleteCookie} from '../../utils/cookie';
  import  ObjectID from 'bson-objectid'; // 需要安装npm install bson-objectid
  export default{
    name: "AppComment",
    props: ['kind', 'srcId'],
    mounted: function () {
      this.getData();
    },
    data(){
      return {
        replyingCommentId: '',
        dialogVisible: true,
        mouseOverUserId: '',
        commentForm: {
          userId: '',
          nickname: '',
          avatar: '',
          kind: 'article',
          srcId: '',
          content: '',
          isReply: false
        },
        replyForm: {
          _id: '',
          atUserId: '',
          atNickname: '',
          atAvatar: '',
          userId: '',
          nickname: '',
          avatar: '',
          parentId: '',
          content: '',
          isReply: true
        },
        currentReplyId: ''
      }
    },
    filters: {
      timeFormat: function(value){
        if(! value) return '';
        value = value.toString(); 
        moment.locale('zh-cn');
        // return moment().format('LLL');
        return moment().startOf('day').fromNow(); 
      }
    },
    watch: {
      commentSaveStatus: {
        handler: function (val, oldVal) {
          if (val) {
            if (this.savedComment.parentId && this.savedComment.parentId.length > 0) {
              this.$store.commit('addReply', this.savedComment);
              this.$message({
                showClose: true,
                message: '回复成功!',
                type: 'success'
              }); 
              this.commentForm.parentId = '';
              this.commentForm.content = '';
              this.hideReply();
            } else {
              this.$store.commit('addComment', this.savedComment);
              this.$message({
                showClose: true,
                message: '评论发表成功!',
                type: 'success'
              });
              for (let k in this.commentForm) {
                this.commentForm[k] = '';
              }
            }
          }
        },
        deep: true
      },
      commentDeleteStatus: {
        handler: function (val, oldVal) {
          if (val) {
            console.log('deletedComment', this.deletedComment);
            if (this.deletedComment.parentId && this.deletedComment.parentId != '') {
              this.$store.commit('deleteReply', this.deletedComment.parentId, this.deletedComment._id);
            } else {
              this.$store.commit('deleteComment', this.deletedComment._id);
            }
            this.$message({
              showClose: true,
              message: '评论删除成功!',
              type: 'success'
            });
          }
        },
        deep: true
      },
    },
    computed: {
      comments(){
        return this.$store.getters.comments;
      },
      total(){
        return this.$store.getters.commentsTotal;
      },
      loggedUser(){
        return this.$store.getters.loggedUser;
      },
      loggedIn(){
        return this.$store.getters.loggedIn;
      },
      defaultAvatars(){
        return this.$store.getters.defaultAvatars;
      },
      defaultAvatar(){
        let defaultAvatar = this.defaultAvatars[Math.floor(Math.random() * this.defaultAvatars.length)];
        return defaultAvatar;
      },
      userAvatar(){
        if (this.loggedUser && this.loggedUser.avatar) {
          return this.loggedUser.avatar;
        } else {
          return this.defaultAvatar;
        }
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
    methods: { 
      isParent: function () {
        if (this.commentlist.children.length > 0) {
          return true;
        } else {
          return false;
        }
      },

      openLoginDialog: function () {
        this.$store.commit('showLoginDialog');
         
      },
      hideLoginDialog: function () {
        this.$store.commit('hideLoginDialog');
      },
      getData(){
        this.$store.dispatch('getLatestComments', {kind: this.kind, srcId: this.srcId, limit: 20, page: 1});
      },
      showDeleteBtn(comment, event){
        if (comment.userId === this.loggedUser.userId) {
          this.mouseOverUserId = this.loggedUser.userId;
        }
      },
      hideDeleteBtn(comment, event){
        this.mouseOverUserId = '';
      },
      postComment(){
        console.log('commentForm', this.commentForm);
        console.log('userInfo', this.loggedUser);
        if (!this.loggedIn) {
          this.openLoginDialog();
          //this.$router.push('/auth/login') 
          return false;
        } else {
          if (this.commentForm.content === '') {
            this.$message({
              showClose: true,
              message: '请填写评论内容',
              type: 'error'
            });
            return false;
          }
          let avatar = this.loggedUser.avatar;
          if (!avatar) {
            avatar = this.defaultAvatar;
          }
          this.commentForm.userId = this.loggedUser.userId;
          this.commentForm.nickname = this.loggedUser.nickname;
          this.commentForm.avatar = avatar;

          this.commentForm.srcId = this.srcId;
          this.commentForm.kind = this.kind; 

          this.$store.dispatch('postComment', this.commentForm);
          // for (let k in this.commentForm) {
          //   this.commentForm[k] = '';
          // }
          this.commentForm.isReply = false;
        }
      },
      deleteComment(comment){
        if (comment.parentId && comment.parentId != '') {
          return false;
        }
        if (comment.userId !== this.loggedUser.userId) return false;
        this.$store.dispatch('deleteComment', comment);
      },
      showReply(comment){ // 显示回复框
        this.replyForm.atUserId = comment.userId;
        this.replyForm.atNickname = comment.nickname;
        this.replyForm.atAvatar = comment.avatar;
        this.replyForm.parentId = comment._id; 
        this.replyForm.content = '@' + this.replyForm.atNickname + ' ';
        this.currentReplyId = comment._id;
      },
      hideReply(){
        for (let k in this.replyForm) {
          this.replyForm[k] = '';
        }
        this.replyForm.isReply = true;
      },
      postReply(){
        if(this.currentReplyId === this.replyForm.parentId){
          this.replyForm._id = ObjectID().str;
          this.replyForm.userId = this.loggedUser.userId;
          this.replyForm.nickname = this.loggedUser.nickname;
          this.replyForm.avatar = this.userAvatar;
          this.$store.dispatch('postComment', this.replyForm); 
        }
      }
    },
    components: {
      AppReply,
      LoginDialog
    }
  }
</script>

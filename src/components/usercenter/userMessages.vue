<template>
  <div class="z_bg">
  <div class="grzx_main">
    <user-left-menu></user-left-menu>

  <div class="grzx_right">
    <div class="grzx_right1">
      <p>站内信</p>
    </div>
    <div class="grzx_rightul">
      <ul>
        <li><a href="" class="a_hover">图书</a></li>
        <li><a href="">工程师</a></li>
        <li><a href="">工程图书</a></li>
        <li><a href="">公式</a></li>
        <li><a href="">上海建筑规范</a></li>
      </ul>
    </div>
    <div class="grzx_right_table2">
      <table width="100%" border="1">
        <tr>
          <td width="20%" class="td_11">发件人</td>
          <td width="60%" class="td_11">发件人</td>
          <td width="20%" class="td_11">时间</td>
        </tr>
        <tr>
          <td width="20%"><b>系统消息</b></td>
          <td width="60%"><b>标题标题标题标题标题标题标题标题标题标题标题</b></td>
          <td width="20%"><b>2017-9-5 15:40</b></td>
        </tr>
        <tr>
          <td width="20%">系统消息</td>
          <td width="60%">标题标题标题标题标题标题标题标题标题标题标题</td>
          <td width="20%">2017-9-5 15:40</td>
        </tr>
        <tr>
          <td width="100%" colspan="3" class="td_3">正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文</td>
        </tr>
        <tr>
          <td width="20%"></td>
          <td width="60%"></td>
          <td width="20%"></td>
        </tr>
        <tr>
          <td width="20%"></td>
          <td width="60%"></td>
          <td width="20%"></td>
        </tr>
        <tr>
          <td width="20%"></td>
          <td width="60%"></td>
          <td width="20%"></td>
        </tr>
      </table>
    </div>
  </div>
  </div>
  </div>
  </div>
</div>
</template>

<script>
  import UserLeftMenu from './leftMenu'
  export default {
    name: 'UserMessages',
    data () {
      return {
      }
    },
    components:{
      'user-left-menu': UserLeftMenu
    },

  }
</script>

<style>
</style>

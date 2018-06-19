<template>
    <div>
        <div class="about-us-container">
            <el-row>
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="8" class="title">我们是谁</el-col>
                <el-col :span="8">&nbsp;</el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :offset="8">
                    <div class="underline"></div>
                </el-col>
            </el-row>
            <div class="about-us-content-container">
                <div class="about-us-content-left-pane">
                  <img src="http://tjdesigner.oss-cn-shanghai.aliyuncs.com/upload/aboutus.jpg?x-oss-process=image/resize,w_560" />
                </div>
                <div class="about-us-content-right-pane">
                    <div class="about-us-content-subtitle"><span>源自同济，更懂工程技术!</span></div>
                    <div class="about-us-content-words"><span>
                    Who are we?<br>
我们来自同济大学出版社，在依托同济大学资源的基础上，成为工程技术领域专业出版机构。
 <br>
What are we doing？<br>
 我们力争打造具有同济特色，覆盖工程学科领域比较齐全的专业数据库。
                </span></div>
                </div>
            </div>
            <el-row class="el-gap">
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="8" class="title">联系我们</el-col>
                <el-col :span="8">&nbsp;</el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :offset="8">
                    <div class="underline"></div>
                </el-col>
            </el-row>
            <div class="about-us-contact-info-container">
                <div class="about-us-contact-info-item-container">
                    <div class="about-us-contact-info-item">
                        <div class="about-us-contact-info-item-left">
                          <img src="../assets/images/telephone.png" />
                        </div>
                        <div class="about-us-contact-info-item-right">
                            <span>021-65982478</span>
                        </div>
                    </div>
                </div>
                <div class="about-us-contact-info-item-container">
                    <div class="about-us-contact-info-item">
                        <div class="about-us-contact-info-item-left">
                          <img src="../assets/images/location.png" />
                        </div>
                        <div class="about-us-contact-info-item-right">
                            <span>上海市杨浦区赤峰路2号</span>
                        </div>
                    </div>
                </div>
                <div class="about-us-contact-info-item-container">
                    <div class="about-us-contact-info-item">
                        <div class="about-us-contact-info-item-left">
                          <img src="../assets/images/email.png"/>
                        </div>
                        <div class="about-us-contact-info-item-right">
                            <span>info@tjdesignx.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="about-us-map-container" id="about-us-map-container">
            <img style="width:100%; height: 100%;" src="../assets/images/aboutusmap.png" />
        </div>
    </div>

</template>
<style lang="scss" scoped>
  @import "../assets/css/aboutUs";
</style>
<script>
  export default{
    mounted: function () {
//       var map = new AMap.Map('about-us-map-container', {
//         zoom: 100,
//         center: [121.5069200000, 31.2824690000]
//       });
//       var marker = new AMap.Marker({
//         position: [121.5069400000, 31.2825990000],
//         map: map
//       });
//       marker.setMap(map);
//       AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation', 'AMap.Transfer'], function () {
//         var toolbar = new AMap.ToolBar();
//         var scale = new AMap.Scale();
//         var geolocation = new AMap.Geolocation();
//         var transfer = new AMap.Transfer();
//         map.addControl(toolbar);
// //        map.addControl(scale);
//         map.addControl(geolocation);
//         map.addControl(transfer);
//       })
    },
    data(){
      return {}
    },
    components: {}
  }
</script>

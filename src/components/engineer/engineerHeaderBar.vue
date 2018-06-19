<template>
  <div class="engineer_header_wrapper">
    <div class="engineer_header_bar">

      <ul>
        <li> 
          <a href="javascript:;" @click="search('all')" class="link">精选</a>
        </li>
        <!-- <li v-for="title in engineerTitles">
          <a href="javascript:;" @click="search(title.type)" class="link" v-text="title.name"></a>
        </li> -->
        <li>
         <!--  <el-dropdown placement="bottom" size="small">
            <span class="el-dropdown-link">
              按学科查找<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="subject in subjects">{{subject.name}}</el-dropdown-item> 
            </el-dropdown-menu>
          </el-dropdown> -->
          <select v-model="queryParams.category" name="bySubject" @change="subjectChange" id="id-by-subject">
            <option value="">全部学科</option>
            <option v-for="subject in subjects" :value="subject.name">{{subject.name}}</option> 
          </select>
        </li>
        <li>
          <!-- <el-dropdown placement="bottom-start" size="small">
            <span class="el-dropdown-link">
              按地域查找<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="listItemsByArea(area.name)" v-for="area in areas">{{area.name}}</el-dropdown-item> 
            </el-dropdown-menu>
          </el-dropdown> -->
          <select v-model="queryParams.area" name="byArea" @change="areaChange" id="id-by-area">
            <option value="">所有地区</option>
            <option v-for="area in areas" :value="area.name">{{area.name}}</option> 
          </select>
        </li>
        <li>
          <!-- <el-dropdown placement="bottom-start" size="small">
            <span class="el-dropdown-link">
              按年代查找<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="era in eras">{{era}}</el-dropdown-item> 
            </el-dropdown-menu>
          </el-dropdown> -->
          <select v-model="queryParams.era" name="byEra" @change="eraChange" id="id-by-era">
            <option value="">所有时代</option>
            <option v-for="era in eras" :value="era">{{era}}</option> 
          </select>
        </li>
      </ul>
      <div class="engineer-search">
        <input class="engineer-search-input" placeholder="搜索" @keyup.enter="doSearch()" v-model="searchContent"/> 
        <a href="javascript:;">
          <img class="engineer-search-img" src="../../assets/images/search.png" @click="doSearch()"/>
        </a>
      </div>
       <el-button @click="createEntry"  type="text" icon="el-icon-edit">添加词条</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/css/engineer/engineerHeaderBar";
</style>

<script>
  import searchComponent from '../public/searchComponent.vue'

  export default {
    data () {
      return {
        engineerTitles: [
          {name: '精选', url: '/selected', type: 'all'},
          {name: '古代', url: '?era=古代', type: '古代'},
          {name: '近代', url: '?era=近代', type: '近代'},
          {name: '现代', url: '?era=现代', type: '现代'},
          {name: '当代', url: '?era=当代', type: '当代'},
        ], 
        queryParams: {
          area:'',
          era:'',
          category: ''
        },
        eras: ['古代', '近代', '现代', '当代'],
        areas: [{"name":"北京市"},{"name":"天津市"},{"name":"河北省"},{"name":"山西省"},{"name":"内蒙古自治区"},{"name":"辽宁省"},{"name":"吉林省"},{"name":"黑龙江省"},{"name":"上海市"},{"name":"江苏省"},{"name":"浙江省"},{"name":"安徽省"},{"name":"福建省"},{"name":"江西省"},{"name":"山东省"},{"name":"河南省"},{"name":"湖北省"},{"name":"湖南省"},{"name":"广东省"},{"name":"广西壮族自治区"},{"name":"海南省"},{"name":"重庆市"},{"name":"四川省"},{"name":"贵州省"},{"name":"云南省"},{"name":"西藏自治区"},{"name":"陕西省"},{"name":"甘肃省"},{"name":"青海省"},{"name":"宁夏回族自治区"},{"name":"新疆维吾尔自治区"},{"name":"台湾省"},{"name":"香港特别行政区"},{"name":"澳门特别行政区"}],
        searchContent: ''
      }
    },
    components: {
      searchComponent
    },
    mounted: function(){
      this.$store.dispatch('listSubjects', {});
      this.queryParams.area = this.currentArea;
      this.queryParams.era = this.currentEra;
      this.queryParams.category = this.currentCategory;
    },
    computed: {
      // engineerTitles: function () {
      //   return this.$store.state.engineerTitles
      // }
      subjects () {
        return this.$store.getters.subjects;
      },
      currentCategory () {
        let category = this.$route.query.category || ''
        return category
      },
      currentEra () {
        let era = this.$route.query.era || ''
        return era
      },
      currentArea () {
        let era = this.$route.query.area || ''
        return era
      },
    },
    methods: {
      doSearch: function () {
        console.log(this.searchContent)
        let p = {
          searchContent: this.searchContent,
          category: '0',
          keywords: []
        }
        this.$store.dispatch('searchHybrid', p)
        // this.$store.dispatch('searchProject', p) 
      },
      redirectTo(){
        let queryStr = `area=${this.queryParams.area}&era=${this.queryParams.era}&category=${this.queryParams.category}`;
        let url = this.$route.path + '?' + queryStr; 
        console.log(url);
        this.$router.push({path:url});
      },
      areaChange: function(event){
        console.log(event.target.value); 
        this.queryParams.area =  event.target.value;  
        this.redirectTo();
      },
      eraChange: function(event){
        console.log(event.target.value); 
        this.queryParams.era =  event.target.value; 
        this.redirectTo(); 
      },
      subjectChange: function(event){
        console.log(event.target.value);
        this.queryParams.category =  event.target.value; 
        this.redirectTo(); 
      },
      createEntry: function(){
        this.$router.push({path: '/user/create/entry'})
      },
      search: function (type) {
        console.log(type)
        if (type === 'all') {
          var p = {
            searchContent: this.searchContent === '' ? '工程' : this.searchContent,
              category: '0',
              keywords: []
          }
          this.$store.dispatch('searchHybrid', p)
        } else {
          var p = {
            searchContent: this.searchContent === '' ? '工程' : this.searchContent,
              content: type,
              category: '1',
              keywords: []
          }
          this.$store.dispatch('searchHybrid', p)
        }
        this.$router.push('/history/search/result')
      }
    }
  }
</script>

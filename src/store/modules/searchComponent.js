const state = {
  searchContent: '',
  levelOneCategoryList: [
    {
      name: '全部',
      active: true,
      nickName: 'all',
      type: 'all',
      children: [],
    },//0
    {
      name: '图书',
      active: false,
      nickName: 'book',
      type: 'text',
      children: [
        // {
        //   name: 'ISBN',
        //   active: false,
        //   keyword: 'isbn',
        // },
        // {
        //   name: '作者',
        //   active: false,
        //   keyword: 'chiefEditor',
        // },
        // {
        //   name: '书名',
        //   active: false,
        //   keyword: 'name',
        // },
        // {
        //   name: '类别',
        //   active: false,
        //   keyword: 'series',
        // },
        // {
        //   name: '关键字',
        //   active: false,
        //   keyword: 'keywords',
        // },
        // {
        //   name: '简介',
        //   active: false,
        //   keyword: 'summary'
        // },
      ],
    },//1
    {
      name: '章节',
      active: false,
      nickName: 'chapterTitle',
      type: 'chapterT',
    },//2
    {
      name: '工程',
      active: false,
      nickName: 'project',
      type: 'image',
      children: [
        {
          name: '标题',
          active: false,
          keyword: 'title',
        },
        {
          name: '简介',
          active: false,
          keyword: 'summary',
        },
        {
          name: '内容',
          active: false,
          keyword: 'content',
        },
        {
          name: '分类',
          active: false,
          keyword: 'categories'
        }
      ]
    },//3
    {
      name: '工程师',
      active: false,
      nickName: 'engineer',
      type: 'image',
      children: [
        {
          name: '姓名',
          active: false,
          keyword: 'name',
        },
        {
          name: '学校',
          active: false,
          keyword: 'education',
        },
        {
          name: '简介',
          active: false,
          keyword: 'summary',
        },
        {
          name: '内容',
          active: false,
          keyword: 'content',
        },
        {
          name: '行业',
          active: false,
          keyword: 'trades'
        },
        {
          name: '年代',
          active: false,
          keyword: 'era'
        },
      ]
    },//5
    {
      name: '多媒体',
      active: false,
      nickName: 'pic',
      type: 'image',
      children: [],
    },//6
    {
      name: '企业需求',
      active: false,
      nickName: 'requirement',
      type: 'text',
      children: [
        {
          name: '名称',
          active: false,
          keyword: 'name',
        },
        {
          name: '内容',
          active: false,
          keyword: 'content',
        },
        {
          name: '途径',
          active: false,
          keyword: 'way',
        },
        {
          name: '类别',
          active: false,
          keyword: 'categories',
        }
      ]
    },//7
    {
      name: '工程文献',
      active: false,
      nickName: 'anli',
      type: 'text',
      children: [
        {
          name: '名称',
          active: false,
          keyword: 'name',
        },
        {
          name: '简介',
          active: false,
          keyword: 'summary',

        },
        {
          name: '内容',
          active: false,
          keyword: 'content',
        },
        {
          name: '类别',
          active: false,
          keyword: 'categories',
        }
      ]
    },//8
    {
      name: '知识产权',
      active: false,
      nickName: 'knowledge',
      type: 'text',
      children: []
    },//9
    {
      name: '论文',
      active: false,
      nickName: 'paper',
      type: 'text',
      children: []
    }
  ],
  currentLevelOneCategory: '',
}

const actions = {}

const mutations = {
  setSearchContent (state, data) {
    state.searchContent = data
  },
  setActiveLevelOneCategory (state, data) {
    for (var i = 0; i < state.levelOneCategoryList.length; i++) {
      state.levelOneCategoryList[i].active = false
    }
    state.levelOneCategoryList[data].active = true
    state.currentLevelOneCategory = state.levelOneCategoryList[data]
  },
  setLevelOneCategoryChildStatus (state, data) {
    for (var i = 0; i < state.levelOneCategoryList.length; i++) {
      if (state.levelOneCategoryList[i].name === data.name) {
        state.levelOneCategoryList[i].children[data.index].active = !state.levelOneCategoryList[i].children[data.index].active
      }
    }
  }
}

export default {
  state,
  actions,
  mutations,
}

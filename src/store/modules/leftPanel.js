import {
  levelOneCategoryItem
} from '../objectDeclare'

const state = {
  leftPanelItemList: [{
    name: '没有找到相关文献',
    type: '', //代表每个categoryItem的类型、
    children: []
  }],
}

const actions = {}

const mutations = {
  //如果搜索数据为空的话可以调用这个
  setLeftPanelNoData(state, data) {
    state.leftPanelItemList = [{
      name: '没有找到相关文献',
      type: '', //代表每个categoryItem的类型、
      children: []
    }]
  },
  //清除所有侧边栏数据集
  clearLeftPanelData(state, data) {
    for (var i = 0; i < state.leftPanelItemList.length; i++) {
      state.leftPanelItemList[i].name = ''
      state.leftPanelItemList[i].type = ''
      state.leftPanelItemList[i].children = []
    }
  },
  //首页，全部搜索的时候展示的数据
  setAllPageLeftPanel(state, data) {
    state.leftPanelItemList = [{
      name: '没有找到相关文献',
      children: []
    }]
    state.leftPanelItemList[0].name = '所有类别'
    state.leftPanelItemList[0].type = 'searchAll'
    state.leftPanelItemList[0].children.push({
      name: '图书',
      count: data.bookDataCount,
      active: false,
    })
    state.leftPanelItemList[0].children.push({
      name: '图书章节',
      count: data.bookChapterDataCount,
      active: false,
    })
    state.leftPanelItemList[0].children.push({
      name: '工程',
      count: data.projectDataCount,
      active: false,
    })
    state.leftPanelItemList[0].children.push({
      name: '工程师',
      count: data.engineerDataCount,
      active: false
    })
    state.leftPanelItemList[0].children.push({
      name: '多媒体',
      count: data.mediaDataCount,
      active: false
    })
    state.leftPanelItemList[0].children.push({
      name: '企业需求',
      count: data.requirementDataCount,
      active: false
    })
    state.leftPanelItemList[0].children.push({
      name: '工程文献',
      count: data.literatureDataCount,
      active: false
    })
    state.leftPanelItemList[0].children.push({
      name: '知识产权',
      count: data.expertPatentDataCount,
      active: false
    })
  },
  //搜索工程师的时候展示的数据
  setLeftPanelClickEngineerCategory(state, data) {
    state.leftPanelItemList = []
    let a = data[0].data
    let b = data[1].data
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList[0].name = '年代'
    state.leftPanelItemList[0].type = 'engineerCategory'
    state.leftPanelItemList[1].type = 'engineerCategory'
    state.leftPanelItemList[1].name = '行业'
    for (var i = 0; i < a.length; i++) {
      if (a[i].key) {
        state.leftPanelItemList[0].children.push({
          name: a[i].key,
          count: a[i].doc_count,
          active: false
        })
      }
    }
    for (var i = 0; i < b.length; i++) {
      state.leftPanelItemList[1].children.push({
        name: b[i].key,
        count: b[i].doc_count,
        active: false
      })
    }
  },
  //搜索'企业需求'时展示的数据
  setLeftPanelClickRequirementCategory(state, data) {
    state.leftPanelItemList = []
    let a = data[0].data
    let b = data[1].data
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList[0].name = '省份'
    state.leftPanelItemList[0].type = 'requirementCategory'
    state.leftPanelItemList[1].type = 'requirementCategory'
    state.leftPanelItemList[1].name = '途径'
    for (var i = 0; i < a.length; i++) {
      if (a[i].key) {
        state.leftPanelItemList[0].children.push({
          name: a[i].key,
          count: a[i].doc_count,
          active: false
        })
      }
    }
    for (var i = 0; i < b.length; i++) {
      if (b[i].key) {
        state.leftPanelItemList[1].children.push({
          name: b[i].key,
          count: b[i].doc_count,
          active: false
        })
      }
    }
  },
  setLeftPanelClickMediaCategorys(state, data) {
    state.leftPanelItemList = []
    console.log(data)
    let a = data[0].hits.total
    let b = data[1].hits.total
    let c = data[2].hits.total
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList[0].name = '结果列表'
    state.leftPanelItemList[0].type = 'mediaCateogry'
    state.leftPanelItemList[0].children.push({
      name: '图表',
      count: a,
      active: false
    })
    state.leftPanelItemList[0].children.push({
      name: '公式',
      count: b,
      active: false
    })
    state.leftPanelItemList[0].children.push({
      name: '图片',
      count: c,
      active: false
    })
  },
  setActiveLevel2Category(state, data) {
    let d = state.leftPanelItemList[data.parentIndex]
    for (var i = 0; i < d.children.length; i++) {
      d.children[i].active = false
    }
    d.children[data.childIndex].active = true
  },
  //搜索图书的时候展示的数据
  setLeftPanelClickBookCategory(state, data) {
    state.leftPanelItemList = []
    let a = data[0].data
    let b = data[1].data
    let c = data[2].data
    let d = data[3].data
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    // state.leftPanelItemList.push(
    //   {
    //     name: '',
    //     type: '',
    //     children: []
    //   }
    // )
    state.leftPanelItemList[0].name = '中图分类'
    state.leftPanelItemList[0].type = 'bookCategory'
    state.leftPanelItemList[1].name = '子库分类'
    state.leftPanelItemList[1].type = 'bookCategory'
    // state.leftPanelItemList[2].name = '内容类别'
    // state.leftPanelItemList[2].type = 'bookCategory'
    for (var i = 0; i < a.length; i++) {
      state.leftPanelItemList[0].children.push({
        name: a[i].key,
        count: a[i].doc_count,
        active: false
      })
    }
    for (var i = 0; i < b.length; i++) {
      state.leftPanelItemList[1].children.push({
        name: b[i].key,
        count: b[i].doc_count,
        active: false
      })
    }
    // state.leftPanelItemList[2].children.push({
    //   name: '书籍',
    //   count: d.total,
    //   active: false
    // })
    // state.leftPanelItemList[2].children.push({
    //   name: '书籍章节',
    //   count: c.total,
    //   active: false
    // })
  },
  setLeftPanelClickProject(state, data) {
    state.leftPanelItemList = []
    let a = data[0].data
    let b = data[1].data
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList[0].name = '年代'
    state.leftPanelItemList[0].type = 'projectSecond'
    state.leftPanelItemList[1].name = '地区'
    state.leftPanelItemList[1].type = 'projectSecond'
    for (var i = 0; i < a.length; i++) {
      state.leftPanelItemList[0].children.push({
        name: a[i].key,
        count: a[i].doc_count,
        active: false
      })
    }
    for (var i = 0; i < b.length; i++) {
      if (b[i].key) {
        state.leftPanelItemList[1].children.push({
          name: b[i].key,
          count: b[i].doc_count,
          active: false
        })
      }
    }
  },
  setLeftPanelClickLiterature(state, data) {
    state.leftPanelItemList = []
    let a = data[0].data
    let b = data[1].data
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    state.leftPanelItemList[0].name = '年代'
    state.leftPanelItemList[0].type = 'literatureCategory'
    state.leftPanelItemList[1].name = '类别'
    state.leftPanelItemList[1].type = 'literatureCategory'
    for (var i = 0; i < a.length; i++) {
      if (a[i].key) {
        state.leftPanelItemList[0].children.push({
          name: a[i].key,
          count: a[i].doc_count,
          active: false
        })
      }
    }
    for (var i = 0; i < b.length; i++) {
      if (b[i].key) {
        state.leftPanelItemList[1].children.push({
          name: b[i].key,
          count: b[i].doc_count,
          active: false
        })
      }
    }
  },
  setLeftPanelClickKnowledgeCategorys(state, data) {
    state.leftPanelItemList = []
    let a = data[0].hits.total
    let b = data[1].hits.total
    let c = data[2].hits.total
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })

    state.leftPanelItemList[0].name = '类别'
    state.leftPanelItemList[0].type = 'knowledgeCategory'
    state.leftPanelItemList[0].children.push({
      name: '专家',
      count: a,
      active: false,
    })
    state.leftPanelItemList[0].children.push({
      name: '专利',
      count: b,
      active: false,
    })
    state.leftPanelItemList[0].children.push({
      name: '科研成果',
      count: c,
      active: false,
    })
  },
  setLeftPanelPaper(state, data) {
    state.leftPanelItemList = []
    console.log(data)
    state.leftPanelItemList.push({
      name: '',
      type: '',
      children: []
    })
    if (data.length > 0) {
      state.leftPanelItemList[0].name = '类别'
    } else {
      state.leftPanelItemList[0].name = '暂无数据'
    }
  }
}

export default {
  state,
  actions,
  mutations,
}

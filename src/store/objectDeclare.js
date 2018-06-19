export function levelOneCategoryItem () {
  this.name = ''
  this.id = ''
  this.count = ''   //个数
  this.active = false   //当前是否活跃
  this.children = []
  this.nickName = ''   //英文缩写，为了post给后台调用方便
  this.show = false  //当前是否显示
}

export function bookItem () {
  this.id = ''
  this.publisher = ''
  this.chiefEditor = ''
  this.isbn = ''
  this.name = ''
  this.keywords = ''
  this.publishedAt = ''
  this.cover = ''
  this.highlight = ''
  this.isFavorited = false
}

export function bookChapterItem () {
  this.id = ''
  this.title = ''
  this.content = ''
  this.createdAt = ''
  this.pdf = ''
}

export function projectItem () {
  this.title = ''
  this.summary = ''
  this.highlight = ''
  this.cover = ''
  this.id = ''
}

export function engineerItem () {
  this.id = ''
  this.name = ''
  this.avatar = ''
  this.summary = ''
}

export function mediaItem () {
  this.url = ''
  this.description = ''
  this.title = ''
  this.id = ''
  this.clicks = 0
  this.type = ''
}

export function contextItem () {
  this.id = ''
  this.chiefEditor = ''
  this.type = ''
  this.name = ''
  this.publishedAt = ''
  this.cover = ''
  this.keywords = ''
  this.highlight = ''
  this.isFavorited = false
  this.pdf = ''
}

export function requirementItem () {
  this.id = ''
  this.name = ''
  this.province = ''
  this.city = ''
  this.requirement = ''
  this.content = ''
  this.createdAt = ''
}

export function literatureItem () {
  this.id = ''
  this.name = ''
  this.cover = ''
  this.summary = ''
  this.createdAt = ''
}

export function knowledgeItem () {
  this.name = ''
  this.cover = ''
  this.summary = ''
  this.createdAt = ''
  this.id = ''
}

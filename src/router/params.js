const homePage = resolve => {
  require.ensure(['../components/index.vue'], () => {
    resolve(require('../components/index.vue'))
  })
}

const AboutUs = resolve => {
  require.ensure(['../components/aboutUs.vue'], () => {
    resolve(require('../components/aboutUs.vue'))
  })
}

const SearchIndex = resolve => {
  require.ensure(['../components/search/searchIndex.vue'], () => {
    resolve(require('../components/search/searchIndex.vue'))
  })
}

const searchContext = resolve => {
  require.ensure(['../components/search/searchContext.vue'], () => {
    resolve(require('../components/search/searchContext.vue'))
  })
}
const searchMedia = resolve => {
  require.ensure(['../components/search/searchMedia.vue'], () => {
    resolve(require('../components/search/searchMedia.vue'))
  })
}
const SearchPaper = resolve => {
  require.ensure(['../components/search/searchPaper.vue'], () => {
    resolve(require('../components/search/searchPaper.vue'))
  })
}
const mediaDetail = resolve => {
  require.ensure(['../components/search/mediaDetail.vue'], () => {
    resolve(require('../components/search/mediaDetail.vue'))
  })
}
const searchAll = resolve => {
  require.ensure(['../components/search/searchAll.vue'], () => {
    resolve(require('../components/search/searchAll.vue'))
  })
}
const SearchNull = resolve => {
  require.ensure(['../components/search/searchNull.vue'], () => {
    resolve(require('../components/search/searchNull.vue'))
  })
}
const AppHeader = resolve => {
  require.ensure(['../components/public/AppHeader.vue'], () => {
    resolve(require('../components/public/AppHeader.vue'))
  })
}
const NotFound404 = resolve => {
  require.ensure(['../components/public/NotFound404.vue'], () => {
    resolve(require('../components/public/NotFound404.vue'))
  })
}

const MediaPopup = resolve => {
  require.ensure(['../components/public/MediaPopup.vue'], () => {
    resolve(require('../components/public/MediaPopup.vue'))
  })
}
const AppFooter = resolve => {
  require.ensure(['../components/public/AppFooter.vue'], () => {
    resolve(require('../components/public/AppFooter.vue'))
  })
}
// const paginator = resolve => {
//   require.ensure(['../components/public/paginator.vue'], () => {
//     resolve(require('../components/public/paginator.vue'))
//   })
// }
const leftPanel = resolve => {
  require.ensure(['../components/search/leftPanel.vue'], () => {
    resolve(require('../components/search/leftPanel.vue'))
  })
}
const rightPanel = resolve => {
  require.ensure(['../components/search/rightPanel.vue'], () => {
    resolve(require('../components/search/rightPanel.vue'))
  })
}

const BookList = resolve => {
  require.ensure(['../components/book/bookList.vue'], () => {
    resolve(require('../components/book/bookList.vue'))
  })
}
const BookInfo = resolve => {
  require.ensure(['../components/book/bookInfo.vue'], () => {
    resolve(require('../components/book/bookInfo.vue'))
  })
}

const BookContent = resolve => {
  require.ensure(['../components/book/bookContent.vue'], () => {
    resolve(require('../components/book/bookContent.vue'))
  })
}

const Selected = resolve => {
  require.ensure(['../components/selected.vue'], () => {
    resolve(require('../components/selected.vue'))
  })
}

const EngineerList = resolve => {
  require.ensure(['../components/engineer/engineerList.vue'], () => {
    resolve(require('../components/engineer/engineerList.vue'))
  })
}

const HistorySearchResult = resolve => {
  require.ensure(['../components/searchResult.vue'], () => {
    resolve(require('../components/searchResult.vue'))
  })
}
const EngineerSearchResult = resolve => {
  require.ensure(['../components/engineer/engineerSearchResult.vue'], () => {
    resolve(require('../components/engineer/engineerSearchResult.vue'))
  })
}
const LiteratureSearchResult = resolve => {
  require.ensure(['../components/literature/literatureSearchResult.vue'], () => {
    resolve(require('../components/literature/literatureSearchResult.vue'))
  })
}

const ProjectSearchResult = resolve => {
  require.ensure(['../components/project/projectSearchResult.vue'], () => {
    resolve(require('../components/project/projectSearchResult.vue'))
  })
}

const EngineerInfo = resolve => {
  require.ensure(['../components/engineer/engineerInfo.vue'], () => {
    resolve(require('../components/engineer/engineerInfo.vue'))
  })
}

const ProjectList = resolve => {
  require.ensure(['../components/project/projectList.vue'], () => {
    resolve(require('../components/project/projectList.vue'))
  })
}

const ProjectInfo = resolve => {
  require.ensure(['../components/project/projectInfo.vue'], () => {
    resolve(require('../components/project/projectInfo.vue'))
  })
}

const LiteratureList = resolve => {
  require.ensure(['../components/literature/literatureList.vue'], () => {
    resolve(require('../components/literature/literatureList.vue'))
  })
}

const LiteratureInfo = resolve => {
  require.ensure(['../components/literature/literatureInfo.vue'], () => {
    resolve(require('../components/literature/literatureInfo.vue'))
  })
}

const MagazineList = resolve => {
  require.ensure(['../components/magazine/magazineList.vue'], () => {
    resolve(require('../components/magazine/magazineList.vue'))
  })
}

const MagazineInfo = resolve => {
  require.ensure(['../components/magazine/magazineInfo.vue'], () => {
    resolve(require('../components/magazine/magazineInfo.vue'))
  })
}

const PaperList = resolve => {
  require.ensure(['../components/paper/paperList.vue'], () => {
    resolve(require('../components/paper/paperList.vue'))
  })
}

const PaperInfo = resolve => {
  require.ensure(['../components/paper/paperInfo.vue'], () => {
    resolve(require('../components/paper/paperInfo.vue'))
  })
}

const Login = resolve => {
  require.ensure(['../components/auth/signIn.vue'], () => {
    resolve(require('../components/auth/signIn.vue'))
  })
}

const Register = resolve => {
  require.ensure(['../components/auth/signUp.vue'], () => {
    resolve(require('../components/auth/signUp.vue'))
  })
}

const ResetPassword = resolve => {
  require.ensure(['../components/auth/passwordReset.vue'], () => {
    resolve(require('../components/auth/passwordReset.vue'))
  })
}

const ChangePassword = resolve => {
  require.ensure(['../components/usercenter/passwordChange.vue'], () => {
    resolve(require('../components/usercenter/passwordChange.vue'))
  })
}

const UserInfo = resolve => {
  require.ensure(['../components/usercenter/userInfo.vue'], () => {
    resolve(require('../components/usercenter/userInfo.vue'))
  })
}

const UserFavorites = resolve => {
  require.ensure(['../components/usercenter/userFavorites.vue'], () => {
    resolve(require('../components/usercenter/userFavorites.vue'))
  })
}
const UserMessages = resolve => {
  require.ensure(['../components/usercenter/userMessages.vue'], () => {
    resolve(require('../components/usercenter/userMessages.vue'))
  })
}
const UserResources = resolve => {
  require.ensure(['../components/usercenter/userResources.vue'], () => {
    resolve(require('../components/usercenter/userResources.vue'))
  })
}

const LoadingComponent = resolve => {
  require.ensure(['../components/public/loadingComponent.vue'], () => {
    resolve(require('../components/public/loadingComponent.vue'))
  })
}

const CreateEntry = resolve => {
  require.ensure(['../components/usercenter/createEntry.vue'], () => {
    resolve(require('../components/usercenter/createEntry.vue'))
  })
}

const EditEntry = resolve => {
  require.ensure(['../components/usercenter/editEntry.vue'], () => {
    resolve(require('../components/usercenter/editEntry.vue'))
  })
}

const ListEntries = resolve => {
  require.ensure(['../components/usercenter/listEntries.vue'], () => {
    resolve(require('../components/usercenter/listEntries.vue'))
  })
}

const Test = resolve => {
  require.ensure(['../components/Test.vue'], () => {
    resolve(require('../components/Test.vue'))
  })
}

export {
  homePage,
  SearchIndex,
  searchContext,
  AppHeader,
  AppFooter,
  leftPanel,
  rightPanel,
  SearchNull,
  NotFound404,
  searchMedia,
  SearchPaper,
  searchAll,
  BookList,
  BookInfo,
  BookContent,
  MediaPopup,

  Selected,
  EngineerList,
  EngineerInfo,
  ProjectList,
  ProjectInfo,
  LiteratureList,
  LiteratureInfo,
  MagazineList,
  MagazineInfo,
  PaperList,
  PaperInfo,
  AboutUs,

  Login,
  Register,
  ResetPassword,
  UserInfo,
  ChangePassword,
  UserFavorites,
  UserMessages,
  UserResources,
  // paginator,
  LoadingComponent,
  mediaDetail,
  HistorySearchResult,
  LiteratureSearchResult,
  EngineerSearchResult,
  ProjectSearchResult,
  CreateEntry,
  EditEntry,
  ListEntries,
  Test
}

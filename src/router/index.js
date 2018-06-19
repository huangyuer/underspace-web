import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import {
  AppHeader,
  AppFooter,
  SearchIndex,
  searchContext,
  SearchNull,
  searchAll,
  searchMedia,
  SearchPaper,
  homePage,
  leftPanel,
  rightPanel,
  NotFound404,
  BookList,
  BookInfo,
  BookContent,
  MediaPopup,
  AboutUs,

  Selected,
  EngineerList,
  HistorySearchResult,
  LiteratureSearchResult,
  ProjectSearchResult,
  EngineerSearchResult,
  EngineerInfo,
  ProjectList,
  ProjectInfo,
  LiteratureList,
  LiteratureInfo,
  MagazineList,
  MagazineInfo,
  PaperList,
  PaperInfo,

  Login,
  Register,
  ResetPassword,
  UserInfo,
  ChangePassword,
  UserFavorites,
  UserMessages,
  UserResources,
  LoadingComponent,
  mediaDetail,
  CreateEntry,
  EditEntry,
  ListEntries,
  Test
} from './params'
// 配置路由
export default new Router({
  routes: [
    // 懒加载引入自定义组件
    {
      path: '/lost',
      components: {
        'app-header': AppHeader,
        'app-body': NotFound404,
        'app-footer': AppFooter,
      }
    },
    {
      path: '/test',
      components: {
        'app-body': Test,
      }
    },
    {
      path: '/',
      components: {
        'app-body': homePage,
        'loading-component': LoadingComponent,
      }
    },
    {
      path: '/media/detail/:mediaID',
      components: {
        'app-body': mediaDetail,
        'app-header': AppHeader,
        'app-footer': AppFooter,
      }
    },
    {
      path: '/search/result',
      components: {
        'app-header': AppHeader,
        'app-body': SearchIndex,
        'app-footer': AppFooter,
        'media-popup': MediaPopup,
        'loading-component': LoadingComponent,
      },
      children: [
        {
          path: '/',
          name: 'searchAll',
          components: {
            'leftPanel': leftPanel,
            'middlePanel': searchAll,
            'rightPanel': rightPanel,
          }
        },
        {
          path: 'media',
          name: 'searchMedia',
          components: {
            'leftPanel': leftPanel,
            'middlePanel': searchMedia,
            'rightPanel': rightPanel,
          }
        },
        {
          path: 'context',
          name: 'searchContext',
          components: {
            'leftPanel': leftPanel,
            'middlePanel': searchContext,
            'rightPanel': rightPanel,
          }
        },
        {
          path: 'null',
          name: 'searchNull',
          components: {
            'leftPanel': leftPanel,
            'middlePanel': SearchNull,
            'rightPanel': rightPanel,
          }
        },
        {
          path: 'paper',
          name: 'searchPaper',
          components: {
            'leftPanel': leftPanel,
            'middlePanel': SearchPaper,
            'rightPanel': rightPanel,
          }
        }
      ]
    },
    {
      path: '/about/us',
      components: {
        'app-header': AppHeader,
        'app-body': AboutUs,
        'app-footer': AppFooter
      },
    },

    {
      path: '/auth/login',

      components: {
        'app-header': AppHeader,
        'app-body': Login,
        'app-footer': AppFooter
      },
    },
    {
      path: '/auth/password/reset',

      components: {
        'app-body': ResetPassword,
      },
    },

    {
      path: '/auth/register',
      components: {
        'app-header': AppHeader,
        'app-body': Register,
        'app-footer': AppFooter
      },
    },

    {
      path: '/book/list',
      components: {
        'app-header': AppHeader,
        'app-body': BookList,
        'app-footer': AppFooter
      },
    },
    {
      path: '/book/info/:bookId',
      components: {
        'app-header': AppHeader,
        'app-body': BookInfo,
        'app-footer': AppFooter
      },
    },
    {
      path: '/book/content/:bookId/chapter',
      components: {
        'app-header': AppHeader,
        'app-body': BookContent,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/info',
      components: {
        'app-header': AppHeader,
        'app-body': UserInfo,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/password/change',
      components: {
        'app-header': AppHeader,
        'app-body': ChangePassword,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/favorites',
      components: {
        'app-header': AppHeader,
        'app-body': UserFavorites,
        'app-footer': AppFooter
      },
    },
    {
      path: '/selected',
      components: {
        'app-header': AppHeader,
        'app-body': Selected,
        'app-footer': AppFooter
      }
    },
    {
      path: '/engineer/list',
      components: {
        'app-header': AppHeader,
        'app-body': EngineerList,
        'app-footer': AppFooter
      },
    },
    {
      path: '/history/search/result',
      components: {
        'app-header': AppHeader,
        'app-body': HistorySearchResult,
        'app-footer': AppFooter
      },
    },
    {
      path: '/engineer/search/result',
      components: {
        'app-header': AppHeader,
        'app-body': EngineerSearchResult,
        'app-footer': AppFooter
      },
    },
    {
      path: '/literature/search/result',
      components: {
        'app-header': AppHeader,
        'app-body': LiteratureSearchResult,
        'app-footer': AppFooter
      },
    },
    {
      path: '/project/search/result',
      components: {
        'app-header': AppHeader,
        'app-body': ProjectSearchResult,
        'app-footer': AppFooter
      },
    },
    {
      path: '/engineer/info/:engineerId',
      components: {
        'app-header': AppHeader,
        'app-body': EngineerInfo,
        'app-footer': AppFooter
      },
    },
    {
      path: '/project/list',
      components: {
        'app-header': AppHeader,
        'app-body': ProjectList,
        'app-footer': AppFooter
      },
    },
    {
      path: '/project/info/:projectId',
      components: {
        'app-header': AppHeader,
        'app-body': ProjectInfo,
        'app-footer': AppFooter
      },
    },
    {
      path: '/literature/list',
      components: {
        'app-header': AppHeader,
        'app-body': LiteratureList,
        'app-footer': AppFooter
      },
    },
    {
      path: '/literature/info/:literatureId',
      components: {
        'app-header': AppHeader,
        'app-body': LiteratureInfo,
        'app-footer': AppFooter
      },
    },
    {
      path: '/magazine/list',
      components: {
        'app-header': AppHeader,
        'app-body': MagazineList,
        'app-footer': AppFooter
      },
    },
    {
      path: '/magazine/info/:issueId',
      components: {
        'app-header': AppHeader,
        'app-body': MagazineInfo,
        'app-footer': AppFooter
      },
    },
    {
      path: '/paper/list',
      components: {
        'app-header': AppHeader,
        'app-body': PaperList,
        'app-footer': AppFooter
      },
    },
    {
      path: '/paper/info/:paperId',
      components: {
        'app-header': AppHeader,
        'app-body': PaperInfo,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/info',
      components: {
        'app-header': AppHeader,
        'app-body': UserInfo,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/favorites',
      components: {
        'app-header': AppHeader,
        'app-body': UserFavorites,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/messages',
      components: {
        'app-header': AppHeader,
        'app-body': UserMessages,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/resources',
      components: {
        'app-header': AppHeader,
        'app-body': UserResources,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/create/entry',
      components: {
        'app-header': AppHeader,
        'app-body': CreateEntry,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/edit/entry/:id',
      components: {
        'app-header': AppHeader,
        'app-body': EditEntry,
        'app-footer': AppFooter
      },
    },
    {
      path: '/user/list/entries',
      components: {
        'app-header': AppHeader,
        'app-body': ListEntries,
        'app-footer': AppFooter
      },
    },
  ]
})

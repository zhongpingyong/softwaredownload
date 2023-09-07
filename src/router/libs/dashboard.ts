export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'pc',
        component: () => import(/* webpackChunkName: "pc" */ '@/pages/components/PC.vue')
      },
      {
        path: 'mobile',
        name: 'mobile',
        component: () =>
          import(/* webpackChunkName: "mobile" */ '@/pages/components/MobileCenter.vue')
      },
      {
        path: 'mobile/creation',
        name: 'Creation',
        component: () => import(/* webpackChunkName: "mobile" */ '@/pages/components/Creation.vue')
      },
      {
        path: 'mobile/community',
        name: 'Community',
        component: () => import(/* webpackChunkName: "mobile" */ '@/pages/components/Community.vue')
      }
    ]
  }
]

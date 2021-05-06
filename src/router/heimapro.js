// import Vue from 'vue'

// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// const router = new VueRouter({
//     routes: [
//         {
//             path: '/login',
//             name: 'login',
//             component: () => import('@/views/user/login.vue')
//         },
//         {
//             path: '/index',
//             name: 'index',
//             component: () => import('@/views/index.vue')
//         },
//         {
//             path: '/',
//             redirect: { name: 'index' }
//         }
//     ]
// })

// router.beforeEach((to, from, next) => {
//     if (to.name == '/login') {
//         next()
//     } else {
//         if (localStorage.getItem('haimatoken')) {
//             next()
//         } else {
//             next({ name: 'login' })
//         }
//     }
// })


// export default router



import Vue from 'vue'

import { Toast } from 'vant'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        // 登陆页面路由
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/user/login.vue')
        },
        // 首页路由
        {
            name: 'index',
            path: '/index',
            component: () => import('@/views/index.vue')
        },
        // 路由重定向
        {
            path: '/',
            redirect: { name: 'index' }
        },
        // 注册页面路由
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/user/register.vue')
        },
        // 个人中心页面路由
        {
            path: '/personal/:id',
            name: 'personal',
            component: () => import('@/views/user/personal.vue')
        },
        // 个人信息编辑页面
        {
            path: '/edit_profile/:id',
            name: 'edit_profile',
            component: () => import('@/views/user/edit_profile.vue')
        },
        // 文章详情页面路由
        {
            path: '/articleDetail/:id',
            name: 'articleDetail',
            component: () => import('@/views/article/articleDetail.vue')
        },
        // 我的关注页面路由
        {
            path: '/myfollw',
            name: 'myfollw',
            component: () => import('@/views/user/follow.vue')
        },
        // 收藏页面
        {
            path: '/mycollect',
            name: 'mycollect',
            component: () => import('@/views/user/collect.vue')
        },
        // 评论页面路由
        {
            path: '/comment/:id',
            name: 'comment',
            component: () => import('@/views/comment.vue')
        },
        // 栏目管理页面路由
        {
            path: '/manager',
            name: 'manager',
            component: () => import('@/views/cateManager.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/views/search.vue')
        },
    ]
})


// 设置导航守卫
router.beforeEach((to, from, next) => {
    let pathArr = ['personal', 'manager', 'edit_profile']

    if (pathArr.indexOf(to.name) != -1) {
        let token = localStorage.getItem('heimatoken')
        if (token) {
            next()
        } else {
            // 获取来源地址

            Toast('未登录，请先登录')
            next({ name: 'login ' })
        }
    } else {
        next()
    }
})



export default router
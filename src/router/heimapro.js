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
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/user/login.vue')
        },
        {
            name: 'index',
            path: '/index',
            component: () => import('@/views/index.vue')
        },
        {
            path: '/',
            redirect: { name: 'index' }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/user/register.vue')
        },
        {
            path: '/personal/:id',
            name: 'personal',
            component: () => import('@/views/user/personal.vue')
        },
        {
            path: '/edit_profile/:id',
            name: 'edit_profile',
            component: () => import('@/views/user/edit_profile.vue')
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal/') != -1) {
        let token = localStorage.getItem('haimatoken')
        if (token) {
            next()
        } else {
            Toast('未登录，请先登录')
            next({ name: 'login ' })
        }
    } else {
        next()
    }
})



export default router
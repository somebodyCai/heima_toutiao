import axios from '../utils/myaxios.js'

export const userlogin = function (data) {
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}

export const userRegister = function (data) {
    return axios({
        url: '/register',
        method: 'post',
        data
    })
}

// 更新用户信息
export const updateUserInfo = function (id, data) {
    return axios({
        url: '/user_update/' + id,
        method: 'post',
        data
    })
}

// 获取用户信息
export const getUserInfo = function (id) {
    return axios({
        url: '/user/' + id,
        // headers: { 'Authorization': localStorage.getItem('haimatoken') }
    })
}

// 关注用户
export const followUser = (id) => {
    return axios({
        url: '/user_follows/' + id
    })
}

// 取消关注用户
export const unFollowUser = (id) => {
    return axios({
        url: '/user_unfollow/' + id
    })
}


//获取关注列表
export const getUserFollows = () => {
    return axios({
        url: '/user_follows'
    })
}
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
export const updateUserInfo = function (id, data) {
    return axios({
        url: '/user_update/' + id,
        method: 'post',
        data
    })
}

export const getUserInfo = function (id) {
    return axios({
        url: '/user/' + id,
        // headers: { 'Authorization': localStorage.getItem('haimatoken') }
    })
}
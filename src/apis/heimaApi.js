import axios from '../utils/myaxios.js'

export const userlogin = function (data) {
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}
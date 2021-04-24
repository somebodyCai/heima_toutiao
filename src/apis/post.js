import axios from '../utils/myaxios.js'

export const getArticleList = function (params) {
    return axios({
        url: `/post?category`,
        params
    })
}
import axios from '../utils/myaxios.js'

export const getArticleList = function (id) {
    return axios({
        url: `/post?category=${id}`,
    })
}
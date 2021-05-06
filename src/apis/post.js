import axios from '../utils/myaxios.js'


// 获取文章列表数据
export const getArticleList = function (params) {
    return axios({
        url: `/post`,
        params
    })
}

// 获取文章详情
export const getArticleDetail = (id) => {
    return axios({
        url: '/post/' + id
    })
}

//发送关注请求
export const postLike = (id) => {
    return axios({
        url: '/post_like/' + id
    })
}

// 收藏文章
export const collectArticle = (id) => {
    return axios({
        url: '/post_star/' + id
    })
}

// 获取用户关注的文章列表
export const getCollArtList = () => {
    return axios({
        url: '/user_star'
    })
}

// 获取文章详情评论列表
export const getArtComment = (id) => {
    return axios({
        url: '/post_comment/' + id
    })
}


// 发表评论
export const publishComment = (id, data) => {
    return axios({
        url: '/post_comment/' + id,
        method: 'post',
        data,
    })
}


//文章搜索
export const searchArticle = (keyword) => {
    return axios({
        url: '/post_search?keyword=' + keyword
    })
}
import axios from '../utils/myaxios.js'

export const getCateList = function () {
    return axios({
        url: '/category'
    })
}



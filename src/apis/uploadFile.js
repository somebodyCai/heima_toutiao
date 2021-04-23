import axios from '@/utils/myaxios.js'


export const uploadFile = function (data) {
    return axios({
        url: `/upload`,
        method: 'post',
        data
    })
}
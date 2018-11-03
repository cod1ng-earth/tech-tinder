import {axiosInstance} from '~/main.js';

export default {
    get(id) {        
       return axiosInstance.get(`/technology/${id}`)
           .then((response) => response.data);
    },
    getRandom() {        
       return axiosInstance.get('/technology/random')
           .then((response) => response.data);
    },
    add(payload) {
        return axiosInstance.post('/technology', payload)
            .then((response) => response.data);
    },
    addVote(id, opinion) {
        return axiosInstance.post(`/technology/${id}/vote`, {opinion: opinion});
    }
}
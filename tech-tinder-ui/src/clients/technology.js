import axios from 'axios';

export default {
    get(id) {
        return Promise.resolve({
            data: {
                name: "PHP 7.4",
                description: "PHP is very bad",
                category: "language"
            }
        });
        
//        return axios.get('/technology/' + id)
//            .then((response) => response.data);
    },
    add(payload) {
        return axios.post('https://tech-tinder-backend-mkkkpcnktn.now.sh/technology', payload).then((response) => response.data);
    }
}
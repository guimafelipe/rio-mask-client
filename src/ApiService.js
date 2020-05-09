import axios from 'axios';

const url = '/api/';

class ApiService {

    static async getStores() {
        const res = await axios.get(url + 'stores');
        const data = res.data;
        return data;
    }

    static async getBairro(address) {
        const res = await axios.get(url + 'location',{
            params:{
                address: address
            }
        });
        const data = res.data;
        return data;
    }

    static async sendStore(store){
        return await axios.post(url + 'stores',{
            store
        });
    }

}

export default ApiService;
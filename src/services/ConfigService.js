import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_SERVICE_URL+'/api/config';


export default class ConfigService {

    
  updateConfig(config) {
    return axios.put(API_URL + '/update',config, { headers: authHeader() });
  }

  getConfig() {
    return axios.get(API_URL + '/get',{ headers: authHeader() }).then(d => d.data);;
  }
}
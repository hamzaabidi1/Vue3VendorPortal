import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_SERVICE_URL+'/api/test/';
const URL =  process.env.VUE_APP_SERVICE_URL+'/api/auth/';

export default class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'fournisseur', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }


  existebyname(username){
    return  axios.get(URL +'existbyusername/'+username);

  }

  signupDraft(route,res){
    axios.put(URL+'signupdraft/'+route,res);

  }
}


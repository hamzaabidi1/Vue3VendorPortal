import axios from "axios"
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_SERVICE_URL+'/api/';

export default class AdminService {

	getProducts() {
		return axios.get(API_URL+'admin/all',{ headers: authHeader()}).then(d => d.data);
    }
	deletevendor(id,email){
		return axios.delete(API_URL+'admin/delete/'+id+'/'+email,{ headers: authHeader()});
	}
	updateStatus(id,status,email){
		return axios.put(API_URL+'admin/changestatus/'+id+'/'+status+'/'+email,null,{headers: authHeader()});
	
	}
	confirmuser(id,email){
		return axios.put(API_URL+'admin/confirm/'+id+'/'+email,null,{ headers: authHeader()});
	}
	getHistory(email) {
		return axios.get(API_URL+'admin/all/history/'+email,{ headers: authHeader()}).then(d => d.data);
    }
	addtoMaximo(id,email){
		return axios.post(API_URL+'admin/addcompany/'+id+'/'+email,null,{headers: authHeader()});
	}
	getNumberOfRequest(){
		return axios.get(API_URL+'auth/getNumberProfiles').then(d => d.data);
	}
	getRequests() {
		return axios.get(API_URL+'profile/getProfiles',{ headers: authHeader()}).then(d => d.data);
    }
	deleteRequest(email){
		return axios.delete(API_URL+'profile/deleterequest/'+email,{ headers: authHeader()});
	}
	updateProfile(email,emailconnected){
		return axios.put(API_URL+'profile/requestUpdateProfile/'+email+'/'+emailconnected,null,{headers: authHeader()});
	}
	getDetailsProfile(email) {
		return axios.get(API_URL+'admin/getvendor/'+email,{ headers: authHeader()}).then(d => d.data);
		}
	getDetailsRequest(email) {
		return axios.get(API_URL+'profile/retrievevendor/'+email,{ headers: authHeader()}).then(d => d.data);
		}
}
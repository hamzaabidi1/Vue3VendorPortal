import axios from "axios"
import authHeader from './auth-header';

export default class AdminService {

	getProducts() {
		return axios.get('http://localhost:8080/api/admin/all',{ headers: authHeader()}).then(d => d.data);
    }
	deletevendor(id,email){
		return axios.delete('http://localhost:8080/api/admin/delete/'+id+'/'+email,{ headers: authHeader()});
	}
	updateStatus(id,status,email){
		return axios.put('http://localhost:8080/api/admin/changestatus/'+id+'/'+status+'/'+email,null,{headers: authHeader()});
	
	}
	confirmuser(id,email){
		return axios.put('http://localhost:8080/api/admin/confirm/'+id+'/'+email,null,{ headers: authHeader()});
	}
	getHistory(email) {
		return axios.get('http://localhost:8080/api/admin/all/history/'+email,{ headers: authHeader()}).then(d => d.data);
    }
	addtoMaximo(id,email,encode){
		return axios.post('http://localhost:8080/api/admin/addcompany/'+id+'/'+email+'/'+encode,null,{headers: authHeader()});
	}
	getNumberOfRequest(){
		return axios.get('http://localhost:8080/api/auth/getNumberProfiles').then(d => d.data);
	}
	getRequests() {
		return axios.get('http://localhost:8080/api/profile/getProfiles',{ headers: authHeader()}).then(d => d.data);
    }
}
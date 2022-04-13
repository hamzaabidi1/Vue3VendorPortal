import axios from "axios"
import authHeader from './auth-header';

export default class AdminService {

	getProducts() {
		return axios.get('http://localhost:8080/api/admin/all',{ headers: authHeader()}).then(d => d.data);
    }
	deletevendor(id){
		return axios.delete('http://localhost:8080/api/admin/delete/'+id+'/'+email,{ headers: authHeader()});
	}
	updateStatus(id,status,email){
		console.log(axios.put('http://localhost:8080/api/admin/changestatus/'+id+'/'+status+'/'+email,{ headers: authHeader()}))
		console.log(authHeader())
		
		return axios.put('http://localhost:8080/api/admin/changestatus/'+id+'/'+status+'/'+email,{ headers: authHeader()});
	
	}
	confirmuser(id,email){
		return axios.put('http://localhost:8080/api/admin/confirm/'+id+'/'+email,{ headers: authHeader()});
	}
	getHistory(email) {
		return axios.get('http://localhost:8080/api/admin/all/history/'+email,{ headers: authHeader()}).then(d => d.data);
    }
}
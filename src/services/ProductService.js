import axios from "axios"
import authHeader from './auth-header';

export default class ProductService {

	getProducts() {
		return axios.get('http://localhost:8080/api/Admin/all',{ headers: authHeader()}).then(d => d.data);
    }
	deletevendor(id){
		return axios.delete('http://localhost:8080/api/Admin/delete/'+id+"/"+email,{ headers: authHeader()});
	}
	updateStatus(id,status,email){
		return axios.put('http://localhost:8080/api/Admin/changestatus/'+id+"/"+status+"/"+email,{ headers: authHeader()});
	}
	confirmuser(id,email){
		return axios.put('http://localhost:8080/api/Admin/confirm/'+id+"/"+email,{ headers: authHeader()});
	}
	getHistory(email) {
		return axios.get('http://localhost:8080/api/Admin/all/history/'+email,{ headers: authHeader()}).then(d => d.data);
    }
}
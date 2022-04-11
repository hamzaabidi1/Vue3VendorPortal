import axios from "axios"
import authHeader from './auth-header';

export default class ProductService {

	getProducts() {
		return axios.get('http://localhost:8080/api/Admin/all',{ headers: authHeader()}).then(d => d.data);
    }
	deletevendor(id){
		return axios.delete('http://localhost:8080/api/Admin/delete/'+id,{ headers: authHeader()}).then(d => d.data);
	}
	updateStatus(id,status,email){
		var optionAxios = {
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
			}
		}
		return axios.put('http://localhost:8080/api/Admin/changestatus/'+id+"/"+status+"/"+email,{ headers: authHeader(),optionAxios}).then(d => d.data);
	}
	confirmuser(id,email){
		return axios.put('http://localhost:8080/api/Admin/confirm/'+id+"/"+email,{ headers: authHeader()}).then(d => d.data);
	}
	getHistory(email) {
		return axios.get('http://localhost:8080/api/Admin/all/history/'+email,{ headers: authHeader()}).then(d => d.data);
    }
}
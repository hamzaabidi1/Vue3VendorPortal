import axios from "axios"
import authHeader from './auth-header';

export default class ProductService {

    getProductsSmall() {
		return fetch('demo/data/products-small.json').then(res => res.json()).then(d => d.data);
	}

	getProducts() {
		return axios.get('http://localhost:8080/api/Admin/all',{ headers: authHeader()}).then(d => d.data);
    }

    getProductsWithOrdersSmall() {
		return fetch('demo/data/products-orders-small.json').then(res => res.json()).then(d => d.data);
	}
	deletevendor(id){
		return axios.delete('http://localhost:8080/api/Admin/delete/'+id,{ headers: authHeader()}).then(d => d.data);
	}
}
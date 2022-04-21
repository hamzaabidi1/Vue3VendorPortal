import axios from "axios"
import authHeader from './auth-header';

export default class VendorService {

    getpo(vendor) {
		return axios.get('http://localhost:8080/api/fournisseur/po/'+vendor,{ headers: authHeader()}).then(d => d.data);
    }
    getinvoice(vendor) {
		return axios.get('http://localhost:8080/api/fournisseur/invoices/'+vendor,{ headers: authHeader(),optionAxios}).then(d => d.data);
    }
    getrfq(vendor) {
		return axios.get('http://localhost:8080/api/fournisseur/rfq/'+vendor,{ headers: authHeader(),optionAxios}).then(d => d.data);
    }

}
import axios from "axios"
import authHeader from './auth-header';

export default class VendorService {

    getPo(vendor) {
		return axios.get('http://localhost:8080/api/fournisseur/po/'+vendor,{ headers: authHeader()}).then(d => d.data);
    }
    getInvoice(vendor) {
		return axios.get('http://localhost:8080/api/fournisseur/invoices/'+vendor,{ headers: authHeader()}).then(d => d.data);
    }
    getRfq(vendor) {
		return axios.get('http://localhost:8080/api/fournisseur/rfq/'+vendor,{ headers: authHeader()}).then(d => d.data);
    }
    getDetailsProfile(email) {
      return axios.get('http://localhost:8080/api/fournisseur/getvendor/'+email,{ headers: authHeader()}).then(d => d.data);
      }

}
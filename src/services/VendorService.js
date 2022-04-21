import axios from "axios"
import authHeader from './auth-header';

export default class VendorService {

    getpo(vendor) {
      var optionAxios = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'MAXAUTH': 'bWF4YWRtaW46bWF4YWRtaW4='
        }
    }
		return axios.get('http://localhost:8080/api/fournisseur/po/'+vendor,{ headers: authHeader(),optionAxios}).then(d => d.data);
    }
    getinvoice(vendor) {
      var optionAxios = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'MAXAUTH': 'bWF4YWRtaW46bWF4YWRtaW4='
        }
    }
		return axios.get('http://localhost:8080/api/fournisseur/invoices/'+vendor,{ headers: authHeader(),optionAxios}).then(d => d.data);
    }
    getrfq(vendor) {
      var optionAxios = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'MAXAUTH': 'bWF4YWRtaW46bWF4YWRtaW4='
        }
    }
		return axios.get('http://localhost:8080/api/fournisseur/rfq/'+vendor,{ headers: authHeader(),optionAxios}).then(d => d.data);
    }

}
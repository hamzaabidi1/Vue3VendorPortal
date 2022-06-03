import axios from "axios"
import authHeader from './auth-header';
const API_URL = process.env.VUE_APP_SERVICE_URL+'/api/';

export default class VendorService {

    getPo(vendor) {
		return axios.get(API_URL+'fournisseur/po/'+vendor,{ headers: authHeader()}).then(d => d.data);
    }
    getInvoice(vendor) {
		return axios.get(API_URL+'fournisseur/invoices/'+vendor,{ headers: authHeader()}).then(d => d.data);
    }
    getRfq(vendor) {
		return axios.get(API_URL+'fournisseur/rfq/'+vendor,{ headers: authHeader()}).then(d => d.data);
    }
    getDetailsProfile(email) {
      return axios.get(API_URL+'fournisseur/getvendor/'+email,{ headers: authHeader()}).then(d => d.data);
      }
      postRequestForUpdateProfile(formData,email) {
        return axios.post(API_URL+'fournisseur/requestUpdateProfile/'+email,formData,{ headers: authHeader()});
        }
        findRequest(email){
          return axios.get(API_URL+'fournisseur/retrievevendor/'+email,{ headers: authHeader()}).then(d => d.data);

        }
        findRfq(email){
          return axios.get(API_URL+'Rfq/GetRfq/'+email,{ headers: authHeader()}).then(d => d.data);

        }
        findRfqDetails(id){
          return axios.get(API_URL+'Rfq/GetRfqdetails/'+id,{ headers: authHeader()}).then(d => d.data);

        }

        findRfqLines(id){
          return axios.get(API_URL+'Rfq/GetRfqLines/'+id,{ headers: authHeader()}).then(d => d.data);

        }

        findRfqLineById(id){
          return axios.get(API_URL+'Rfq/GetRfqLine/'+id,{ headers: authHeader()}).then(d => d.data);

        }

        updateRfqLineById(rfqline){
          return axios.put(API_URL+'Rfq/updateRfqLine',rfqline,{ headers: authHeader()});

        }

}
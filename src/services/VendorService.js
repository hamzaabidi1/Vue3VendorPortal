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

        addRfqToMaximo(id){
          return axios.post(API_URL+'Rfq/addRfqmaximo/'+id,null,{ headers: authHeader()});
        }

        findPo(email){
          return axios.get(API_URL+'po/GetPo/'+email,{ headers: authHeader()}).then(d => d.data);

        }
        findPoDetails(id){
          return axios.get(API_URL+'po/GetPodetails/'+id,{ headers: authHeader()}).then(d => d.data);

        }

        findPoLines(id){
          return axios.get(API_URL+'po/GetpoLines/'+id,{ headers: authHeader()}).then(d => d.data);

        }

        findPoLineById(id){
          return axios.get(API_URL+'po/GetpoLine/'+id,{ headers: authHeader()}).then(d => d.data);

        }

        updatePoLineById(Poline){
          return axios.put(API_URL+'po/updatepoLine',Poline,{ headers: authHeader()});

        }


        
        findInvoice(email){
          return axios.get(API_URL+'invoice/Getinvoice/'+email,{ headers: authHeader()}).then(d => d.data);

        }
        findInvoiceDetails(id){
          return axios.get(API_URL+'invoice/Getinvoicedetails/'+id,{ headers: authHeader()}).then(d => d.data);

        }

        findInvoiceLines(id){
          return axios.get(API_URL+'invoice/GetInvoiceLines/'+id,{ headers: authHeader()}).then(d => d.data);

        }

        findInvoiceLineById(id){
          return axios.get(API_URL+'invoice/GetInvoiceLine/'+id,{ headers: authHeader()}).then(d => d.data);

        }

        updateInvoiceLineById(Invoiceline){
          return axios.put(API_URL+'invoice/updateinvoiceLine',Invoiceline,{ headers: authHeader()});

        }

        UploadFile(Invoiceline,id){
          return axios.post(API_URL+'file/upload/'+id,Invoiceline,{ headers: authHeader()});

        }

        DownloadFile(id){
          return axios.get(API_URL+'file/allfiles/'+id,{ headers: authHeader()});

        }

}
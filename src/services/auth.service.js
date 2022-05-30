import axios from 'axios';
import authHeader from './auth-header';

const URL =  process.env.VUE_APP_SERVICE_URL+'/api/auth/';

class AuthService {
  
  login(user) {
    console.log(process.env.VUE_APP_SERVICE_URL)
    return axios
      .post(URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(formData) {
    return axios.post(URL + 'signup/'+this.$route.query, {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      phone: user.phone,
      country: user.country,
      city: user.city,
      region: user.region,
      address: user.address,
      postalcode: user.postalcode,
      taxregistraionnumber: user.taxregistraionnumber,
      taxclassificationcode: user.taxclassificationcode,
      Revenuelastyear: user.Revenuelastyear,
      dateestablished: user.dateestablished,
      companywebsite: user.companywebsite,
      email: user.email,
      password: user.password
    },);
  }


  verifyemail(user) {
    console.log(window.location.origin)
    var optionAxios = {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      }
  }
    return axios.post(URL + 'verify/'+user.email,window.location.origin,{ headers: authHeader(),optionAxios }) ;
  }

  forgotpassword(user) {
    var optionAxios = {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      }
  }
    return axios.post(URL + 'forgetpassword/'+user.email,window.location.origin,{ headers: authHeader(),optionAxios }) ;
  }
}

export default new AuthService();

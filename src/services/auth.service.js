import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  
  login(user) {
    return axios
      .post(API_URL + 'signin', {
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

  register() {
    return axios.post(API_URL + 'signup/'+this.$route.query, {
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
    var optionAxios = {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      }
  }
    return axios
      .post(API_URL + 'verify/'+user.email,{ headers: authHeader(),optionAxios }) ;
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
    return axios
      .post(API_URL + 'forgetpassword/'+user.email,{ headers: authHeader(),optionAxios }) ;
  }
}

export default new AuthService();

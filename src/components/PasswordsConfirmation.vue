<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleConfirmPassword" :validation-schema="schema">
       <div class="form-group">
          <label for="password1">Password</label>
          <Field name="password1" type="password" class="form-control" v-model="password1" />
          <ErrorMessage name="password1" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password2">Confirm Password</label>
          <Field name="password2" type="password" class="form-control" v-model="password1"/>
          <ErrorMessage name="password2" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Confirm</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Password from 'primevue/password';
import axios from 'axios';

export default {
  name: "PasswordsConfirmation",
  components: {
    Form,
    Field,
    ErrorMessage,
    Password
    
  },
  data() {
    const schema = yup.object().shape({
      password2: yup.string().required("confirmation of password is required!"),
      password1: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },

  methods: {
    handleConfirmPassword(){
      console.log(this.$route.query.token);
     console.log( this.password1);
          this.$router.push('/login');
           var optionAxios = {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      }
  }
        return  axios.post('http://localhost:8080/api/auth/'+'newpassword/'+this.$route.query.token+'/'+this.password1);
         
  
  /*   this.message = "";
      this.successful = false;
      this.loading = true;
      console.log(this.formData);
      this.$store.dispatch("auth/register",{formData}).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }*/
     
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>

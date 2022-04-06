<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"/>
     
           <div class="form-group">
                        <label for="username">Vendor Name</label>
                        <Field name="username" class="form-control" id="username" v-model="username" :class="{'p-invalid': validationErrors.username && submitted}" />
                        <small v-show="validationErrors.username && submitted" class="p-error">Vendor Name is required.</small>
                    </div>

                    <div class="form-group">
                    <label for="password">Password</label>
                    <Field name="password" type="password" class="form-control" v-model="password" id="password" :class="{'p-invalid': validationErrors.password && submitted}" />
                 <small v-show="validationErrors.password && submitted" class="p-error">password is required.</small>
                </div>
        <div class="form-group">
          <Button class="btn btn-primary btn-block" label="SignUp" @click="signup()"  />
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-success" role="alert">
            {{ message }}
          </div>
        </div>

    </div>
  </div>
  <Toast />
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from "primevue/inputtext"
import InputNumber from "primevue/inputnumber"
import Calendar from 'primevue/calendar';
import Password from 'primevue/password';
import axios from 'axios'


export default {
  name: "SignUp",
   components: {
    InputNumber,
    Button,
    Card,
    InputText,
    Calendar,
    Password,
    Field
  },
  data() {
    return {
            username: '',
            password: '',
            submitted: false,
            validationErrors: {},
            message: ''
    };
  },
  methods: {
       existename(){
        return  axios.get('http://localhost:8080/api/auth/existbyusername/'+this.username);
        },
    async signup() {
        console.log("username " +this.username);
        console.log("password "+this.password);
        console.log("token "+this.$route.query.token);
        console.log(this.existename());
        //console.log(this.existename() === false);
        this.submitted = true;
        if (this.validateForm()) { 
            let result= await this.existename();
        if(result.data === false) {
       
        try {
            let res = {username: this.username,password: this.password};
            console.log("res", res);
             axios.put('http://localhost:8080/api/auth/'+'signupdraft/'+this.$route.query.token,res);
             this.$router.push('/login');
              this.$toast.add({severity:'success', summary: 'Success Message', detail:'UserName registred', life: 3000});
        } catch (error) {
            console.log(error);
        }
        
        }
      else {
        this.$toast.add({severity:'error', summary: 'Error Message', detail:'UserName already taken', life: 3000});
      }
      }
      },
        validateForm() {
                        if (!this.username.trim())
                this.validationErrors['username'] = true;
            else
                delete this.validationErrors['username'];
                        if (!this.password.trim())
                this.validationErrors['password'] = true;
            else
                delete this.validationErrors['password'];
            return !Object.keys(this.validationErrors).length;

        }
  }
}
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

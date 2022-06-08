<template>
  <div class="col-md-12">
    <div class="card card-container">
   
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"/>
     
           <div >
                        <label for="username"><strong>Username</strong></label>
                    <Field name="username" class="form-control" id="username" v-model="username" :class="{'p-invalid': validationErrors.username && submitted}" />    
                     <small v-show="validationErrors.username && submitted" class="p-error">Username is required.</small>
                    </div>

                    <div>
                    <label for="password"><strong>Password</strong></label>
                    <Password name="password" toggleMask  v-model="password" id="password" :class="{'p-invalid': validationErrors.password && submitted}" />  
                    <small v-show="validationErrors.password && submitted" class="p-error">password is required.</small>
                </div>


                 <div class="form-group ">
                    <label for="confirmPassword"><strong>Confirm Password</strong></label>
                    <Password  toggleMask name="confirmPassword"  v-model="confirmPassword" id="confirmPassword" :class="{'p-invalid': validationErrors.confirmPassword && submitted}" />  
                    <small v-show="validationErrors.confirmPassword && submitted" class="p-error">Confirm password is required.</small>
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
            confirmPassword: '',
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
        this.submitted = true;
        if (this.validateForm()) { 
            let result= await this.existename();
        if(result.data === false) {

          if (this.password == this.confirmPassword){

         
       
        try {
            let res = {username: this.username,password: this.password};
             axios.put('http://localhost:8080/api/auth/'+'signupdraft/'+this.$route.query.token,res);
              this.$toast.add({severity:'success', summary: 'Success Message', detail:'UserName registred', life: 3000});
              await this.$router.push('/login');
        } catch (error) {
            console.log(error);
        }
        }
        else 
        {
        this.$toast.add({severity:'error', summary: 'Error Message', detail:'Password does not similar', life: 3000});
        }
        }
      else {
      
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

                       if (!this.confirmPassword.trim())
                this.validationErrors['confirmPassword'] = true;
            else
                delete this.validationErrors['confirmPassword'];
            return !Object.keys(this.validationErrors).length;

        }
  }
}
</script>

<style scoped>

::v-deep(.p-password input) {
    width: 16.8rem
}

::v-deep(.p-inputtext input) {
    width: 17rem
}

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

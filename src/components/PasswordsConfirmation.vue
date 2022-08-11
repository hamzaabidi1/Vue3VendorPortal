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
          <label for="password1"><strong>{{$t('confirmpasswordpage.password')}}</strong></label>
          <Field name="password1" type="password" class="form-control" v-model="password1"  v-on:change="verif" />
          <div id="container" ></div>
          <ErrorMessage name="password1" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password2"><strong>{{$t('confirmpasswordpage.confirmpassword')}}</strong></label>
          <Field name="password2" type="password" class="form-control" v-model="password2"/>
          <ErrorMessage name="password2" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>{{$t('confirmpasswordpage.confirm')}}</span>
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
  <Toast />
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Password from 'primevue/password';
import UserService from '../services/user.service';


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

  userService: null,

    created() {

        this.userService = new UserService();

    
    
    },

  methods: {

    
        verif(){
       console.log("***")
      console.log(this.password1.length)
if (this.password1.length < 6 )
{

const myTextNode = document.createTextNode("Password Must be over 6 caracter")
const verification = document.createElement("p");
verification.setAttribute(
        'style',
        'color: red',
      );
      verification.appendChild(myTextNode)
      var element = document.getElementById("container");
      element.appendChild(verification);

}
else
{
  const elementrem = document.getElementById("container");
  elementrem.remove();

}

    },
    handleConfirmPassword(){
          if ((this.password1 == this.password2) && (this.password1.length >= 6)){
          this.userService.newpassword(this.$route.query.token,this.password1)
          this.$toast.add({severity:'success', summary: 'Success Message', detail:'Password changed succefully please connect with your new password', life: 6000})
          this.$router.push('/login');
            }
            else
          this.$toast.add({severity:'error', summary: 'Error Message', detail:'please confirm your password correctly', life: 6000})

  
    
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

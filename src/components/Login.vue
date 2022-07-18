<template>
 <loading
     :show="show"
     :label="label"
     >
 </loading>
  <div class="col-md-12" >
    <div class="card card-container" style="margin-top:1vw;margin-bottom: 1vw;">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
        style="height:3vw;width: 3vw;"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username"><strong>Username</strong></label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password"><strong>Password</strong></label>
          <Field name="password"  type="password" class="form-control"/>
          <ErrorMessage name="password" class="error-feedback" /> 
        </div>


        <div style="margin-bottom: 1vw;">
  <vue-recaptcha ref="recaptcha" sitekey="6LfqZ_0gAAAAAKqip6SnPm_Xl3dPypzsoNnj6lVS"  style="transform:scale(0.88);transform-origin:0;-webkit-transform:scale(0.88);
transform:scale(0.88);-webkit-transform-origin:0 0;transform-origin:0 0;" />

  </div>

        <!--<Recaptcha /> -->

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="rec">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
        <a href="/ForgotPassword">Forgot Password?</a>
      </Form>
    </div>
    
  </div>
 

 

  

</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import loading from 'vue-full-loading';
import * as yup from "yup";
import Button from 'primevue/button';
import Password from 'primevue/password';
import Recaptcha from './Recaptcha.vue'
import { VueRecaptcha } from 'vue-recaptcha';



export default {
  name: "Login",
  components: {
    Password,
    Form,
    Field,
    ErrorMessage,
    Button,
    Recaptcha,
    VueRecaptcha,
    loading
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      displayConfirmation : false,
      show: false,
      label: 'Loading...'
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
   mounted() {
     this.show=true
     this.delayCloseAlert();
     this.rec=true
     
    },
  methods: {

    isdisabled(x){
        return x
    },

      onEvent() {
        // when you need a reCAPTCHA challenge

        this.$refs.recaptcha.execute();
         this.rec=false
      
      },
    
     delayCloseAlert() {
            var self = this;
            setTimeout(function() { 
                self.show = false; 
            }, 3000);
        },
    openConfirmation() {
            this.displayConfirmation = true;
        },
        closeConfirmation() {
            this.displayConfirmation = false;
        },
    handleLogin(user) {
      this.loading = true;

      
   
      this.$store.dispatch("auth/login", user).then(        
        () => {
      let jsonobject= localStorage.user;
      let monobjet = JSON.parse(jsonobject)
      if (monobjet.roles == "ROLE_ADMIN")
      {
       window.location.href = "/";
      }
      else{
          if (monobjet.status == "Draft") {
            window.location.href = "/register";
          }
          else if (monobjet.status == "Submitted") {

         window.location.href = "/submitted";

          }
          else if (monobjet.status == "InProgress"){
          window.location.href = "/";
          }
          else{
          window.location.href = "/";

          }
      }
        
         
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped >
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

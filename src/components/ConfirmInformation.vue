<template>
    <div class="stepsdemo-content">
        <Card style="margin-bottom: 3vw;">
            <template v-slot:title>
                {{$t("register.confirmationpage.confirmation")}}
            </template>
            <template v-slot:content>
                <div class="field col-12">
                    <label for="class"> {{$t("register.confirmationpage.name")}} </label>
                    <b>{{formData.firstname ? formData.firstname : '-'}} {{formData.lastname ? formData.lastname : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="phone"> {{$t("register.confirmationpage.phone")}}</label>
                    <b>{{formData.phone ? formData.phone : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="class">{{$t("register.confirmationpage.country")}}</label>
                    <b>{{formData.country ? formData.country : '-'}} {{formData.city ? formData.city : '-'}} {{formData.region ? formData.region : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="address">{{$t("register.confirmationpage.address")}}</label>
                    <b>{{formData.address ? formData.address : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="codepostal">{{$t("register.confirmationpage.postalcode")}}</label>
                    <b>{{formData.postalcode ? formData.postalcode : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="taxregistrationnumber">{{$t("register.confirmationpage.registration")}}</label>
                    <b>{{formData.taxregistrationnumber ? formData.taxregistrationnumber : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="taxclassificationcode">{{$t("register.confirmationpage.classification")}}</label>
                    <b>{{formData.taxclassificationcode ? formData.taxclassificationcode : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="revenu">{{$t("register.confirmationpage.revenu")}}</label>
                    <b>{{formData.revenu ? formData.revenu : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="date">{{$t("register.confirmationpage.dateestablished")}}</label>
                    <b>{{formData.dateestablished ? formData.dateestablished : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="companywebsite">{{$t("register.confirmationpage.website")}}</label>
                    <b>{{formData.companywebsite ? formData.companywebsite : '-'}}</b>
                </div>

<div class="field col-12" style="margin-top: 2vw;">
           <div >
  <vue-recaptcha ref="recaptcha" @verify="verifyMethod" sitekey="6LfqZ_0gAAAAAKqip6SnPm_Xl3dPypzsoNnj6lVS"  style="transform:scale(0.88);transform-origin:0;-webkit-transform:scale(0.88);
transform:scale(0.88);-webkit-transform-origin:0 0;transform-origin:0 0;" />

  </div>

  </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button :label="$t('register.back')" @click="prevPage()" icon="pi pi-angle-left" style="margin-left: 1vw;"/>
                    <Button :disabled="rec" :label="$t('register.complete')" @click="complete(formData)" icon="pi pi-check" iconPos="right" class="p-button-success" style="float:right;margin-right: 1vw;"/>
                </div>
            </template>
        </Card>
    </div>
    <Toast/>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from "primevue/inputtext"
import InputNumber from "primevue/inputnumber"
import Dropdown from "primevue/dropdown"
import UserService from '../services/user.service';
import { VueRecaptcha } from 'vue-recaptcha';

export default {
  name: "Register",
   emits: ['nextPage', 'prevPage','complete'],
  components: {
    Form,
    Field,
    ErrorMessage,
    Button,
    Card,
    InputText,
    InputNumber,
    VueRecaptcha,
    Dropdown
  },
    data() {
    return {
      successful: false,
      loading: false,
      message: "",
      schema: "",
      rec: false
     
        }},
    props: {
        formData: Object
    },
     computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
     currentUser() {
      return this.$store.state.auth.user;
      
      },

  },
   userService: null,

    created() {

        this.userService = new UserService();

    
    
    },
     mounted() {
    this.rec=true
    console.log(this.formData)
     
    },
    methods: {

        verifyMethod(){
       this.rec=false
    },

 

      async onEvent() {
        // when you need a reCAPTCHA challenge

        await this.$refs.recaptcha.execute();
       
      
      },
            prevPage() {
            this.$emit('prev-page', {pageIndex: 4});
        },
      
      async complete(formData) {

         await this.userService.signupafterSteps(this.currentUser.username,formData)
         this.$toast.add({severity:'success', summary: 'Success Message', detail:'User Informations registred', life: 3000});
         window.location.href = "/submitted";
        }
    }
}
</script>
<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Confirmation
            </template>
            <template v-slot:content>
                <div class="field col-12">
                    <label for="class">Name </label>
                    <b>{{formData.firstname ? formData.firstname : '-'}} {{formData.lastname ? formData.lastname : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="phone">Phone Number </label>
                    <b>{{formData.phone ? formData.phone : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="class">Address </label>
                    <b>{{formData.country ? formData.country : '-'}} {{formData.city ? formData.city : '-'}} {{formData.region ? formData.region : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="address">Address </label>
                    <b>{{formData.address ? formData.address : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="codepostal">Code Postal </label>
                    <b>{{formData.postalcode ? formData.postalcode : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="taxregistrationnumber">Tax Registraion Number </label>
                    <b>{{formData.taxregistrationnumber ? formData.taxregistrationnumber : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="taxclassificationcode">Tax Classification Code </label>
                    <b>{{formData.taxclassificationcode ? formData.taxclassificationcode : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="revenu">Revenue For Last Year </label>
                    <b>{{formData.revenu ? formData.revenu : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="date">Date Established </label>
                    <b>{{formData.dateestablished ? formData.dateestablished : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="companywebsite">Company Web Site </label>
                    <b>{{formData.companywebsite ? formData.companywebsite : '-'}}</b>
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
                    <Button label="Complete" @click="complete(formData)" icon="pi pi-check" iconPos="right" class="p-button-success" style="float:right;"/>
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
    Dropdown
  },
    data() {
    return {
      successful: false,
      loading: false,
      message: "",
      schema: "",
     
        }},
    props: {
        formData: Object
    },
     computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
     currentUser() {
      return this.$store.state.auth.user;},

  },
   userService: null,

    created() {

        this.userService = new UserService();

    
    
    },
    methods: {
            prevPage() {
            this.$emit('prev-page', {pageIndex: 4});
        },
      
      complete(formData) {
    

         this.userService.signupafterSteps(this.currentUser.username,formData)
         this.$toast.add({severity:'success', summary: 'Success Message', detail:'User Informations registred', life: 3000});
         this.$router.push('/submitted');

        }
    }
}
</script>
<template>

    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                General Information
            </template>
            <template v-slot:subtitle>
                Enter your general information
            </template>
            <template v-slot:content>
                <div class="p-fluid">
                    <div class="field">
                        <label for="firstname">Vendor Name</label>
                        <InputText id="firstname" v-model="firstname" :class="{'p-invalid': validationErrors.firstname && submitted}" />
                        <small v-show="validationErrors.firstname && submitted" class="p-error">Firstname is required.</small>
                    </div>
                    <div class="field">
                        <label for="lastname">Vendor Subname</label>
                        <InputText id="lastname" v-model="lastname" :class="{'p-invalid': validationErrors.lastname && submitted}" />
                        <small v-show="validationErrors.lastname && submitted" class="p-error">Lastname is required.</small>
                    </div>
                    <div class="field">
                        <label for="phone">Phone Number</label>
                        <InputNumber id="phone" v-model="phone" :class="{'p-invalid': validationErrors.phone && submitted}" />
                        <small v-show="validationErrors.phone && submitted" class="p-error">Phone Number is required.</small>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <i></i>
                    <Button label="Next" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
                </div>
            </template>
        </Card>
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
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
    InputNumber,
    Button,
    Card,
    InputText,
    Calendar,
    Password
  },
    data () {
        return {
            firstname: '',
            lastname: '',
            token: '',
            phone: null,
            submitted: false,
            validationErrors: {}
        }
    },
    methods: {
        existename(){
        return  axios.get('http://localhost:8080/api/auth/'+'existbyusername/'+this.username)
        },
        nextPage() {
            this.submitted = true;
            if (this.validateForm()) {  
                if(! this.existename())
                    this.$emit('next-page', {formData: {firstname: this.firstname, lastname: this.lastname,phone: this.phone,token: this.$route.query}, pageIndex: 0});
                else
                   { console.log("user existe")
                   this.$toast.add({severity:'error', summary: 'Error Message', detail:'UserName already taken', life: 3000});}
           }
        },
        validateForm() {
            if (!this.firstname.trim())
                this.validationErrors['firstname'] = true;
            else
                delete this.validationErrors['firstname'];
            if (!this.lastname.trim())
                this.validationErrors['lastname'] = true;
            else
                delete this.validationErrors['lastname'];
            if (this.phone === null)
                this.validationErrors['phone'] = true;
            else
                delete this.validationErrors['phone'];
            return !Object.keys(this.validationErrors).length;
        }
    }
}
</script>
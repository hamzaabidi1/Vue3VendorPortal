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
                        <label for="firstname">Name</label>
                        <InputText id="firstname" v-model="firstname" :class="{'p-invalid': validationErrors.firstname && submitted}" />
                        <small v-show="validationErrors.firstname && submitted" class="p-error">Firstname is required.</small>
                    </div>
                    <div class="field">
                        <label for="lastname">Subname</label>
                        <InputText id="lastname" v-model="lastname" :class="{'p-invalid': validationErrors.lastname && submitted}" />
                        <small v-show="validationErrors.lastname && submitted" class="p-error">Lastname is required.</small>
                    </div>
                    <div class="field">
                        <label for="phone">Phone Number</label>
                        <InputNumber id="phone" v-model="phone" :class="{'p-invalid': validationErrors.phone && submitted}" />
                        <small v-show="validationErrors.phone && submitted" class="p-error">Phone Number is required.</small>
                    </div>
                    <div class="field">
                        <label for="username">Vendor Name</label>
                        <InputText id="username" v-model="username" :class="{'p-invalid': validationErrors.username && submitted}" />
                        <small v-show="validationErrors.username && submitted" class="p-error">Vendor Name is required.</small>
                    </div>

                    <div class="field">
                    <label for="password">Password</label>
                    <Password v-model="password" id="password" :class="{'p-invalid': validationErrors.password && submitted}" >
                    <template #header>
                        <h6>Pick a password</h6>
                    </template>
                    <template #footer>
                        <p class="mt-2">Suggestions</p>
                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                            <li>At least one lowercase</li>
                            <li>At least one uppercase</li>
                            <li>At least one numeric</li>
                            <li>Minimum 8 characters</li>
                        </ul>
                    </template>
                </Password>
                <small v-show="validationErrors.password && submitted" class="p-error">password is required.</small>
                </div>

                <div class="field">
                    <label for="confirmpassword">Confirm Password</label>
                    <Password v-model="confirmpassword" id="confirmpassword" :class="{'p-invalid': validationErrors.confirmpassword && submitted}" >
                    <template #header>
                        <h6>Confirm password</h6>
                    </template>
                    <template #footer>
                        <p class="mt-2">Suggestions</p>
                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                            <li>At least one lowercase</li>
                            <li>At least one uppercase</li>
                            <li>At least one numeric</li>
                            <li>Minimum 8 characters</li>
                        </ul>
                    </template>
                </Password>
                <small v-show="validationErrors.confirmpassword && submitted" class="p-error">Confirm password is required or is wrong.</small>
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
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
//import * as yup from "yup";
import StepSignup from './StepSignup.vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from "primevue/inputtext"
import InputNumber from "primevue/inputnumber"
import Calendar from 'primevue/calendar';
import Password from 'primevue/password';

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
            username: '',
            password: '',
            token: '',
            confirmpassword: '',
            phone: null,
            submitted: false,
            validationErrors: {}
        }
    },
    methods: {
        nextPage() {
            this.submitted = true;
            console.log(this.confirmpassword);
            console.log(this.password);
            if (this.validateForm() ) {
                
                this.$emit('next-page', {formData: {firstname: this.firstname, lastname: this.lastname, username: this.username,phone: this.phone,password: this.password,token: this.$route.query}, pageIndex: 0});
           
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
                        if (!this.username.trim())
                this.validationErrors['username'] = true;
            else
                delete this.validationErrors['username'];
                        if (!this.password.trim())
                this.validationErrors['password'] = true;
            else
                delete this.validationErrors['password'];
                        if (!this.confirmpassword.trim() && this.password.toString != this.confirmpassword.toString )
                this.validationErrors['confirmpassword'] = true;            
            else
                 delete this.validationErrors['confirmpassword'];
            
                  if (this.phone === null)
                this.validationErrors['phone'] = true;
            else
                delete this.validationErrors['phone'];
            return !Object.keys(this.validationErrors).length;
        }
    }
}
</script>
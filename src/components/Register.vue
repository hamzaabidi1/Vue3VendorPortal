<template>

    <div class="stepsdemo-content">
        <Card >
            <template v-slot:title>
                 {{$t("register.general.generalinformation")}}
            </template>
            <template v-slot:subtitle>
                {{$t("register.general.msggeneral")}}
            </template>
            <template v-slot:content>
                <div class="p-fluid">
                       <div class="row align-items-start">
                    <div class="col-md-6">
                    <div class="field">
                        <label for="firstname">{{$t("register.general.name")}}</label>
                        <InputText id="firstname" v-model="firstname" :class="{'p-invalid': validationErrors.firstname && submitted}" />
                        <small v-show="validationErrors.firstname && submitted" class="p-error">{{$t("register.general.nameerror")}}</small>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="field">
                        <label for="lastname">{{$t("register.general.subname")}}</label>
                        <InputText id="lastname" v-model="lastname" :class="{'p-invalid': validationErrors.lastname && submitted}" />
                        <small v-show="validationErrors.lastname && submitted" class="p-error">{{$t("register.general.subnameerror")}}</small>
                    </div>
                    </div>
                    </div>

                    <div class="row align-items-start">
                    <div class="col-md-6">
                    <div class="field">
                        <label for="phone">{{$t("register.general.phone")}}</label>
                        <InputNumber id="phone" v-model="phone" :class="{'p-invalid': validationErrors.phone && submitted}" />
                        <small v-show="validationErrors.phone && submitted" class="p-error">{{$t("register.general.phoneerror")}}</small>
                    </div>
                </div>

                  <div class="col-md-6">
                <div class="grid grid-nogutter justify-content-between">
                
                    <Button :label="$t('register.next')" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" style="float:right;max-width: 10vw;margin-top: 3vw;margin-right: 1vw;" />
                </div>
                </div>
                </div>
                </div>
            </template>
            <template v-slot:footer>
                
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

export default {
  name: "Register",
   emits: ['nextPage', 'prevPage','complete'],
 
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
    props: {
        formData: Object
    },

    
    methods: {
        nextPage() {
            this.submitted = true;
            if (this.validateForm())
            this.$emit('next-page', {formData: {firstname: this.firstname, lastname: this.lastname,phone: this.phone}, pageIndex: 0});
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
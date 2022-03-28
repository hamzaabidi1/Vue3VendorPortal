<template>

    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Address Information
            </template>
            <template v-slot:subtitle>
                Enter your Address information
            </template>
            <template v-slot:content>
                <div class="p-fluid formgrid grid">
                    
                      <div class="field">
                        <label for="country">Country</label>
                        <InputText id="country" v-model="country" :class="{'p-invalid': validationErrors.country && submitted}" />
                        <small v-show="validationErrors.country && submitted" class="p-error">Country is required.</small>
                    </div>
                        <div class="field">
                        <label for="region">State / Region</label>
                        <InputText id="region" v-model="region" :class="{'p-invalid': validationErrors.region && submitted}" />
                        <small v-show="validationErrors.region && submitted" class="p-error">region is required.</small>
                    </div>
                        <div class="field">
                        <label for="city">City</label>
                        <InputText id="city" v-model="city" :class="{'p-invalid': validationErrors.city && submitted}" />
                        <small v-show="validationErrors.city && submitted" class="p-error">City is required.</small>
                    </div>
                        <div class="field">
                        <label for="address">Address</label>
                        <InputText id="address" v-model="address" :class="{'p-invalid': validationErrors.firstname && submitted}" />
                        <small v-show="validationErrors.address && submitted" class="p-error">address is required.</small>
                    </div>
                        <div class="field">
                        <label for="potalcode">Postal Code</label>
                        <InputText id="potalcode" v-model="potalcode" :class="{'p-invalid': validationErrors.potalcode && submitted}" />
                        <small v-show="validationErrors.potalcode && submitted" class="p-error">Postal Code is required.</small>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
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
import Dropdown from "primevue/dropdown"
export default {
  name: "Register",
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
    data () {
        return {
            country: '',
            region: '',
            city: '',
            address: '',
            postalcode: '',
            submitted: false,
            validationErrors: {}
        }
    },
    methods: {
        
        validateForm() {
            if (!this.country.trim())
                this.validationErrors['country'] = true;
            else
                delete this.validationErrors['country'];
            if (!this.region.trim())
                this.validationErrors['region'] = true;
            else
                delete this.validationErrors['region'];
                        if (!this.city.trim())
                this.validationErrors['city'] = true;
            else
                delete this.validationErrors['city'];
                        if (!this.address.trim())
                this.validationErrors['address'] = true;
            else
                delete this.validationErrors['address'];
                        if (!this.postalcode.trim())
                this.validationErrors['postalcode'] = true;
            else
                delete this.validationErrors['postalcode'];

            return !Object.keys(this.validationErrors).length;
        },
        nextPage() {
            this.$emit('next-page', {formData: {country: this.country,region: this.region, city: this.city, address: this.address ,postalcode: this.postalcode}, pageIndex: 1});
        },
        prevPage() {
            this.$emit('prev-page', {pageIndex: 1});
        }
    }
}
</script>
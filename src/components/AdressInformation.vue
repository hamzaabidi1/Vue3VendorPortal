<template>

    <div class="stepsdemo-content">
        <Card style=";margin:auto;margin-bottom: 3vw;">
            <template v-slot:title>
                {{$t("register.address.addressinformation")}}
            </template>
            <template v-slot:subtitle>
                {{$t("register.address.msgaddress")}}
            </template>
            <template v-slot:content>
                <div class="p-fluid formgrid grid">

                     <div class="row align-items-start">
                    <div class="col-md-6">
                    
                      <div class="field">
                        <label for="country"> {{$t("register.address.country")}}</label>
                        <InputText id="country" v-model="country" :class="{'p-invalid': validationErrors.country && submitted}" />
                        <small v-show="validationErrors.country && submitted" class="p-error">Country is required.</small>
                    </div>
                    </div>
                      <div class="col-md-6">
                        <div class="field">
                        <label for="region"> {{$t("register.address.state")}}</label>
                        <InputText id="region" v-model="region" :class="{'p-invalid': validationErrors.region && submitted}" />
                        <small v-show="validationErrors.region && submitted" class="p-error">region is required.</small>
                    </div>
                    </div>
                    </div>

                    <div class="row align-items-start">
                    <div class="col-md-6">
                        <div class="field">
                        <label for="city"> {{$t("register.address.city")}}</label>
                        <InputText id="city" v-model="city" :class="{'p-invalid': validationErrors.city && submitted}" />
                        <small v-show="validationErrors.city && submitted" class="p-error">City is required.</small>
                    </div>
                    </div>
                     <div class="col-md-6">

                          <div class="field">
                        <label for="postalcode"> {{$t("register.address.postalcode")}}</label>
                        <InputText id="postalcode" v-model="postalcode" :class="{'p-invalid': validationErrors.postalcode && submitted}" />
                        <small v-show="validationErrors.postalcode && submitted" class="p-error">Postal Code is required.</small>
                    </div>
                       
                    </div>
                    </div>
                      

                    <div class="field">
                        <label for="address">{{$t("register.address.address")}}</label>
                        <InputText id="address" v-model="address" :class="{'p-invalid': validationErrors.address && submitted}" />
                        <small v-show="validationErrors.address && submitted" class="p-error">address is required.</small>
                    </div>

                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between" >
                    <Button :label="$t('register.back')" @click="prevPage()" icon="pi pi-angle-left" style="margin:auto" />
                    <Button :label="$t('register.next')" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" style="float:right;margin: auto;margin-right: 1vw;" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from "primevue/inputtext"
import InputNumber from "primevue/inputnumber"
import Dropdown from "primevue/dropdown"
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
            this.submitted = true;
            if (this.validateForm() ) {
            this.$emit('next-page', {formData: {country: this.country,region: this.region, city: this.city, address: this.address ,postalcode: this.postalcode}, pageIndex: 1});
            }
        },
        prevPage() {
            this.$emit('prev-page', {pageIndex: 1});
        }
    }
}
</script>
<template>

    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                {{$t("register.fiscal.fiscalinformation")}}
            </template>
            <template v-slot:subtitle>
                {{$t("register.fiscal.msgfiscal")}}
            </template>
            <template v-slot:content>
                <div class="p-fluid formgrid grid">

                     <div class="row align-items-start">
                    <div class="col-md-6">

                     <div class="field">
                        <label for="taxregistrationnumber">{{$t("register.fiscal.registration")}}</label>
                        <InputText id="taxregistrationnumber" v-model="taxregistrationnumber" :class="{'p-invalid': validationErrors.taxregistrationnumber && submitted}" />
                        <small v-show="validationErrors.taxregistrationnumber && submitted" class="p-error">tax registration number is required.</small>
                    </div>
                    </div>
                    <div class="col-md-6">
                     <div class="field">
                        <label for="taxclassificationcode">{{$t("register.fiscal.classification")}}</label>
                        <InputText id="taxclassificationcode" v-model="taxclassificationcode" :class="{'p-invalid': validationErrors.taxclassificationcode && submitted}" />
                        <small v-show="validationErrors.taxclassificationcode && submitted" class="p-error">tax classification code is required.</small>
                    </div>
                    </div>

                    </div>
                    <div class="row align-items-start">
                    <div class="col-md-6">
                    <div class="field">
                        <label for="revenu">{{$t("register.fiscal.revenu")}}</label>
                        <InputText id="revenu" v-model="revenu" :class="{'p-invalid': validationErrors.revenu && submitted}" />
                        <small v-show="validationErrors.revenu && submitted" class="p-error">Revenu is required.</small>
                    </div>
                   </div>
                   <div class="col-md-6">
                    <div class="field">
                        <label for="dateestablished">{{$t("register.fiscal.dateestablished")}}</label>
                        <Calendar id="dateestablished" v-model="dateestablished" :showIcon="true" />
                        <small v-show="validationErrors.dateestablished && submitted" class="p-error">dateestablished is required.</small>

                    </div>
                    </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <Button :label="$t('register.back')" @click="prevPage()" icon="pi pi-angle-left" />
                    <Button :label="$t('register.next')" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" style="float:right;" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import InputText from "primevue/inputtext"
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputNumber from "primevue/inputnumber"
import Dropdown from "primevue/dropdown"
import Calendar from 'primevue/calendar';
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
    Dropdown,
    Calendar,
  },
    data () {
        return {
            taxclassificationcode: '',
            taxregistrationnumber: '',
            dateestablished: '',
            revenu: '',
            submitted: false,
            validationErrors: {}
        
        }
    },
    methods: {
        nextPage() {
             this.submitted = true;
            if (this.validateForm() ) {
            this.$emit('next-page', {formData: {taxclassificationcode: this.taxclassificationcode,taxregistrationnumber: this.taxregistrationnumber,dateestablished: this.dateestablished,revenu: this.revenu}, pageIndex: 2});
            }
       },
        prevPage() {
            this.$emit('prev-page', {pageIndex: 2});
        },
         onUpload() {
            this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
        },
         validateForm() {
            if (!this.taxregistrationnumber.trim())
                this.validationErrors['taxregistrationnumber'] = true;
            else
                delete this.validationErrors['taxregistrationnumber'];
            if (!this.taxclassificationcode.trim())
                this.validationErrors['taxclassificationcode'] = true;
            else
                delete this.validationErrors['taxclassificationcode'];
                if (!this.revenu.trim())
                this.validationErrors['revenu'] = true;
            else
                delete this.validationErrors['revenu'];
                        if (this.dateestablished === null)
                this.validationErrors['dateestablished'] = true;
            else
                delete this.validationErrors['dateestablished'];
            return !Object.keys(this.validationErrors).length;
        }
    }
}
</script>
<template>

    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                 {{$t("register.legacy.legacyinformation")}}
            </template>
            <template v-slot:subtitle>
                {{$t("register.legacy.msgfiscal")}}
            </template>
            <template v-slot:content>
                
                         
                <div class="p-fluid formgrid grid">
                    <div class="field">
                        <label for="langue">{{$t("register.legacy.langue")}}</label>
                   <Dropdown id="langue" v-model="langue" :options="langues" optionLabel="name" optionValue="code" placeholder="Select a Langue" :class="{'p-invalid': validationErrors.langue && submitted}"/>
                   <small v-show="validationErrors.langue && submitted" class="p-error">{{$t("register.legacy.langueerror")}}</small>
                   </div>
                   <div class="field">
                        <label for="companywebsite">{{$t("register.legacy.website")}}</label>
                        <InputText id="companywebsite" v-model="companywebsite" :class="{'p-invalid': validationErrors.companywebsite && submitted}" />
                        <small v-show="validationErrors.companywebsite && submitted" class="p-error">{{$t("register.legacy.websiteerror")}}</small>
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
           companywebsite: '',
           langue: null,
		langues: [
			{name: 'Francais', code: 'fr'},
			{name: 'Anglais', code: 'en'},
		],
            submitted: false,
            validationErrors: {}
        }
    },
    methods: {
        nextPage() {
            console.log(this.langue)
            this.submitted = true;
            if (this.validateForm() ) {
            this.$emit('next-page', {formData: {companywebsite: this.companywebsite,langue:this.langue}, pageIndex: 3 });
            }
        },
        prevPage() {
            this.$emit('prev-page', {pageIndex: 3});
        },
        validateForm() {
            if (!this.companywebsite.trim())
                this.validationErrors['companywebsite'] = true;
            else
                delete this.validationErrors['companywebsite'];
                 if (!this.langue == null )
                this.validationErrors['langue'] = true;
            else
                delete this.validationErrors['langue'];
           
            return !Object.keys(this.validationErrors).length;
        }
    }
}
</script>
<template>

    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Legacy Information
            </template>
            <template v-slot:subtitle>
                Enter your legacy information
            </template>
            <template v-slot:content>
                <div class="p-fluid formgrid grid">
                   
                   <div class="field">
                        <label for="companywebsite">Company Web Site</label>
                        <InputText id="companywebsite" v-model="companywebsite" :class="{'p-invalid': validationErrors.companywebsite && submitted}" />
                        <small v-show="validationErrors.companywebsite && submitted" class="p-error">company web site is required.</small>
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
           companywebsite: '',
            submitted: false,
            validationErrors: {}
        }
    },
    methods: {
        nextPage() {
            this.submitted = true;
            if (this.validateForm() ) {
            this.$emit('next-page', {formData: {companywebsite: this.companywebsite}, pageIndex: 3 });
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
           
            return !Object.keys(this.validationErrors).length;
        }
    }
}
</script>
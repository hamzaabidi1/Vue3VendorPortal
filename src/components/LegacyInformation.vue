<template>

    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Legacy Information
            </template>
            <template v-slot:subtitle>
                Enter your general information
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
        setWagons(event) {
            if (this.selectedClass && event.value) {
                this.wagons = [];
                this.seats = [];
                for (let i = 1; i < 3 * event.value.factor; i++) {
                    this.wagons.push({wagon: i + event.value.code, type: event.value.name, factor: event.value.factor});
                }
            }
        },
        setSeats(event) {
            if (this.selectedWagon && event.value) {
                this.seats = [];
                for (let i = 1; i < 10 * event.value.factor; i++) {
                    this.seats.push({seat: i, type: event.value.type});
                }
            }
        },
        nextPage() {
            this.$emit('next-page', {formData: {companywebsite: this.companywebsite}, pageIndex: 3 });
        },
        prevPage() {
            this.$emit('prev-page', {pageIndex: 3});
        }
    }
}
</script>
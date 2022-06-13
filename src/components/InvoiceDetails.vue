<template>
  

        <Card  class="card" style=" margin-top: 0vw;">
            <template v-slot:title>
                Invoice Details
            </template>

            <template v-slot:content>
                <div class="row align-items-start">
                    <div class="col-md-4">
    
                    <label for="class" style="color:#3f2de1;">Invoice : </label>
                    <b style="margin-left:0.5vw">{{invoice.invoicenum ? invoice.invoicenum : ' - '}}</b>
                
                </div>
                <div class="col-md-4">
                
                    <label for="class" style="color:#3f2de1;">Description : </label>
                    <b style="margin-left:0.5vw">{{invoice.description ? invoice.description : '-'}}</b>
               
                </div>
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Status :</label>
                    <b style="margin-left:0.5vw">{{invoice.status ? invoice.status : '-'}}</b>
                </div>
                </div>

                <div class="row align-items-start">
                         <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Total Tax :</label>
                    <b style="margin-left:0.5vw">{{invoice.totaltax1 ? invoice.totaltax1 : '-'}}</b>
                </div>
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Currency :</label>
                    <b style="margin-left:0.5vw">{{invoice.currencycode ? invoice.currencycode : '-'}}</b>
                </div>
               

                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Total Cost :</label>
                    <b style="margin-left:0.5vw">{{invoice.totalcost ? invoice.totalcost : '-'}}</b>
                </div>
                </div>

                  <div class="row align-items-start">
           
                       <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Enter By :</label>
                    <b style="margin-left:0.5vw">{{invoice.enterby ? invoice.enterby : '-'}}</b>
                </div>
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Enter Date :</label>
                    <b style="margin-left:0.5vw">{{invoice.enterdate ? invoice.enterdate : '-'}}</b>
                </div>

                </div>

               
				      
				      
            </template>  
        </Card>

        
        <Toast />
        <div class="card" style=" margin-top: -2vw;">
            <h5>Invoice Line List</h5>
            <DataTable :value="invoice.invoiceLine" v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll">
                <Column field="invoicelinenum" header="Line" sortable/>
                <Column field="itemnum" header="Item" sortable/>
                <Column field="description" header="Description" sortable />
                <Column field="unitcost" header="Unit Cost" sortable/>
                <Column field="linecost" header="Line Cost" sortable/>
                <Column field="qtyforui" header="Quantity" sortable/>
                <Column field="invoiceunit" header="Unit" sortable/>
            </DataTable>
        </div>

      
	

      <Dialog  v-model:visible="invoiceEdit" :style="{width: '50vw'}" :closable="false">
      <div class="row align-items-start">
          <div class="col-md-6">
                   <label style="width: 90%;margin-right:2vw;" ><strong>Qty</strong></label>
                    <InputText id="qty" v-on:change="calcul" v-model="rfqline.quotationqty"  style="width: 95%;" /> 
                    </div>
                    <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>Unit Cost</strong></label>
                    <InputText id="unit" v-on:change="calcul" v-model="rfqline.unitcost"  style="width: 95%;" /> 
                    </div>

        </div>
        <div class="row align-items-start">
            <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>Line Cost</strong></label>
                    <InputText id="line" v-model="rfqline.linecost"  style="width: 95%;" disabled /> 
                    </div>
                    <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>Start Date</strong></label>
                    <Calendar v-model="rfqline.quoteStartDate" :showIcon="true" style="width: 95%;" />
                    </div>
    </div>
    <div class="row align-items-start">
        <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>End Date</strong></label>
                    <Calendar  v-model="rfqline.quoteEndDate" :showIcon="true" style="width: 95%;" />
                    </div>
                    <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>Delivery Date</strong></label>
                    <Calendar  v-model="rfqline.delivryDate" :showIcon="true" style="width: 95%;" />
                    </div>
    </div>
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" @click="closeBasic" class="p-button-text"/>
                        <Button label="Save" icon="pi pi-check" @click="saveEdit" autofocus />
                    </template>
                </Dialog>

              
</template>

<script>
import VendorService from '../services/VendorService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';



import ColumnGroup from 'primevue/columngroup';    
import Row from 'primevue/row'; 

import { useRoute } from 'vue-router';

export default {

        components: {
            Dropdown,
    DataTable,
    Column,
    InputText,
    Card,
    Calendar,
    Button,
     ColumnGroup,
    Row,
    Dialog


  },
    data() {
        return {
            invoiceEdit: false,
             selectedProduct2: null,

            invoiceLine:{
            id: null,
            invoicelinenum: null,
            itemnum: null,
            description: null,
            unitcost: null,
            linecost: null,
            qtyforui: null,
            invoiceunit: null,
            invoice: {
                id:''
                }
                },
        invoice: {
            id:null,
            invoicenum:'',
            description:'',
            status:'',
            totalcost: null,
            totaltax1: null,
            currencycode: null,
            enterby: null,
            enterdate: null,

            invoiceLine:{
                 id: null,
            invoicelinenum: null,
            itemnum: null,
            description: null,
            unitcost: null,
            linecost: null,
            qtyforui: null,
            invoiceunit: null,
                },
            user:{
                id:null,
                firstname:'',
                lastname:'',
                username:'',
                email:'',
                address:'',
                city:'',
                region:'',
                postalcode:'',
                country:'',
                phone:'',
                status:'',
                dateEstablished:'',
                dateCreation:'',
                companywebsite:'',
                revenu:'',
                taxregistrationnumber:'',
                taxclassificationcode:'',
                password:'',
                verifyAccountToken:'',
                resetPasswordToken:'',
                roles:{
                    id:null,
                    name:'',
                },
                vendorCommodities:{},
                enabled:true,
                admin:false,
                vendor:true},
        
   
        }
    }},

      vendorservice: null,

    created() {

        this.vendorservice = new VendorService();

    
    
    },



    
    async mounted() {
        const route = useRoute();  
         var id = route.params.idpath; 
        await this.vendorservice.findInvoiceDetails(id).then(data => this.invoice = data);
        console.log(this.po)
  
    },
    methods: {
        calcul(){
          
        },

         async  onRowSelect(event) {
         
        },
        onRowUnselect(event) {
          
        },

        closeBasic(){
            this.invoiceEdit= false;
        },
        saveEdit()
        {
            this.vendorservice. updateRfqLineById(this.rfqline);
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Line updated Successfuly', life: 3000 });
            this.invoiceEdit= false;
            this.$router.go();

        }
    }
}
</script>

<style lang="scss" scoped>
</style>
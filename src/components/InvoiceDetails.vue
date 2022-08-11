<template>
    <a href="" @click="previous" style="color:#4998DC"><b>{{$t("invoice.invoicedetails.return")}}</b> <img src="../assets/back.png"  style="height: 20px;width: 20px;"></a>


        <Card  class="card" style=" margin-top: 0vw;">
            <template v-slot:title>
               {{$t("invoice.invoicedetails.detail")}}
            </template>

            <template v-slot:content>
                <div class="row align-items-start">
                    <div class="col-md-3">
          <div class="row align-items-start">
                <div class="col-md-4"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('invoice.invoice')}}: </label>
                    </div>
                     <div class="col-md-8"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{invoice.invoicenum ? invoice.invoicenum : ' - '}}</b>
                    </div>
                    </div>
                
                </div>
                <div class="col-md-6">
                <div class="row align-items-start">
                <div class="col-md-3"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('invoice.description')}}: </label>
                    </div>
                     <div class="col-md-9"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{invoice.description ? invoice.description : '-'}}</b>
                    </div>
                    </div>
               
                </div>
                <div class="col-md-3">
                    <div class="row align-items-start">
                <div class="col-md-4"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('invoice.status')}}:</label>
                    </div>
                     <div class="col-md-8"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{invoice.status ? invoice.status : '-'}}</b>
                    </div>
                    </div>
                </div>
                </div>

                <div class="row align-items-start">
                         <div class="col-md-3">
                            <div class="row align-items-start">
                <div class="col-md-4"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('invoice.totaltax')}}:</label>
                    </div>
                     <div class="col-md-8"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{invoice.totaltax1 ? invoice.totaltax1 : '-'}}</b>
                    </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row align-items-start">
                <div class="col-md-3"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('invoice.currency')}}:</label>
                    </div>
                     <div class="col-md-9"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{invoice.currencycode ? invoice.currencycode : '-'}}</b>
                    </div>
                    </div>
                </div>
               

                <div class="col-md-3">
                      <div class="row align-items-start">
                <div class="col-md-5"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('invoice.totalcost')}}:</label>
                    </div>
                     <div class="col-md-7"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{invoice.totalcost ? invoice.totalcost : '-'}}</b>
                    </div>
                    </div>
                </div>
                </div>

                  <div class="row align-items-start">
           
                       <div class="col-md-3">
                          <div class="row align-items-start">
                <div class="col-md-4"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('invoice.enterBy')}}:</label>
                    </div>
                    <div class="col-md-8"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{invoice.enterby ? invoice.enterby : '-'}}</b>
                    </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row align-items-start">
                <div class="col-md-3"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('invoice.enterdate')}}:</label>
                    </div>
                    <div class="col-md-9"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{invoice.enterdate ? invoice.enterdate : '-'}}</b>
                    </div>
                    </div>
                </div>

                </div>

               
				      
				      
            </template>  
        </Card>

        
        <Toast />
        <div class="card" style=" margin-top: -2vw;">
            <h5>Invoice Line List</h5>
            <DataTable :value="invoices" :paginator="true" :rows="10"  v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll" :filters="filters">


                
                  <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between" >
						<span class="p-input-icon-left"  >
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="$t('invoice.search')"   style="height: 2vw;margin: auto;"/>
                        </span>
					</div>
                </template>

                <Column field="invoicelinenum" :header="$t('invoice.invoicedetails.line')" sortable/>
                <Column field="itemnum" :header="$t('invoice.invoicedetails.item')"  sortable/>
                <Column field="description" :header="$t('invoice.invoicedetails.description')"  sortable />
                <Column field="unitcost" :header="$t('invoice.invoicedetails.unitcost')"   sortable/>
                <Column field="linecost" :header="$t('invoice.invoicedetails.linecost')"  sortable/>
                <Column field="qtyforui" :header="$t('invoice.invoicedetails.qty')"   sortable/>
                <Column field="invoiceunit" :header="$t('invoice.invoicedetails.unit')"  sortable/>
            </DataTable>
        </div>

      


              
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

import { FilterMatchMode } from 'primevue/api';



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
    
            selectedProduct2: null,
            filters: {},
            invoices:null,
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
        this.initFilters();
        this.vendorservice = new VendorService();

    
    
    },



    
    async mounted() {
        const route = useRoute();  
         var id = route.params.idpath; 
        await this.vendorservice.findInvoiceDetails(id).then(data => this.invoice = data);
        console.log(this.invoice)
        this.invoices=this.invoice.invoiceLine
        console.log(this.invoices)
  
    },
    methods: {

          previous(){
             this.$router.push('/invoice')
        },
        calcul(){
          
        },

         async  onRowSelect(event) {
         
        },
        onRowUnselect(event) {
          
        },

        closeBasic(){
            
        },
    
           initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }}
    }
}
</script>

<style lang="scss" scoped>


.table-header {
    display: flex;
    align-items: end;
    justify-content: space-between;
    height: 2vw;
 

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}
</style>
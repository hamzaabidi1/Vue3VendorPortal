<template>
	<div>
        <Toast />
        <div class="card" style="max-width: 96% ;margin: auto;margin-top: 1vw;margin-bottom: 7vw;">
            <h5>Invoice List</h5>
            <DataTable :value="invoice" v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll" :paginator="true" :rows="9"  :rowsPerPageOptions="[9,20,50]"  :filters="filters" :loading="loading">
              
               <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between" >


                         <tr>
                       
                        <i class="pi  pi-sync" style="font-size: 1.5rem;margin:auto;margin-right: 1vw;" @click="refresh" v-tooltip="'refresh'"></i>
						<span class="p-input-icon-left" >
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." style="height: 2vw;margin: auto;"/>
                        </span>
                        </tr>
					</div>
                </template>

            <Column field="invoicenum" header="Invoice" sortable></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column field="totalcost" header="Total Cost" sortable></Column>
            <Column field="totaltax1" header="Total Tax" sortable></Column>
            <Column field="currencycode" header="Currency" sortable></Column>
            <Column field="enterby" header="Enter By" sortable></Column>
            <Column field="enterdate" header="Enter Date" sortable></Column>
            </DataTable>
        </div>

      
	</div>
</template>

<script>
import VendorService from '../services/VendorService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';    
import Row from 'primevue/row'; 
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from 'primevue/api';

export default {

        components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText
  },
    data() {
        return {
            invoice: null,
            filters: {},
            selectedProduct2: null,
            loading: false,
           
        }
    },
    vendorservice: null,
  
    created() {
        this.initFilters();
        this.vendorservice = new VendorService();
  
    },
   async  mounted() {
        let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.loading = true

        let res=await this.vendorservice.findInvoice(monobjet.email)
        if (Object.keys(res).length === 0){  
        await this.vendorservice.getallInvoicesfromMaximo(monobjet.username)
        this.vendorservice.findInvoice(monobjet.email).then(data => this.invoice = data,this.loading = false);
        }
        else{
            this.vendorservice.findInvoice(monobjet.email).then(data => this.invoice = data,this.loading = false);
        }
    },
    methods: {

        async refresh(){
            let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.loading = true
            await this.vendorservice.getallInvoicesfromMaximo(monobjet.username)
            this.vendorservice.findInvoice(monobjet.email).then(data => this.invoice = data,this.loading = false);
        },

        onRowSelect(event) {
            const idpath = event.data.id
            this.$router.push({ name: 'invoicedetails', params: { idpath } }) 
            
            
            
        },
        onRowUnselect(event) {
          
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
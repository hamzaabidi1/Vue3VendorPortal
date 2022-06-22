<template>
	<div>
        <Toast />
        <div class="card" style="max-width: 96% ;">
            <h5>Invoice List</h5>
            <DataTable :value="invoice" v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll" :paginator="true" :rows="5"  :rowsPerPageOptions="[5,10,20]">
              

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

export default {

        components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
  },
    data() {
        return {
            invoice: null,

            selectedProduct2: null,
           
        }
    },
    vendorservice: null,
  
    created() {

        this.vendorservice = new VendorService();
  
    },
    mounted() {
        let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)

        this.vendorservice.findInvoice(monobjet.email).then(data => this.invoice = data);
    },
    methods: {
        onRowSelect(event) {
            const idpath = event.data.id
            this.$router.push({ name: 'invoicedetails', params: { idpath } }) 
            
            
            
        },
        onRowUnselect(event) {
          
        }
    }
}
</script>
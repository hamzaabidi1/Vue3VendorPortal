<template>
    <div>
        <div class="card">
            <TabView>
	<TabPanel header="RFQ LIST">
		<div>
        <DataTable  :value="rfq" responsiveLayout="scroll">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </div>
	</TabPanel>
	<TabPanel header="PO LIST">
		<div>
        <DataTable :value="po" responsiveLayout="scroll">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </div>
	</TabPanel>
	<TabPanel header="INVOICE LIST">
		<div>
        <DataTable :value="invoice" responsiveLayout="scroll">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </div>
	</TabPanel>
</TabView>
        </div>
    </div>
</template>
<script>

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import VendorService from '../services/VendorService';

export default {
    components: {
   TabView,
   TabPanel,
   Column,
   DataTable
  },
  data() {
        return {
            po: null,
            invoice: null,
            rfq: null
        }
  },
   vendorService: null,
    created() {
        this.vendorService = new VendorService();
    },
    mounted() {
        let jsonobject= localStorage.user;
        let monobjet = JSON.parse(jsonobject)
        this.vendorService.getpo(monobjet.username).then(data => this.po = data);
        console.log(this.po)
     //   this.vendorService.getinvoice(monobjet.username).then(data2 => this.invoice = data2);
     //   this.vendorService.getrfq(monobjet.username).then(data3 => this.rfq = data3);
    }
    
}
</script>
<style lang="scss" scoped>
.tabview-custom {
    i, span {
        vertical-align: middle;
    }
    span {
        margin: 0 .5rem;
    }
}
.p-tabview p {
    line-height: 1.5;
    margin: 0;
}
</style>
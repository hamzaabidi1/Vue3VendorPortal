<template>
    <div>
        <div class="card">
            <TabView>
	<TabPanel header="RFQ LIST">
		<div>

              <DataTable :value="rfq" v-model:expandedRows="expandedRows" dataKey="id" 
      @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" responsiveLayout="scroll">
            <template #header>
                 <div class="table-header-container">
                    <Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2" />
                    <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                </div>
            </template>
            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="rfqnum" header="rfqnum"></Column>
            <Column field="description" header="description"></Column>
            <Column field="status" header="status"></Column>
            <Column field="requireddate" header="requireddate"></Column>
            <Column field="purchaseagent" header="purchaseagent"></Column>
            <template #expansion="slotProps">
                <div class="orders-subtable">
                <h5>Orders for {{slotProps.data.rfqnum}}</h5>
            <DataTable :value="slotProps.data.rfqline" responsiveLayout="scroll">
                <Column field="rfqnum" header="rfqnum" sortable></Column>
                <Column field="itemnum" header="itemnum" sortable></Column>
                <Column field="description" header="description" sortable></Column>
                <Column field="orderqty" header="orderqty" sortable></Column>
                <Column field="orderunit" header="orderunit" sortable></Column>
                <Column field="unitcost" header="unitcost" sortable></Column>
                <Column field="linecost" header="linecost" sortable></Column>
            </DataTable>
                </div>
            </template>
        </DataTable>
    </div>
	</TabPanel>
	<TabPanel header="PO LIST">
		<div>
            <DataTable :value="po" v-model:expandedRows="expandedRows" dataKey="id" 
      @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" responsiveLayout="scroll">
            <template #header>
                 <div class="table-header-container">
                    <Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2" />
                    <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                </div>
            </template>
            <Column :expander="true" headerStyle="width: 3rem" />
           <Column field="ponum" header="ponum"></Column>
            <Column field="description" header="description"></Column>
            <Column field="status" header="status"></Column>
            <Column field="requireddate" header="requireddate"></Column>
            <Column field="totalcost" header="totalcost"></Column>
            <Column field="totaltax1" header="totaltax1"></Column>
            <Column field="currencycode" header="currencycode"></Column>
            <Column field="purchaseagent" header="purchaseagent"></Column>
            <template #expansion="slotProps">
                <div class="orders-subtable">
                <h5>Orders for {{slotProps.data.invoicenum}}</h5>
            <DataTable :value="slotProps.data.poline" responsiveLayout="scroll">
                <Column field="polinenum" header="ponum" sortable></Column>
                <Column field="itemnum" header="itemnum" sortable></Column>
                <Column field="description" header="description" sortable></Column>
                <Column field="orderqty" header="orderqty" sortable></Column>
                <Column field="orderunit" header="orderunit" sortable></Column>
                <Column field="unitcost" header="unitcost" sortable></Column>
                <Column field="linecost" header="linecost" sortable></Column>
            </DataTable>
                </div>
            </template>
        </DataTable>
    </div>
	</TabPanel>
	<TabPanel header="INVOICE LIST">
		<div>
      <DataTable :value="invoice" v-model:expandedRows="expandedRows" dataKey="id" 
      @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" responsiveLayout="scroll">
            <template #header>
                 <div class="table-header-container">
                    <Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2" />
                    <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                </div>
            </template>
            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="invoicenum" header="invoicenum" sortable></Column>
            <Column field="description" header="description" sortable></Column>
            <Column field="status" header="status" sortable></Column>
            <Column field="totalcost" header="totalcost" sortable></Column>
            <Column field="totaltax1" header="totaltax1" sortable></Column>
            <Column field="currencycode" header="currencycode" sortable></Column>
            <Column field="enterby" header="enterby" sortable></Column>
            <Column field="enterdate" header="enterdate" sortable></Column>
            <template #expansion="slotProps">
                <div class="orders-subtable">
                <h5>Orders for {{slotProps.data.invoicenum}}</h5>
            <DataTable :value="slotProps.data.invoiceline" responsiveLayout="scroll">
                <Column field="invoicelinenum" header="invoicelinenum" sortable></Column>
                <Column field="itemnum" header="itemnum" sortable></Column>
                <Column field="description" header="description" sortable></Column>
                <Column field="unitcost" header="unitcost" sortable></Column>
                <Column field="linecost" header="linecost" sortable></Column>
                <Column field="qtyforui" header="qtyforui" sortable></Column>
                <Column field="invoiceunit" header="invoiceunit" sortable></Column>
            </DataTable>
                </div>
            </template>
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
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import VendorService from '../services/VendorService';


export default {
    components: {
   TabView,
   TabPanel,
   Column,
   DataTable,
   Button
  },
  data() {
        return {
            po: null,
            invoice: null,
            rfq: null,
            expandedRows: []
        }
  },
   vendorService: null,
    created() {
        this.vendorService = new VendorService();
    },
    mounted() {
        let jsonobject= localStorage.user;
        let monobjet = JSON.parse(jsonobject)
        this.vendorService.getPo(monobjet.username).then(data => this.po = data);
       this.vendorService.getInvoice(monobjet.username).then(data => this.invoice = data);
        this.vendorService.getRfq(monobjet.username).then(data => this.rfq = data);
        
    },
    methods: {
        onRowExpand(event) {
            this.$toast.add({severity: 'info', summary: 'Invoice Expanded', detail: event.data.invoicenum, life: 3000});
        },
        onRowCollapse(event) {
            this.$toast.add({severity: 'success', summary: 'Invoice Collapsed', detail: event.data.invoicenum, life: 3000});
        },
        expandAll() {
            this.expandedRows = this.invoice.filter(p => p.invoicenum);
            this.$toast.add({severity: 'success', summary: 'All Invoice Expanded', life: 3000});
        },
        collapseAll() {
            this.expandedRows = null;
            this.$toast.add({severity: 'success', summary: 'All Invoice Collapsed', life: 3000});
        }
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
<template>
    <div>
        <div class="card">
            <TabView>
	<TabPanel header="RFQ LIST">
		<div>
        <DataTable  :value="rfq" :paginator="true" :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5,10,20,50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="orgid" header="orgid"></Column>
            <Column field="replyto" header="replyto"></Column>
            <Column field="replytoattn" header="replytoattn"></Column>
            <Column field="fob" header="fob"></Column>
        </DataTable>
    </div>
	</TabPanel>
	<TabPanel header="PO LIST">
		<div>
        <DataTable :value="po" :paginator="true" :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5,10,20,50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="receipts_description" header="receipts_description"></Column>
            <Column field="contractrefnum" header="contractrefnum"></Column>
            <Column field="changeby" header="changeby"></Column>
            <Column field="currencycode" header="currencycode"></Column>
        </DataTable>
    </div>
	</TabPanel>
	<TabPanel header="INVOICE LIST">
		<div>
        <DataTable :value="invoice" :paginator="true" :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5,10,20,50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="status_description" header="status_description"></Column>
            <Column field="contractrefnum" header="contractrefnum"></Column>
            <Column field="orgid" header="orgid"></Column>
            <Column field="description" header="description"></Column>
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
        this.vendorService.getPo(monobjet.username).then(data => this.po = data);
       this.vendorService.getInvoice(monobjet.username).then(data => this.invoice = data);
        this.vendorService.getRfq(monobjet.username).then(data => this.rfq = data);
        
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
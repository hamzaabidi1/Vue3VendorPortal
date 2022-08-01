<template>
	<div>
        <Toast />
        <div class="card" style="max-width: 96% ;margin: auto;margin-top: 1vw;margin-bottom: 7vw;">
            <h5>RFQ List</h5>
            <DataTable :value="rfq" v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll" :paginator="true" :rows="5"  :rowsPerPageOptions="[5,10,20]" :filters="filters">
          <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between" >
						<span class="p-input-icon-left"  >
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>

            <Column field="rfqnum" header="RFQ" sortable></Column>
            <Column field="siteid" header="Site" sortable></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column field="requireddate" header="Require date" sortable></Column>
            <Column field="purchaseagent" header="Purchase Agent" sortable></Column>
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
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';

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
            rfq: null,
              filters: {},
            selectedProduct2: null,
           
        }
    },
    vendorservice: null,
  
    created() {

        this.initFilters();
        this.vendorservice = new VendorService();
  
    },
    mounted() {
        let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)

        this.vendorservice. findRfq(monobjet.email).then(data => this.rfq = data);
    },
    methods: {
        onRowSelect(event) {
            const idpath = event.data.id
            this.$router.push({ name: 'rfqdetails', params: { idpath } }) 
            
            
            
        },
        onRowUnselect(event) {
          
        }
        ,
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
 

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}
</style>
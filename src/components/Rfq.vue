<template>
	<div>
        <Toast />
        <div class="card" style="max-width: 96% ;margin: auto;margin-top: 1vw;margin-bottom: 7vw;">
            <h5>{{$t("rfq.rfqlist")}}</h5>
            <DataTable :value="rfq"  v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll" :paginator="true" :rows="9"  :rowsPerPageOptions="[9,20,50]" :filters="filters" :loading="loading">
          <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between" >
						<span class="p-input-icon-left" >
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="$t('rfq.search')" style="height: 2vw;margin: auto;"/>
                        </span>
					</div>
                </template>

            <Column field="rfqnum" :header="$t('rfq.rfq')" sortable></Column>
            <Column field="siteid" :header="$t('rfq.site')" sortable></Column>
            <Column field="description" :header="$t('rfq.description')" sortable></Column>
            <Column field="status" :header="$t('rfq.status')" sortable></Column>
            <Column field="requireddate" :header="$t('rfq.requireddate')" sortable></Column>
            <Column field="purchaseagent" :header="$t('rfq.purchaseagent')" sortable></Column>
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
            loading: false,
           
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
        this.loading = true;
        this.vendorservice. findRfq(monobjet.email).then(data => {this.rfq = data,this.loading = false;console.log(this.rfq)});
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
    height: 2vw;
 

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}
</style>
<template>
	<div>
        <Toast />
        <div class="card" style="max-width: 96% ;margin: auto;margin-top: 1vw;margin-bottom: 7vw;">
            <h5>{{$t("po.polist")}}</h5>
            <DataTable :value="po" v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll" :paginator="true" :rows="9"  :rowsPerPageOptions="[9,20,50]" :filters="filters" :loading="loading">
              
               <template #header>

                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between" >
                        
               
                 <tr>
                       
                        <i class="pi  pi-sync" style="font-size: 1.5rem;margin:auto;margin-right: 1vw;" @click="refresh" v-tooltip="'refresh'" ></i>
                        
                        
						<span class="p-input-icon-left" >
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="$t('po.search')" style="height: 2vw"/>
                        </span>
                     </tr>   
					</div>


                    

                </template>


            <Column field="ponum" :header="$t('po.po')" sortable></Column>
            <Column field="description" :header="$t('po.description')" sortable></Column>
            <Column field="status" :header="$t('po.status')" sortable></Column>
            <Column field="requireddate" :header="$t('po.requireddate')" sortable></Column>
            <Column field="totalcost" :header="$t('po.totalcost')" sortable></Column>
            <Column field="totaltax1" :header="$t('po.totaltax')" sortable></Column>
            <Column field="currencycode" :header="$t('po.currency')" sortable></Column>
            <Column field="purchaseagent" :header="$t('po.purchaseagent')" sortable></Column>
            <Column field="vendeliverydate" :header="$t('po.deliverydate')" sortable></Column>
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
            po: null,
            filters: {},
            selectedProduct2: null,
            loading: false,
           
        }
    },

     props: {
            poprops: Object
     },

    vendorservice: null,
  
    created() {
        this.initFilters();
        this.vendorservice = new VendorService();
  
    },
   async mounted() {
  
        let jsonobject= localStorage.user;
        let monobjet = JSON.parse(jsonobject)
        this.loading = true;
        let res=await this.vendorservice.findPo(monobjet.email)
        if (Object.keys(res).length === 0){      
        await this.vendorservice.getallposfromMaximo(monobjet.username)
        await this.vendorservice. findPo(monobjet.email).then(data => this.po = data,this.loading = false);
        
        }
        else{
            await this.vendorservice. findPo(monobjet.email).then(data => this.po = data,this.loading = false);
        }
    },
    methods: {

        async refresh(){
            let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.loading = true
            await this.vendorservice.getallposfromMaximo(monobjet.username)
            this.vendorservice.findPo(monobjet.email).then(data => this.po = data,this.loading = false);
        },

        onRowSelect(event) {
            const idpath = event.data.id
            this.$router.push({ name: 'podetails', params: { idpath } }) 
            
            
            
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
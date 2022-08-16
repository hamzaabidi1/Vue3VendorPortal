<template>
  
  <a href="" @click="previous" style="color:#4998DC"><b>{{$t("po.podetails.return")}}</b> <img src="../assets/back.png"  style="height: 20px;width: 20px;"></a>

        <Card  class="card" style=" margin-top: 0vw;">
            <template v-slot:title>
               {{$t("po.podetails.detail")}}
            </template>

            <template v-slot:content>
                <div class="row align-items-start">
                    <div class="col-md-3">

                    
            
                  <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('po.po')}}: </label>
                    </div>
                    <div class="col-md-6"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{po.ponum ? po.ponum : ' - '}}</b>
                    </div>
                    </div>
                
                </div>
                <div class="col-md-5">
                  <div class="row align-items-start">
                <div class="col-md-3"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('po.description')}} </label>
                    </div>
                    <div class="col-md-9"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{po.description ? po.description : '-'}}</b>
                    </div>
                    </div>
               
                </div>
                <div class="col-md-4">
                      <div class="row align-items-start">
                <div class="col-md-4"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('po.status')}} :</label>
                    </div>
                    <div class="col-md-8"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{po.status ? po.status : '-'}}</b>
                    </div>
                    </div>
                </div>
                </div>

                <div class="row align-items-start">
                <div class="col-md-3">

                     <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('po.requireddate')}}</label>
                    </div>
                    <div class="col-md-6"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{po.requireddate ? po.requireddate : '-'}}</b>
                    </div>
                    </div>
                </div>
            
                <div class="col-md-5">
                      <div class="row align-items-start">
                <div class="col-md-4"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('po.totalcost')}}</label>
                    </div>
                    <div class="col-md-8"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{po.totalcost ? po.totalcost : '-'}}</b>
                    </div>
                    </div>
                </div>
                 <div class="col-md-3">
                     <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('po.totaltax')}}</label>
                    </div>
                    <div class="col-md-6"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{po.totaltax1 ? po.totaltax1 : '-'}}</b>
                    </div>
                    </div>
                </div>
                </div>

                  <div class="row align-items-start">
               
                 
                <div class="col-md-3">
                    <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('po.currency')}}</label>
                    </div>
                     <div class="col-md-6"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{po.currencycode ? po.currencycode : '-'}}</b>
                    </div>
                    </div>
                </div>
                  <div class="col-md-5">

                     <div class="row align-items-start">
                <div class="col-md-4"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('po.purchaseagent')}}</label>
                    </div>
                    <div class="col-md-8"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{po.purchaseagent ? po.purchaseagent : '-'}}</b>
                    </div>
                    </div>
                </div>
                <div class="col-md-4">
                         <div class="row align-items-start">
                <div class="col-md-4"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('po.deliverydate')}}</label>
                    </div>
                    <div class="col-md-8"  style="margin:auto">
                    <b style="margin-left:0.5vw">{{po.vendeliverydate ? po.vendeliverydate : '-'}}</b>
                    </div>
                    </div>
                </div>

                </div>

               
				      
				      
            </template>  
        </Card>

        
        <Toast />
        <div class="card" style=" margin-top: -2vw;">
            <h5>{{$t('po.podetails.polinelist')}}</h5>
            <DataTable :value="polines" :paginator="true" :rows="10"  v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll" :filters="filters">



                  <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between" >
						<span class="p-input-icon-left"  >
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="$t('po.search')"   style="height: 2vw;margin: auto;"/>
                        </span>
					</div>
                </template>

                <Column field="polinenum" :header="$t('po.podetails.line')" sortable />
                <Column field="itemnum" :header="$t('po.podetails.item')" sortable />
                <Column field="description" :header="$t('po.podetails.description')" sortable />
                <Column field="orderqty" :header="$t('po.podetails.qty')" sortable/>
                <Column field="orderunit" :header="$t('po.podetails.unit')" sortable/>
                <Column field="unitcost" :header="$t('po.podetails.unitcost')" sortable/>
                <Column field="linecost" :header="$t('po.podetails.linecost')" sortable/>
                <Column field="vendeliverydate" :header="$t('po.podetails.deliverydate')" sortable/>
            </DataTable>
        </div>

           <div class="card" style=" margin-top:-1.5vw;margin-bottom:7vw">
            <h5>{{$t('po.poterms.potermslist')}}</h5>
            <DataTable :value="po.poterm" :paginator="true" :rows="3"   selectionMode="single" dataKey="id"
               responsiveLayout="scroll" :filters="filters" >
                <Column field="seqnum" :header="$t('po.poterms.sequence')" sortable />
                <Column field="potermid" :header="$t('po.poterms.term')" sortable />
                <Column field="description" :header="$t('po.poterms.description')" sortable />
     
 <Column field="sendtovendor" :header="$t('po.poterms.sendtovendor')" sortable>
                     <template #body="slotProps">
                        <span v-if="slotProps.data.sendtovendor=='true'"><img src="../assets/checked.png" style="width:1.5rem;height: 1.5rem;margin-left: 3vw;" /></span>
                        <span v-if="slotProps.data.sendtovendor=='false'"><img src="../assets/notchecked.png" style="width:1.5rem;height: 1.5rem;margin-left: 3vw;" /></span>
                    </template>
                </Column>
            </DataTable>
        </div>

      
	

      <Dialog  v-model:visible="poEdit" :style="{width: '30vw'}" :closable="false">
      <div class="row align-items-start">
          
                     <label style="width: 90%;margin-right:2vw;" ><strong>{{$t('po.updateline.deliverydate')}}</strong></label>
                    <Calendar v-model="poline.vendeliverydate" :showIcon="true" style="width: 95%;" dateFormat="yy-mm-dd"  />
                    </div>
                     <template #footer>
                        <Button :label="$t('po.updateline.cancel')" icon="pi pi-times" @click="closeBasic" class="p-button-text"/>
                        <Button :label="$t('po.updateline.save')" icon="pi pi-check" @click="saveEdit(poline)" autofocus >
                        
                        <i class="pi pi-check" style="margin-right:0.5vw"></i>
                        <span> Save</span>
                        <span v-show="loadingbutton" class="spinner-border spinner-border-sm" style="margin-left:0.5vw"></span>
                        </Button>
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
import { FilterMatchMode } from 'primevue/api';
import Checkbox from 'primevue/checkbox';




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
    Dialog,
    Checkbox


  },
    data() {
        return {
            loadingbutton:false,
            datedelivery:'',
            idpath:'',
            poEdit: false,
             selectedProduct2: null,
              filters: {},
            polines:null,
              poline:{
            id: null,
            polinenum: null,
            itemnum: null,
            description: null,
            orderqty: null,
            orderunit: null,
            unitcost: null,
            linecost: null,
            vendeliverydate:' ',
                },
        po: {
            id:null,
            ponum:'',
            description:'',
            status:'',
            requireddate:'',
            purchaseagent:'',
             totalcost: null,
            totaltax1: null,
            currencycode: null,
            vendeliverydate:'' ,
            poid:'',
            poline:{
                id:null,
                polinenum: null,
                itemnum: null,
                description: null,
                orderqty: null,
                orderunit: null,
                unitcost: null,
                linecost: null,
                vendeliverydate: ' ',
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
         this.id = route.params.idpath; 
        await this.vendorservice.findPoDetails(this.id).then(data => this.po = data);
        console.log(this.po)
        this.polines=this.po.poline;
        console.log(this.polines)
  
    },
    methods: {

        previous(){
             this.$router.push('/po')
        },
       
         async  onRowSelect(event) {
            const idline = event.data.id
              this.poEdit= true;
              this.vendorservice. findPoLineById(idline).then(data1 => this.poline = data1);
              console.log(this.poline)
        },
        onRowUnselect(event) {
          
        },

        closeBasic(){
            this.poEdit= false;
        },
        async saveEdit(poline)
        {
            this.loadingbutton=true
            var moment = require('moment');
            var vendeliverydatestring = moment(poline.vendeliverydate).format("YYYY-MM-DD");
            poline.vendeliverydate = vendeliverydatestring
            await this.vendorservice.updatePoLineByIdMaximo(this.po.poid,poline)
            await this.vendorservice.updatePoLineById(poline);
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Line updated Successfuly', life: 3000 });
            this.loadingbutton=false;
            this.poEdit= false;
            this.po={}
            await this.vendorservice.findPoDetails(this.id).then(data => this.po = data);
            this.polines={}
            this.polines=this.po.poline;

        },

           initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }}
    }
}
</script>

<style lang="scss" scoped>
.sendtovendor-true {
  color: #006e09 !important;
  background-color: #a5e6a8 ;
}

.sendtovendor-false {

  background-color: #e68e8e;
  color: #ff0000!important;
}

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
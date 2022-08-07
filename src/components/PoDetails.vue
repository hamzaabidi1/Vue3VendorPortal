<template>
  
  <a href="" @click="previous" style="color:#4998DC"><b>return</b> <img src="../assets/back.png"  style="height: 20px;width: 20px;"></a>

        <Card  class="card" style=" margin-top: 0vw;">
            <template v-slot:title>
                PO Details
            </template>

            <template v-slot:content>
                <div class="row align-items-start">
                    <div class="col-md-4">

                    
            
            
                
                    <label for="class" style="color:#3f2de1;">PO : </label>
                    <b style="margin-left:0.5vw">{{po.ponum ? po.ponum : ' - '}}</b>
                
                </div>
                <div class="col-md-4">
                
                    <label for="class" style="color:#3f2de1;">Description : </label>
                    <b style="margin-left:0.5vw">{{po.description ? po.description : '-'}}</b>
               
                </div>
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Status :</label>
                    <b style="margin-left:0.5vw">{{po.status ? po.status : '-'}}</b>
                </div>
                </div>

                <div class="row align-items-start">
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Require date :</label>
                    <b style="margin-left:0.5vw">{{po.requireddate ? po.requireddate : '-'}}</b>
                </div>
            
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Total Cost :</label>
                    <b style="margin-left:0.5vw">{{po.totalcost ? po.totalcost : '-'}}</b>
                </div>
                 <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Total Tax :</label>
                    <b style="margin-left:0.5vw">{{po.totaltax1 ? po.totaltax1 : '-'}}</b>
                </div>
                </div>

                  <div class="row align-items-start">
               
                 
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Currency :</label>
                    <b style="margin-left:0.5vw">{{po.currencycode ? po.currencycode : '-'}}</b>
                </div>
                  <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Purchase Agent :</label>
                    <b style="margin-left:0.5vw">{{po.purchaseagent ? po.purchaseagent : '-'}}</b>
                </div>
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Delivery Date :</label>
                    <b style="margin-left:0.5vw">{{po.vendeliverydate ? po.vendeliverydate : '-'}}</b>
                </div>

                </div>

               
				      
				      
            </template>  
        </Card>

        
        <Toast />
        <div class="card" style=" margin-top: -2vw;">
            <h5>PO Line List</h5>
            <DataTable :value="polines" :paginator="true" :rows="10"  v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll" :filters="filters">



                  <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between" >
						<span class="p-input-icon-left"  >
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..."   style="height: 2vw;margin: auto;"/>
                        </span>
					</div>
                </template>


                <Column field="polinenum" header="Line" sortable />
                <Column field="itemnum" header="Item" sortable />
                <Column field="description" header="Description" sortable />
                <Column field="orderqty" header="Quantity" sortable/>
                <Column field="orderunit" header="Unit" sortable/>
                <Column field="unitcost" header="Unit Cost" sortable/>
                <Column field="linecost" header="Line Cost" sortable/>
                <Column field="vendeliverydate" header="Delivery Date" sortable/>
            </DataTable>
        </div>

           <div class="card" style=" margin-top:-1.5vw;margin-bottom:7vw">
            <h5>PO Term List</h5>
            <DataTable :value="po.poterm" :paginator="true" :rows="3"   selectionMode="single" dataKey="id"
               responsiveLayout="scroll" :filters="filters" >
                <Column field="seqnum" header="Sequence" sortable />
                <Column field="potermid" header="Term" sortable />
                <Column field="description" header="Description" sortable />
           <!--      <Column field="sendtovendor" header="Send To Vendor" sortable>
                <template #body="slotProps">
                        <span style="float:center;margin:auto;margin-left: 3vw;" :class="' sendtovendor-' + (slotProps.data.sendtovendor ? slotProps.data.sendtovendor.toLowerCase() : '')">{{slotProps.data.sendtovendor}}</span>
                    </template>
                </Column>-->

            <!-- <Column header="Send To Vendor" field="sendtovendor">
                        <template  #body="slotProps" >
                            <Checkbox v-model="slotProps.data.sendtovendor"  :binary="true"  :disabled="true"  />
                        </template>
                    </Column>
-->
 <Column field="sendtovendor" header="Send To Vendor" sortable>
                     <template #body="slotProps">
                        <span v-if="slotProps.data.sendtovendor=='true'"><img src="../assets/checked.png" style="width:1.5rem;height: 1.5rem;margin-left: 3vw;" /></span>
                        <span v-if="slotProps.data.sendtovendor=='false'"><img src="../assets/notchecked.png" style="width:1.5rem;height: 1.5rem;margin-left: 3vw;" /></span>
                    </template>
                </Column>
            </DataTable>
        </div>

      
	

      <Dialog  v-model:visible="poEdit" :style="{width: '30vw'}" :closable="false">
      <div class="row align-items-start">
          
                     <label style="width: 90%;margin-right:2vw;" ><strong>Delivery Date</strong></label>
                    <Calendar v-model="poline.vendeliverydate" :showIcon="true" style="width: 95%;" />
                    </div>
                
                   

 
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" @click="closeBasic" class="p-button-text"/>
                        <Button label="Save" icon="pi pi-check" @click="saveEdit(poline)" autofocus />
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
            vendeliverydate:'',
            po: {
                id:''
                }
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
                vendeliverydate: '',
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
             await  this.vendorservice. findPoLineById(idline).then(data1 => this.poline = data1);
              console.log(this.poline)
        },
        onRowUnselect(event) {
          
        },

        closeBasic(){
            this.poEdit= false;
        },
        async saveEdit(poline)
        {
             console.log("*********************"+poline.vendeliverydate)
            console.log("*********************"+this.poline.vendeliverydate)
            await this.vendorservice.updatePoLineByIdMaximo(this.po.poid,poline)
            await this.vendorservice.updatePoLineById(this.poline);
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Line updated Successfuly', life: 3000 });
            this.poEdit= false;
            this.po={}
            await this.vendorservice.findPoDetails(this.id).then(data => this.po = data);

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
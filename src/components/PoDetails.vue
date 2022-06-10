<template>
  

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
            <DataTable :value="po.poline" v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll">
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

      
	

      <Dialog  v-model:visible="poEdit" :style="{width: '30vw'}" :closable="false">
      <div class="row align-items-start">
          
                     <label style="width: 90%;margin-right:2vw;" ><strong>Delivery Date</strong></label>
                    <Calendar v-model="poline.vendeliverydate" :showIcon="true" style="width: 95%;" />
                    </div>
                
                   

 
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" @click="closeBasic" class="p-button-text"/>
                        <Button label="Save" icon="pi pi-check" @click="saveEdit" autofocus />
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
    Dialog


  },
    data() {
        return {
            poEdit: false,
             selectedProduct2: null,

              poline:{
            id: null,
            polinenum: null,
            itemnum: null,
            description: null,
            orderqty: null,
            orderunit: null,
            unitcost: null,
            linecost: null,
            vendeliverydate:null,
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
            vendeliverydate:null ,
            poline:{
                id:null,
                polinenum: null,
                itemnum: null,
                description: null,
                orderqty: null,
                orderunit: null,
                unitcost: null,
                linecost: null,
                vendeliverydate: null,
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

        this.vendorservice = new VendorService();

    
    
    },



    
    async mounted() {
        const route = useRoute();  
         var id = route.params.idpath; 
        await this.vendorservice.findPoDetails(id).then(data => this.po = data);
      //  this.vendorservice. findRfqLines(this.rfq.id).then(data => this.rfqLine = data);
        console.log(this.po)
  
    },
    methods: {
        calcul(){
            let qty=document.getElementById("qty").value
            let unit =document.getElementById("unit").value
            console.log(qty)
                let line =document.getElementById("line").value 
                line=qty*unit;
                this.rfqline.linecost=line;
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
        saveEdit()
        {
            this.vendorservice.updatePoLineById(this.poline);
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Line updated Successfuly', life: 3000 });
            this.poEdit= false;
            this.$router.go();

        }
    }
}
</script>

<style lang="scss" scoped>
</style>
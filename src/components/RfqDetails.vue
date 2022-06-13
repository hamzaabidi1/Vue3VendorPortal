<template>
  

        <Card  class="card" style=" margin-top: 0vw;">
            <template v-slot:title>
                RFQ Details
                <Button  class="p-button-raised p-button-text" style="float:right;" :loading="loading[0]" @click="load(0)" ><b style="color:#4998DC;height: 2vw;margin-right: 0.5vw;">Submit </b><img src="../assets/ibmmaximo.png" style="max-width:3vw;max-height:1.5vw;"/></Button>
            </template>

            <template v-slot:content>
                <div class="row align-items-start">
                    <div class="col-md-4">
                
                    <label for="class" style="color:#3f2de1;">RFQ : </label>
                    <b style="margin-left:0.5vw">{{rfq.rfqnum ? rfq.rfqnum : ' - '}}</b>
                
                </div>
                <div class="col-md-4">
                
                    <label for="class" style="color:#3f2de1;">Description : </label>
                    <b style="margin-left:0.5vw">{{rfq.description ? rfq.description : '-'}}</b>
               
                </div>
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Status :</label>
                    <b style="margin-left:0.5vw">{{rfq.status ? rfq.status : '-'}}</b>
                </div>
                </div>

                <div class="row align-items-start">
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Require date :</label>
                    <b style="margin-left:0.5vw">{{rfq.requireddate ? rfq.requireddate : '-'}}</b>
                </div>
                <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Purchase Agent :</label>
                    <b style="margin-left:0.5vw">{{rfq.purchaseagent ? rfq.purchaseagent : '-'}}</b>
                </div>
                 <div class="col-md-4">
                    <label for="class" style="color:#3f2de1;">Site :</label>
                    <b style="margin-left:0.5vw">{{rfq.siteid ? rfq.siteid : '-'}}</b>
                </div>
                </div>

               
				      
				      
            </template>  
        </Card>

        
        <Toast />
        <div class="card" style=" margin-top: -2vw;">
            <h5>RFQ Line List</h5>
            <DataTable :value="rfq.rfqline" v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll">
                <Column field="rfqlinenum" header="Line" sortable style="font-size:small;"/>
                <Column field="itemnum" header="Item" sortable style="font-size:small;"/>
                <Column field="description" header="Description" sortable style="font-size:small;"/>
                <Column field="orderqty" header="Qty Requested" sortable style="font-size:small;"/>
                <Column field="orderunit" header="Unit" sortable style="font-size:small;"/>
                <Column field="quoteStartDate" header="Start Date" sortable style="font-size:small;" />
                <Column field="quoteEndDate" header="End Date" sortable style="font-size:small;"/>
                <Column field="delivryDate" header="Delivery Date" sortable style="font-size:small;"/>
                <Column field="quotationqty" header="Qty" sortable style="font-size:small;"/>
                <Column field="unitcost" header="Unit Cost" sortable style="font-size:small;"/>
                <Column field="linecost" header="Line Cost" sortable style="font-size:small;" />
            </DataTable>
        </div>

      
	

      <Dialog  v-model:visible="rfqEdit" :style="{width: '50vw'}" :closable="false">
      <div class="row align-items-start">
          <div class="col-md-6">
                   <label style="width: 90%;margin-right:2vw;" ><strong>Qty</strong></label>
                    <InputText id="qty" v-on:change="calcul" v-model="rfqline.quotationqty"  style="width: 95%;" /> 
                    </div>
                    <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>Unit Cost</strong></label>
                    <InputText id="unit" v-on:change="calcul" v-model="rfqline.unitcost"  style="width: 95%;" /> 
                    </div>

        </div>
        <div class="row align-items-start">
            <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>Line Cost</strong></label>
                    <InputText id="line" v-model="rfqline.linecost"  style="width: 95%;" disabled /> 
                    </div>
                    <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>Start Date</strong></label>
                    <Calendar v-model="rfqline.quoteStartDate" :showIcon="true" style="width: 95%;" />
                    </div>
    </div>
    <div class="row align-items-start">
        <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>End Date</strong></label>
                    <Calendar  v-model="rfqline.quoteEndDate" :showIcon="true" style="width: 95%;" />
                    </div>
                    <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>Delivery Date</strong></label>
                    <Calendar  v-model="rfqline.delivryDate" :showIcon="true" style="width: 95%;" />
                    </div>
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
            loading: [false, false, false],
            rfqEdit: false,
             selectedProduct2: null,

              rfqline:{
                id:null,
                rfqlinenum:null,
                itemnum:null,
                description:'',
                orderqty:null,
                orderunit:null,
                unitcost:null,
                linecost:null,
                quotationqty:null,
                quoteStartDate:'',
                quoteEndDate:'',
                delivryDate:'',
                rfq: {
                    id:''
                }
                },
        rfq: {
            id:null,
            rfqnum:'',
            siteid:'',
            description:'',
            status:'',
            requireddate:'',
            purchaseagent:'',
            rfqline:{
                id:null,
                rfqlinenum:null,
                itemnum:null,
                description:'',
                orderqty:null,
                orderunit:null,
                unitcost:null,
                linecost:null,
                quotationqty:null,
                quoteStartDate:'',
                quoteEndDate:'',
                delivryDate:''
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
        await this.vendorservice.findRfqDetails(id).then(data => this.rfq = data);
      //  this.vendorservice. findRfqLines(this.rfq.id).then(data => this.rfqLine = data);
        console.log(this.rfq)
  
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

         async load(index) {
            this.loading[index] = true;
            setTimeout(() => this.loading[index] = false, 2000);
              
           
            await this.vendorservice.addRfqToMaximo(this.rfq.id);
             this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Rfq submitted Successfuly to maximo', life: 3000 });
        },

         async  onRowSelect(event) {
            const idline = event.data.id
              this.rfqEdit= true;
             await  this.vendorservice. findRfqLineById(idline).then(data1 => this.rfqline = data1);
              console.log(this.rfqline)
        },
        onRowUnselect(event) {
          
        },

        closeBasic(){
            this.rfqEdit= false;
        },
        saveEdit()
        {
            this.vendorservice. updateRfqLineById(this.rfqline);
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Line updated Successfuly', life: 3000 });
            this.rfqEdit= false;
            this.$router.go();

        }
    }
}
</script>

<style lang="scss" scoped>
</style>
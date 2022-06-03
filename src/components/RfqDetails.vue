<template>
  

        <Card  class="card" style=" margin-top: 0vw;">
            <template v-slot:title>
                RFQ Details
            </template>

            <template v-slot:content>
                <div class="field col-12">
                    <label for="class">RFQ : </label>
                    <b>{{rfq.rfqnum ? rfq.rfqnum : ' - '}}</b>
                </div>
                <div class="field col-12">
                    <label for="class">Description : </label>
                    <b>{{rfq.description ? rfq.description : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="class">Status :</label>
                    <b>{{rfq.status ? rfq.status : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="class">Require date :</label>
                    <b>{{rfq.requireddate ? rfq.requireddate : '-'}}</b>
                </div>
                <div class="field col-12">
                    <label for="class">Purchase Agent :</label>
                    <b>{{rfq.purchaseagent ? rfq.purchaseagent : '-'}}</b>
                </div>

               
				      
				      
            </template>  
        </Card>

        
        <Toast />
        <div class="card" style=" margin-top: -2vw;">
            <h5>RFQ List</h5>
            <DataTable :value="rfq.rfqline" v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll">
                <Column field="rfqlinenum" header="Line" />
                <Column field="itemnum" header="Item" />
                <Column field="description" header="Description" />
                <Column field="orderqty" header="Qty Requested" />
                <Column field="orderunit" header="Unit" />
                <Column field="unitcost" header="Unit Cost"/>
                <Column field="linecost" header="Line Cost" />
                <Column field="quotationqty" header="Qty" />
                <Column field="quoteStartDate" header="Start Date" />
                <Column field="quoteEndDate" header="End Date"/>
                <Column field="delivryDate" header="Delivery Date"/>
            </DataTable>
        </div>

      
	

      <Dialog  v-model:visible="rfqEdit" :style="{width: '50vw'}" :closable="false">
                   <label style="width: 90%;margin-right:2vw;" ><strong>Qty</strong></label>
                    <InputText v-model="rfqline.quotationqty"  style="width: 95%;" /> 
                    <label style="width: 90%;margin-right:2vw;" ><strong>Start Date</strong></label>
                    <Calendar v-model="rfqline.quoteStartDate" :showIcon="true" style="width: 95%;" />
                    <label style="width: 90%;margin-right:2vw;" ><strong>End Date</strong></label>
                    <Calendar  v-model="rfqline.quoteEndDate" :showIcon="true" style="width: 95%;" />
                    <label style="width: 90%;margin-right:2vw;" ><strong>Delivery Date</strong></label>
                    <Calendar  v-model="rfqline.delivryDate" :showIcon="true" style="width: 95%;" />
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
        const id = route.params.idpath; 
        console.log(id)
        await this.vendorservice.findRfqDetails(id).then(data => this.rfq = data);
      //  this.vendorservice. findRfqLines(this.rfq.id).then(data => this.rfqLine = data);
        console.log(this.rfq)
  
    },
    methods: {

         async  onRowSelect(event) {
            const idline = event.data.id
              this.rfqEdit= true;
             await  this.vendorservice. findRfqLineById(idline).then(data1 => this.rfqline = data1);
              console.log(this.rfqline)
          //  this.$router.push({ name: 'rfqdetails', params: { idpath } }) 
            
            
            
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

        }
    }
}
</script>

<style lang="scss" scoped>
</style>
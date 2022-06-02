<template>
    <div class="p-fluid">
        <Card style="max-width: 96% ;" class="card">
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

        <div class="card" style="max-width: 96% ; margin-top: -2vw;">
            <h5>RFQ Lines</h5>
            <DataTable :value="rfq.rfqline" editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave" responsiveLayout="scroll">
                <Column field="rfqlinenum" header="Line" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="itemnum" header="Item" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="description" header="Description" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="orderqty" header="Quantity" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="orderunit" header="Unit" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="unitcost" header="Unit Cost" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="linecost" header="Line Cost" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="quotationqty" header="Quantity for Quote" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="quoteStartDate" header="Quote Start Date" style="width:20%">
                    <template #editor="{ data, field }">
                    <Calendar id="icon" v-model="data[field]" :showIcon="true" autofocus />
                    
                    </template>
                </Column>
                <Column field="quoteEndDate" header="Quote End Date" style="width:20%">
                    <template #editor="{ data, field }">
                        <Calendar id="icon" v-model="data[field]" :showIcon="true" autofocus />
                    </template>
                </Column>
                <Column field="delivryDate" header="Delivery Date" style="width:20%">
                    <template #editor="{ data, field }">
                       <Calendar id="icon" v-model="data[field]" :showIcon="true" autofocus />
                    </template>
                </Column>
               
                <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
            </DataTable>
        </div>
        
    </div>
</template>

<script>
import VendorService from '../services/VendorService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import { useRoute } from 'vue-router';

export default {

        components: {
            Dropdown,
    DataTable,
    Column,
    InputText,
    Card,
    Calendar

  },
    data() {
        return {
        rfq: {
            "id":null,
            "rfqnum":'',
            "description":'',
            "status":'',
            "requireddate":'',
            "purchaseagent":'',
            "rfqline":{
                "id":null,
                "rfqlinenum":null,
                "itemnum":null,
                "description":'',
                "orderqty":null,
                "orderunit":null,
                "unitcost":null,
                "linecost":null,
                "quotationqty":null,
                "quoteStartDate":'',
                "quoteEndDate":'',
                "delivryDate":''
                },
            "user":{
                "id":null,
                "firstname":'',
                "lastname":'',
                "username":'',
                "email":'',
                "address":'',
                "city":'',
                "region":'',
                "postalcode":'',
                "country":'',
                "phone":'',
                "status":'',
                "dateEstablished":'',
                "dateCreation":'',
                "companywebsite":'',
                "revenu":'',
                "taxregistrationnumber":'',
                "taxclassificationcode":'',
                "password":'',
                "verifyAccountToken":'',
                "resetPasswordToken":'',
                "roles":{
                    "id":'',
                    "name":'',
                "vendorCommodities":{}
                ,"enabled":true,
                "admin":false,
                "vendor":true}},
        
        editingRows: [],
        }
    }},

      vendorservice: null,

    created() {

        this.vendorservice = new VendorService();
    
    },
    
    mounted() {
        const route = useRoute();  
        const id = route.params.idpath; 
        console.log(id)
        this.vendorservice.findRfqDetails(id).then(data => this.rfq = data);
        console.log(this.rfq)
  
    },
    methods: {
        onRowEditSave(event) {
            let { newData, index } = event;

            this.rfq.rfqline[index] = newData;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <a href="" @click="previous" style="color:#4998DC"><b>{{$t("rfq.rfqdetails.return")}}</b> <img src="../assets/back.png"  style="height: 20px;width: 20px;"></a>

        <Card  class="card" style=" margin: auto;">
            <template v-slot:title>
                {{$t("rfq.rfqdetails.detail")}}
                <Button  v-tooltip.left="'click to send Rfq to Maximo'" id="submitToMaximo" :disabled='isDisabled' class="p-button-raised p-button-text" style="float:right;" :loading="loading[0]" @click="load(0)" >
                <b style="color:#4998DC;height: 2vw;margin-right: 0.5vw;">{{$t('rfq.submit')}} </b>
                <img src="../assets/ibmmaximo.png" style="max-width:3vw;max-height:1.5vw;"/>
                <b style="color:#4998DC;height: 2vw;margin-left: 0.5vw;" id="date"></b>
                <span v-show="loadingbutton" class="spinner-border spinner-border-sm" style="margin-left:0.5vw"></span></Button>
            </template>

            <template v-slot:content>
                
                      
 <Dialog header="Upload File Attachment" v-model:visible="filedialog" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '30vw'}">
                       
                        
                <FileUpload :disabled="statusupload" name="demo[]" :customUpload="true" @uploader="onUpload" :multiple="true" accept=".pdf,.png,.jpeg,.jpg,.txt" :maxFileSize="100000000">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                </FileUpload>
                
                    <ProgressBar  v-if="progressstatus" mode="indeterminate" style="height: .5em"   />
                   
                </Dialog>
            <div class="row align-items-start">
                <div class="col-md-8">
                    
                <div class="row align-items-start">
                    <div class="col-md-5"  style="margin:auto">
                    <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('rfq.rfq')}}: </label>
                    </div>
                    <div class="col-md-6"  style="margin:auto">
                    <b style="font-size: small;margin-left:0.5vw">{{rfq.rfqnum ? rfq.rfqnum : ' - '}}</b>
                    </div>
                    </div>
                
                </div>
                <div class="col-md-5 "  style="margin:auto">
                 <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('rfq.description')}}: </label>
                    </div>
                    <div class="col-md-6"  style="margin:auto">
                    <b style="font-size: small;margin-left:0.5vw">{{rfq.description ? rfq.description : '-'}}</b>
                    </div>
                    </div>
               
                </div>
              
                </div>

            <div class="row">
                  <div class="col-md-5"  style="margin:auto">
                  <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                    <label for="class"   style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('rfq.status')}}:</label>
                    </div>
                    <div class="col-md-6"  style="margin:auto">
                    <b style="font-size: small;margin-left:0.5vw">{{rfq.status ? rfq.status : '-'}}</b>
                    </div>
                    </div>
                </div>

                  
                <div class="col-md-5"   style="margin:auto">
                  <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('rfq.requireddate')}}:</label>
                    </div>
                    <div class="col-md-6"  style="margin:auto">
                    <b style="font-size: small;margin-left:0.5vw">{{rfq.requireddate ? rfq.requireddate : '-'}}</b>
                    </div>
                    </div>
                </div>
                </div>

              <div class="row">
                <div class="col-md-5"  style="margin:auto">
                  <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('rfq.purchaseagent')}}:</label>
                    </div>
                     <div class="col-md-6"  style="margin:auto">
                    <b style="font-size: small;margin-left:0.5vw">{{rfq.purchaseagent ? rfq.purchaseagent : '-'}}</b>
                    </div>
                    </div>
                </div>
                 <div class="col-md-5" style="margin:auto">
                     <div class="row align-items-start">
                <div class="col-md-6"  style="margin:auto">
                    <label for="class" style="font-size:100%;font-weight: bold;text-align: center;color:#3f2de1;">{{$t('rfq.site')}}:</label>
                    </div>
                     <div class="col-md-6"  style="margin:auto">
                    <b style="font-size: small;margin-left:0.5vw">{{rfq.siteid ? rfq.siteid : '-'}}</b>
                    </div>
                    </div>
                </div>
                </div>
                </div>

                <div class="col-md-4">
                    

                    <div  style="width:100%; height: 100%; margin: auto;">

                    <span style="font-size:100%;font-weight: bold;text-align: center;margin :auto ;margin-left: 30%;">{{$t("rfq.rfqdetails.attachment")}} <i v-if="!this.rfq.statusofSend" @click="open" class="pi pi-paperclip"></i></span>
                    <div style="margin:auto;margin-left:30%" >
                    <tr v-for=" file in filedownload.data " :key="file.id" >

                    <a v-tooltip.top="'click to Download'" style="font-size: small;" :href="file.url"  download>
                    <span v-if="file.name.includes('.txt')" style="color:red" class="pi pi-file"></span>
                    <span v-if="file.name.includes('.pdf')" style="color:red" class="pi pi-file-pdf"></span>
                    <span v-if="file.name.includes('.png')" style="color:red" class="pi pi-image"></span>
                    <span v-if="file.name.includes('.jpg')" style="color:red" class="pi pi-image"></span>
                    <span v-if="file.name.includes('.jpeg')" style="color:red" class="pi pi-image"></span>
                       {{file.name}}  </a>
                    <i v-if="!this.rfq.statusofSend" v-tooltip.top="'delete'" @click="deletefile(file.url)" class="pi pi-trash" style="margin-left:0.5vw ;color:#4998DC"></i>
                 
                    </tr>
                    <span v-show="loadingfiles" class="spinner-border spinner-border-sm" style="width: 50%vw;height: 50%;margin:auto"></span>
                    </div>
                    </div>              
                </div>
                

                
            </div>
               
				      
				      
            </template>  
        </Card>

        
        <Toast />
        <div class="card" style=" margin: auto; margin-bottom: 5vw;">
            <h5>{{$t('rfq.rfqdetails.rfqlinelist')}}</h5>
            <DataTable :value="rfqs" :paginator="true" :rows="10"  v-model:selection="selectedProduct2" selectionMode="single" dataKey="id"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" responsiveLayout="scroll" :filters="filters" >


                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between" >
						<span class="p-input-icon-left"  >
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="$t('rfq.search')"   style="height: 2vw;margin: auto;"/>
                        </span>
					</div>
                </template>


                <Column field="rfqlinenum" :header="$t('rfq.rfqdetails.line')" sortable style="font-size:small;"/>
                <Column field="itemnum" :header="$t('rfq.rfqdetails.item')" sortable style="font-size:small;"/>
                <Column field="description" :header="$t('rfq.rfqdetails.description')" sortable style="font-size:small;"/>
                <Column field="orderqty" :header="$t('rfq.rfqdetails.qtyrequested')" sortable style="font-size:small;"/>
                <Column field="orderunit" :header="$t('rfq.rfqdetails.unit')" sortable style="font-size:small;"/>
                <Column field="quoteStartDate" :header="$t('rfq.rfqdetails.startdate')" sortable style="font-size:small;" />
                <Column field="quoteEndDate" :header="$t('rfq.rfqdetails.enddate')" sortable style="font-size:small;"/>
                <Column field="delivryDate" :header="$t('rfq.rfqdetails.deliverydate')" sortable style="font-size:small;"/>
                <Column field="quotationqty" :header="$t('rfq.rfqdetails.qty')" sortable style="font-size:small;"/>
                <Column field="unitcost" :header="$t('rfq.rfqdetails.unitcost')" sortable style="font-size:small;"/>
                <Column field="linecost" :header="$t('rfq.rfqdetails.linecost')" sortable style="font-size:small;" />

            </DataTable>
        </div>

      
	

      <Dialog  v-model:visible="rfqEdit" :style="{width: '50vw'}" :closable="false">
      <div class="row align-items-start">

         <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>{{$t('rfq.rfqdetails.unitcost')}}</strong></label>
                    <InputText id="unit" v-on:change="calcul" v-model="rfqline.unitcost"  style="width: 95%;" /> 
                    </div>
          

                 
                     <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>{{$t('rfq.rfqdetails.startdate')}}</strong></label>
                    <Calendar v-model="rfqline.quoteStartDate" :showIcon="true" style="width: 95%;" dateFormat="yy-mm-dd" />
                    </div>

        </div>
        <div class="row align-items-start">

              <div class="col-md-6">
                   <label style="width: 90%;margin-right:2vw;" ><strong>{{$t('rfq.rfqdetails.qty')}}</strong></label>
                    <InputText id="qty" v-on:change="calcul" v-model="rfqline.quotationqty"  style="width: 95%;" /> 
                    </div>
               <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>{{$t('rfq.rfqdetails.enddate')}}</strong></label>
                    <Calendar  v-model="rfqline.quoteEndDate" :showIcon="true" style="width: 95%;" dateFormat="yy-mm-dd"/>
                    </div>
                  
    </div>
    <div class="row align-items-start">
      
                    <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>{{$t('rfq.rfqdetails.linecost')}}</strong></label>
                    <InputText id="line" v-model="rfqline.linecost"  style="width: 95%;" disabled /> 
                    </div>
                    <div class="col-md-6">
                    <label style="width: 90%;margin-right:2vw;" ><strong>{{$t('rfq.rfqdetails.deliverydate')}}</strong></label>
                    <Calendar  v-model="rfqline.delivryDate" :showIcon="true" style="width: 95%;" dateFormat="yy-mm-dd" />
                    </div>
    </div>
                     <template #footer>
                        <Button :label="$t('rfq.rfqdetails.cancel')" icon="pi pi-times" @click="closeBasic" class="p-button-text"/>
                        <Button :label="$t('rfq.rfqdetails.save')" icon="pi pi-check" @click="saveEdit" autofocus >
                          <i class="pi pi-check" style="margin-right:0.5vw"></i>
                        <span> Save</span>
                        <span v-show="loadingbuttonsave" class="spinner-border spinner-border-sm" style="margin-left:0.5vw"></span></Button>
                    </template>
                </Dialog>


                <ConfirmDialog></ConfirmDialog>

              
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
import FileUpload from 'primevue/fileupload';
import ColumnGroup from 'primevue/columngroup';    
import Row from 'primevue/row'; 
import { useRoute } from 'vue-router';
import { FilterMatchMode } from 'primevue/api';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

import ProgressBar from 'primevue/progressbar';

export default {

        components: {
            FileUpload,
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
    ProgressBar,
    ConfirmDialog


  },
    data() {
        return {
            loadingbuttonsave:false,
            loadingfiles:false,
            loadingbutton:false,
            progressstatus:false,
            filters: {},
            idrfq:null,
            idline:null,
            rfqs:null,
            filedownload:{
                name:"",
                size:"",
                type:"",
                url:""

            },
            files: '',
           idpath: null,
           filedialog: false,
           progress:false,
           statusupload:false,
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
                quoteStartDate:null,
                quoteEndDate:null,
                delivryDate:null,
                rfq: {
                    id:''
                }
                },
        rfq: {
            id:'',
            rfqnum:'',
            siteid:'',
            description:'',
            status:'',
            requireddate:null,
            purchaseagent:'',
            statusofSend:'',
            dateEnvoie:null,
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
                quoteStartDate:null,
                quoteEndDate:null,
                delivryDate:null
                },
            user:{
                id:'',
                firstname:'',
                lastname:'',
                username:'',
                email:'',
                address:'',
                city:'',
                region:'',
                postalcode:'',
                country:'',
                phone:null,
                status:'',
                dateEstablished:null,
                dateCreation:null,
                companywebsite:'',
                revenu:'',
                taxregistrationnumber:null,
                taxclassificationcode:null,
                password:'',
                verifyAccountToken:'',
                resetPasswordToken:'',
                roles:{
                    id:'',
                    name:'',
                },
                vendorCommodities:{},
                enabled:true,
                admin:false,
                vendor:true
                },
        
   
        }
    }},

      vendorservice: null,

    created() {

        this.initFilters();
        this.vendorservice = new VendorService();

    
    
    },



    
     async mounted() {
        this.loadingfiles=true;
        let rf=  await this.rfqdetails();
     if (rf.statusofSend == true){
        this.addtomaximo();
    
     }
      this.rfqs=this.rfq.rfqline
      await this.listfiles();
      this.loadingfiles=false
      
  
    },

     computed: {

         isDisabled() {

      if ( this.rfq.statusofSend == true ) {

        return true
      }
      else
        return false

    },

     },
    methods: {
        previous(){
             this.$router.push('/rfq')
        },
        open(){
            this.filedialog=true;           
        },

         addtomaximo(){
       
            const myTextNode = document.createTextNode(this.rfq.dateEnvoie)
            const dateEnvoieelement = document.getElementById("submitToMaximo");
            dateEnvoieelement.appendChild(myTextNode)
            const dateEnvoie = document.getElementById("date");
            dateEnvoie.setAttribute('style','color:#4998DC;height: 2vw;margin-left: 0.5vw;');
            this.statusupload= true;

        },

        listfiles(){

              this.vendorservice. DownloadFile(this.idpath).then(data1 => this.filedownload = data1);

        },

        rfqdetails(){

         const route = useRoute();  
         this.idpath = route.params.idpath; 
        return this.vendorservice.findRfqDetails(this.idpath).then(data => this.rfq = data);  

         

        },

      

         deletefile(url){

                 this.$confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                 accept: async() => {
                    this.loadingfiles=true
                    let pos = url.lastIndexOf("/")
                     let idfile= url.substring(pos+1)
                    await this.vendorservice.DeleteFile(idfile)
                     this.filedownload={}
                     this.listfiles();
                    this.$toast.add({severity:'success', summary:'Success', detail:'File Deleted successfully', life: 3000});
                    this.loadingfiles=false
                },
                reject: () => {
                    this.$toast.add({severity:'error', summary:'Error', detail:'Error when Delete File', life: 3000});
                }
            });
              
              
        },


          async onUpload(event) {
           this.progressstatus=true;
             this.files=event.files;
             let formData = new FormData();
             for( var i = 0; i < this.files.length; i++ ){
                 let file = this.files[i];

                formData.append('file', file);
                }
            await this.vendorservice.UploadFile(formData,this.idpath)
            this.progressstatus=false;
            this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
            this.filedialog=false
            this.filedownload={}
            this.listfiles();
       
        },

        calcul(){
            let qty=document.getElementById("qty").value
            let unit =document.getElementById("unit").value
                let line =document.getElementById("line").value 
                line=qty*unit;
                this.rfqline.linecost=line;
        },

          async load(index) {
            this.loadingbutton=true
            this.loading[index] = true;
            setTimeout(() => this.loading[index] = false, 2000);
            this.statusupload= true;
            await this.vendorservice.addRfqToMaximo(this.rfq.id);
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Rfq submitted Successfuly to maximo', life: 3000 });
            this.idrfq = this.rfq.id
            this.rfq={}
            await this.vendorservice.findRfqDetails(this.idrfq).then(data => this.rfq = data,this.loadingbutton=false);
            this.addtomaximo()


                 
           
            
           
           
        },
       

           async onRowSelect(event) {
             if ( this.rfq.statusofSend == false)
             {
              this.idline = event.data.id
              this.vendorservice. findRfqLineById(this.idline).then(data1 => this.rfqline = data1);
              this.rfqEdit= true;
             }
        },
        onRowUnselect(event) {
          
        },

        closeBasic(){
            this.rfqEdit= false;
        },
        async saveEdit()
        {
            if (this.rfqline.quoteEndDate<this.rfqline.quoteStartDate)
            this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'End Date must be over Start date', life: 3000 });
            else{
            this.loadingbuttonsave=true
            await this.vendorservice.updateRfqLineById(this.rfqline);
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Line updated Successfuly', life: 3000 });
            this.rfqEdit= false;
            this.rfq={}
            await this.vendorservice.findRfqDetails(this.rfqline.rfq.id).then(data => this.rfq = data);
            this.rfqs=this.rfq.rfqline
            console.log( this.rfqs)
            this.loadingbuttonsave=false
            }

         
         

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
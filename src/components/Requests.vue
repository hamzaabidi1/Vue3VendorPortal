<template >
    <div >
        <div class="card" style="margin:2vw;" >
            <DataTable style="margin:1vw;" ref="dt" :value="vendors" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vendors" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">{{$t("requests.requestslist")}}</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="$t('requests.search')" />
                        </span>
					</div>
                </template> 
                <Column field="firstname" :header="$t('requests.name')" :sortable="true" style="max-width:8rem"></Column>
                <Column field="phone" :header="$t('requests.phone')" :sortable="true" style="max-width:8rem"></Column>
                <Column field="address" :header="$t('requests.address')" :sortable="true" style="max-width:10rem"></Column>
                <Column field="country" :header="$t('requests.country')" :sortable="true" style="max-width:8rem"></Column>
                <Column field="city" :header="$t('requests.city')" :sortable="true" style="max-width:8rem"></Column>
                <Column field="postalcode" :header="$t('requests.postalcode')" :sortable="true" style="max-width:8rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary  mr-2" @click="userdetails(slotProps.data)"  v-tooltip="'More Details'" />
                        <Button icon="pi pi-check" class="p-button-rounded p-button-success mr-2" @click="confirmProduct(slotProps.data)" v-tooltip="'Confirm Request'" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="confirmDeleteProduct(slotProps.data)" v-tooltip="'Delete Request'" />
                    </template>
                </Column>
            </DataTable>
        </div>


        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" :header="$t('requests.confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="user">Are you sure you want to delete <b>{{user.firstname}}</b>?</span>
            </div>
            <template #footer>
                <Button :label="$t('requests.no')" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button :label="$t('requests.yes')" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="confirmProductDialog" :style="{width: '450px'}" :header="$t('requests.confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="user">Are you sure you want to confirm <b>{{user.firstname}}</b>?</span>
            </div>
            <template #footer>
                <Button :label="$t('requests.no')" icon="pi pi-times" class="p-button-text" @click="confirmProductDialog = false"/>
                <Button :label="$t('requests.yes')" icon="pi pi-check" class="p-button-text" @click="confirmstatusProduct" />
            </template>
        </Dialog>


         <Dialog  :maximizable="true" v-model:visible="vendordetailsDialog" :dismissableMask="true" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '90vw' }" :header="$t('requests.details.requestsdetail')">





        <div class="flex">
          <div class="row align-items-start">
            <div class=col-md-6>
              <div class="card" style="margin:auto;width: 99%;height: 35vw;">
                <h5 class="text-center" style="margin-top:1vw;"><strong>{{$t('requests.details.generalinformation')}}</strong></h5>
                <div class="p-fluid">


                  <label for="firstname" style="width: 90%;margin-left:2vw;"><strong>{{$t('requests.details.name')}}</strong></label>
                  <InputText style="width: 90%;margin-left:2vw;" id="firstname" v-model="posts.firstname" disabled  />
                  <p style="width: 90%;margin-left:2vw;color:#3f2de1;">{{$t('requests.details.oldname')}}: {{old.firstname}}</p>
                 

                  <label for="lastname" style="width: 90%;margin-left:2vw;"><strong>{{$t('requests.details.subname')}}</strong></label>
                  <InputText style="width: 90%;margin-left:2vw;" id="lastname" v-model="posts.lastname" disabled  />
                  <p style="width: 90%;margin-left:2vw;color:#3f2de1;">{{$t('requests.details.oldsubname')}}: {{old.lastname}}</p>
                 


                  <label style="width: 90%;margin-left:2vw;" for="phone"><strong>{{$t('requests.details.phone')}}</strong></label>
                  <InputNumber style="width: 90%;margin-left:2vw;" id="phone" v-model="posts.phone" disabled  />
                  <p style="width: 90%;margin-left:2vw;color:#3f2de1;">{{$t('requests.details.oldphone')}}: {{old.phone}}</p>
                 

                </div>

              </div>
            </div>


            <div class=col-md-6>
              <div class="card" style="margin:auto;width: 99%;height: 35vw;">
                <h5 class="text-center" style="margin-top:1vw;"><strong>{{$t('requests.details.addressinformation')}}</strong></h5>
                <div class="p-fluid">
                  <div class=row>

                    <div class=col-md-6>
                      <div class="field">
                        <label for="country" style="width: 90%;margin-left:2vw;"><strong>{{$t('requests.details.country')}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="country" v-model="posts.country" disabled  />
                        <p style="width: 90%;margin-left:2vw;color: #3f2de1;">{{$t('requests.details.oldcountry')}}: {{old.country}}</p>
                       
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label for="region" style="width: 90%;margin-right:2vw;"><strong>{{$t('requests.details.state')}}</strong></label>
                        <InputText style="width: 90%;margin-right:2vw;" id="region" v-model="posts.region" disabled  />
                        <p style="width: 90%;color:#3f2de1;">{{$t('requests.details.oldstate')}}: {{old.region}}</p>
                      </div>
                    </div>
                  </div>
                  <div class=row>
                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="city"><strong>{{$t('requests.details.city')}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="city" v-model="posts.city"  disabled />
                        <p style="width: 90%;margin-left:2vw;color: #3f2de1;">{{$t('requests.details.oldcity')}}: {{old.city}}</p>
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-right:2vw;" for="postalcode"><strong>{{$t('requests.details.postalcode')}}</strong></label>
                        <InputText style="width: 90%;margin-right:2vw;" id="postalcode" v-model="posts.postalcode" disabled />  
                        <p style="width: 90%;color:#3f2de1;">{{$t('requests.details.oldpostalcode')}}: {{old.postalcode}}</p>
                      </div>
                    </div>
                  </div>
                  <div class=row>

                    <div class=col-md-12>
                      <label style="width: 90%;margin-left:2vw;" for="address"><strong>{{$t('requests.details.address')}}</strong></label>
                      <InputText style="width: 90%;margin-left:2vw;" id="address" v-model="posts.address" disabled />
                      <p style="width: 90%;margin-left:2vw;color:#3f2de1;">{{$t('requests.details.oldaddress')}}: {{old.address}}</p>
                      
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>


          <div class="row align-items-end ">

            <div class=col-md-6>
              <div class="card" style="margin:auto;margin-top: 1vw;width: 99%;height: 28vw;">
                <h5 class="text-center" style="margin-top:1vw;"><strong>{{$t('requests.details.fiscalinformation')}}</strong></h5>

                <div class="p-fluid">
                  <div class=row>
                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="taxregistrationnumber"><strong>{{$t('requests.details.registration')}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="taxregistrationnumber"
                          v-model="posts.taxregistrationnumber" disabled />
                          <p style="width: 90%;margin-left:2vw;color:#3f2de1;">{{$t('requests.details.oldregistration')}}: {{old.taxregistrationnumber}}</p>
                      
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-right:2vw;" for="taxclassificationcode"><strong>{{$t('requests.details.classification')}}</strong></label>
                        <InputText style="width: 90%;margin-right:2vw;" id="taxclassificationcode"
                          v-model="posts.taxclassificationcode" disabled  />
                          <p style="width: 90%;color:#3f2de1;">{{$t('requests.details.oldclassification')}}: {{old.taxclassificationcode}}</p>
                 
                      </div>
                    </div>
                  </div>

                  <div class=row>
                    <div class=col-md-6>

                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="revenu"><strong>{{$t('requests.details.revenu')}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="revenu"
                          v-model="posts.revenu" disabled   />
                          <p style="width: 90%;margin-left:2vw;color: #3f2de1;">{{$t('requests.details.oldrevenu')}}: {{old.revenu}}</p>
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-right:2vw;" for="dateEstablished"><strong>{{$t('requests.details.dateestablished')}}</strong></label>
                        <Calendar style="width: 90%;margin-right:2vw;" id="dateEstablished"
                          v-model="posts.dateEstablished" :showIcon="true" disabled  />
                          <p style="width: 90%;color: #3f2de1;">{{$t('requests.details.olddateestablished')}}: {{old.dateEstablished}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div class=col-md-6>
              <div class="card" style="margin:auto;margin-top: 1vw;width: 99%;height: 28vw;">
                <h5 class="text-center" style="margin-top:1vw;margin-bottom: 2vw;"><strong>{{$t('requests.details.legacyinformation')}}</strong></h5>
                <div class="p-fluid">
                  <div class=row>
                    <div class=col-md-12>
                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="companywebsite"><strong>{{$t('requests.details.website')}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="companywebsite"
                          v-model="posts.companywebsite" disabled />
                          <p style="width: 90%;color:#3f2de1;margin-bottom:2vw;margin-left: 2vw;">{{$t('requests.details.oldwebsite')}}: {{old.companywebsite}}</p>
                          
                    
                      </div>
                    </div>
                  </div>
               
                  <div class=row>
                    <div class=col-md-12 style="margin-bottom: 3vw;margin-top: 4vw;">
                
                   <Button :label="$t('requests.details.confirm')" icon="pi pi-check" class="p-button-success mr-4"  @click="confirmProduct(posts)" style="float:right;max-width: 9vw;" />
                        <Button :label="$t('requests.details.delete')" icon="pi pi-trash" class="p-button-danger mr-2"  @click="confirmDeleteProduct(posts)" style="float:right;max-width: 9vw;"/>
                
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        
      </Dialog>

	</div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import AdminService from '../services/AdminService';
import { Form, Field, ErrorMessage } from "vee-validate";
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from "primevue/inputtext"
import InputNumber from "primevue/inputnumber"
import Calendar from 'primevue/calendar';
import Password from 'primevue/password';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import Dialog from 'primevue/dialog';


export default {
     components: {
    InputNumber,
    Button,
    Card,
    InputText,
    Calendar,
    Password,
    Field,
    Toolbar,
    FileUpload,
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Rating,
    Textarea,
    Dropdown,
    RadioButton,
    Dialog
  },
    data() {
        return {
                posts: {
        firstname: '',
        lastname: '',
        phone: null,
        country: '',
        region: '',
        address: '',
        postalcode: '',
        city: '',
        taxregistrationnumber: '',
        taxclassificationcode: '',
        revenu: '',
        dateEstablished: '',
        companywebsite: '',
      },    
            old: {
        firstname: '',
        lastname: '',
        phone: null,
        country: '',
        region: '',
        address: '',
        postalcode: '',
        city: '',
        taxregistrationnumber: '',
        taxclassificationcode: '',
        revenu: '',
        dateEstablished: '',
        companywebsite: '',
      },  
            vendors: null,
            vendordetailsDialog: false,
            confirmProductDialog : false,
            deleteProductDialog: false,
            user: {},
            selectedProducts: null,
            filters: {},
            submitted: false,
        }
    },
    adminService: null,
    created() {
        this.adminService = new AdminService();
        this.initFilters();
    },
    mounted() {
        this.adminService.getRequests().then(data => this.vendors = data);
    },
    methods: {
      
      userdetails(user) {
      this.vendordetailsDialog = true;
      this.adminService.getDetailsRequest(user.email).then(data => this.posts = data);
      this.adminService.getDetailsProfile(user.email).then(data2 => this.old = data2);
      

    },
       
            saveProduct() {
            this.submitted = true;
            let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.user.status = this.user.status.value ? this.user.status.value: this.user.status;
            this.vendors[this.findIndexById(this.user.id)] = this.user;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Updated', life: 3000});
            this.adminService.updateStatus(this.user.id,this.user.status,monobjet.email);
            this.productDialog = false;
            if (this.user.status == "Confirmed"){
                this.adminService.addtoMaximo(this.user.id,monobjet.email);
            }
        },
       
        confirmDeleteProduct(user) {
            this.user = user;
            this.deleteProductDialog = true;
        },
         confirmProduct(user) {
            this.user = {...user};
            this.confirmProductDialog = true;
        },
            confirmstatusProduct() {
            let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.vendors = this.vendors.filter(val => val.id !== this.user.id);
            this.confirmProductDialog = false;
            this.adminService.updateProfile(this.user.email,monobjet.email);
            this.user = {};
            this.vendordetailsDialog=false;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Request Accepted', life: 3000});
           
        },
         deleteProduct() {
            this.vendors = this.vendors.filter(val => val.id !== this.user.id);
            this.deleteProductDialog = false;
            this.adminService.deleteRequest(this.user.email);
            this.user = {};
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Request Deleted', life: 3000});

        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.vendors.length; i++) {
                if (this.vendors[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        },
       
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            this.vendors = this.vendors.filter(val => !this.selectedProducts.includes(val));
            this.deleteProductsDialog = false;
            this.selectedProducts = null;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'users Deleted', life: 3000});
        },
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}
.product-badge {
    border-radius: 2px;
    padding: 0.25em 0.5rem;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: .3px;
}
.status-inprogress{
   background: #feedaf;
    color: #8a5340;
}
.status-confirmed{
    background: #c8e6c9;
    color: #256029;
}
.status-submitted {
    background: #ffcdd2;
    color: #c63737;
}
.status-draft {
    background: #99d9f7;
    color: #1a07cc;
}
.status-deleted {
    background: #f2d2f5;
    color: #9b0482;
}
.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>
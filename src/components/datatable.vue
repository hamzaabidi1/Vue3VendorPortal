<template>
    <div>
        <div class="card" style="margin:3vw;">
          

            <DataTable style="margin:1vw;" ref="dt" :value="vendors" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vendors" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Vendors List</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>
                <Column field="status" header="Status" :sortable="true" style="max-width:8rem">
                    <template #body="slotProps">
                        <span :class="'product-badge status-' + (slotProps.data.status ? slotProps.data.status.toLowerCase() : '')">{{slotProps.data.status}}</span>
                    </template>
                </Column>
                <Column field="firstname" header="Name" :sortable="true" style="max-width:8rem"></Column>
                <Column field="username" header="User Name" :sortable="true" style="max-width:8rem"></Column>
                <Column field="email" header="E-mail" :sortable="true" style="max-width:10rem"></Column>
                <Column field="phone" header="Phone" :sortable="true" style="max-width:8rem"></Column>
                <Column field="address" header="Address" :sortable="true" style="max-width:10rem"></Column>
                <Column :exportable="false" style="min-width:10rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editProduct(slotProps.data)" v-tooltip="'Edit Status'" />
                        <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary  mr-2" @click="userdetails(slotProps.data)"  v-tooltip="'More Details'" />
                        <Button icon="pi pi-book" class="p-button-rounded p-button-error" @click="historyProduct(slotProps.data)" v-tooltip="'History Status'" />

                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="user Details" :modal="true" class="p-fluid">
        
            <div class="field">
				<label for="status" class="mb-3">Status</label>
				<Dropdown id="status" v-model="user.status" :options="statuses" optionLabel="label" placeholder="Select a Status">
					<template #value="slotProps">
						<div v-if="slotProps.value && slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
						</div>
						<div v-else-if="slotProps.value && !slotProps.value.value">
							<span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
						</div>
						<span v-else>
							{{slotProps.placeholder}}
						</span>
					</template>
				</Dropdown>
			</div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="historyDialog" :style="{width: '450px'}" header="user History" :modal="true" class="p-fluid">
            <div>
        <DataTable :value="vendorHistory" responsiveLayout="scroll">
             <Column field="status" header="Status" :sortable="true" style="min-width:12rem">
                    <template #body="slotProps">
                        <span :class="'product-badge status-' + (slotProps.data.status ? slotProps.data.status.toLowerCase() : '')">{{slotProps.data.status}}</span>
                    </template>
                </Column>
            <Column field="statusDate" header="Status Date"></Column>
            <Column field="changedBy.username" header="Changed By"></Column>
        </DataTable>
    </div>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="user">Are you sure you want to delete <b>{{user.firstname}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="confirmProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="user">Are you sure you want to confirm <b>{{user.firstname}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="confirmProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="confirmstatusProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="user">Are you sure you want to delete the selected vendors?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
            </template>
        </Dialog>

          <Dialog :maximizable="true" v-model:visible="vendordetailsDialog" :dismissableMask="true" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '90vw' }" header="Vendor Informations">





        <div class="flex">
          <div class="row align-items-start" >
            <div class=col-md-6>
              <div class="card" style="margin:auto">
                <h5 class="text-center" ><strong>General Informations</strong></h5>
                <div class="p-fluid">


                  <label for="firstname" style="width: 90%;margin-left:2vw;"><strong>Name</strong></label>
                  <InputText style="width: 90%;margin-left:2vw;" id="firstname" v-model="posts.firstname" disabled  />
                 

                  <label for="lastname" style="width: 90%;margin-left:2vw;"><strong>Subname</strong></label>
                  <InputText style="width: 90%;margin-left:2vw;" id="lastname" v-model="posts.lastname" disabled  />
                 


                  <label style="width: 90%;margin-left:2vw;" for="phone"><strong>Phone</strong></label>
                  <InputNumber style="width: 90%;margin-left:2vw;margin-bottom:1vw;" id="phone" v-model="posts.phone" disabled  />
                 

                </div>

              </div>
            </div>


            <div class=col-md-6>
              <div class="card" style="margin:auto">
                <h5 class="text-center" ><strong>Address Informations</strong></h5>
                <div class="p-fluid">
                  <div class=row>

                    <div class=col-md-6>
                      <div class="field">
                        <label for="country" style="width: 90%;margin-left:2vw;"><strong>Country</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="country" v-model="posts.country" disabled  />
                       
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label for="region" style="width: 90%;margin-right:2vw;"><strong>State / Region</strong></label>
                        <InputText style="width: 90%;margin-right:2vw;" id="region" v-model="posts.region" disabled  />
                      </div>
                    </div>
                  </div>
                  <div class=row>
                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="city"><strong>City</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="city" v-model="posts.city"  disabled />
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-right:2vw;" for="postalcode"><strong>Postal Code</strong></label>
                        <InputText style="width: 90%;margin-right:2vw;" id="postalcode" v-model="posts.postalcode" disabled />  
                      </div>
                    </div>
                  </div>
                  <div class=row>

                    <div class=col-md-12>
                      <label style="width: 90%;margin-left:2vw;" for="address"><strong>Address</strong></label>
                      <InputText style="width: 90%;margin-left:2vw;margin-bottom:1vw" id="address" v-model="posts.address" disabled />
                      
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>


          <div class="row align-items-end ">

            <div class=col-md-6>
              <div class="card" style="margin:auto;margin-top: 1vw;">
                <h5 class="text-center" style="margin-top:1vw;"><strong>Fiscal Informations</strong></h5>

                <div class="p-fluid">
                  <div class=row>
                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="taxregistrationnumber"><strong>Tax Registration Number</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="taxregistrationnumber"
                          v-model="posts.taxregistrationnumber" disabled />
                      
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-right:2vw;" for="taxclassificationcode"><strong>Tax ClassificationCode</strong></label>
                        <InputText style="width: 90%;margin-right:2vw;" id="taxclassificationcode"
                          v-model="posts.taxclassificationcode" disabled  />
                 
                      </div>
                    </div>
                  </div>

                  <div class=row>
                    <div class=col-md-6>

                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="revenu"><strong>Revenu</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;margin-bottom:3vw;" id="revenu"
                          v-model="posts.revenu" disabled   />
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-right:2vw;" for="dateEstablished"><strong>Date Established</strong></label>
                        <Calendar style="width: 90%;margin-right:2vw;margin-bottom:3vw;" id="dateEstablished"
                          v-model="posts.dateEstablished" :showIcon="true" disabled  />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div class=col-md-6>
              <div class="card" style="margin:auto;margin-top: 1vw;" >
                <h5 class="text-center" style="margin-top:1vw;"><strong>Legacy Informations</strong></h5>
                <div class="p-fluid">
                  <div class=row>
                    <div class=col-md-12>
                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="companywebsite"><strong>Company Web Site</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;margin-bottom:1vw;" id="companywebsite"
                          v-model="posts.companywebsite" disabled />
                    
                      </div>
                    </div>
                  </div>
                  <div class=row>
                    <div class=col-md-1>
                      
                    </div>
                    <div class=col-md-4>
                    
                    </div>
                  </div>
                  <div class=row>
                    <div class=col-md-12 style="margin-bottom: 3vw;margin-top: 2vw;">
                
                   <Button label="Confirm" icon="pi pi-check" class="p-button-success mr-4"  @click="confirmProduct(posts)" style="float:right;max-width: 9vw;" />
                        <Button label="Delete" icon="pi pi-trash" class="p-button-danger mr-2"  @click="confirmDeleteProduct(posts)" style="float:right;max-width: 9vw;"/>
                
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
            vendors: null,
            vendorHistory: null,
            productDialog: false,
            historyDialog: false,
            confirmProductDialog : false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            vendordetailsDialog: false,
            user: {},
            selectedProducts: null,
            filters: {},
            submitted: false,
            statuses: [
				{label: 'DRAFT', value: 'Draft'},
				{label: 'SUBMITTED', value: 'Submitted'},
				{label: 'INPROGRESS', value: 'InProgress'},
                {label: 'CONFIRMED', value: 'Confirmed'}
            ]
        }
    },
    adminService: null,
    created() {
        this.adminService = new AdminService();
        this.initFilters();
    },
    mounted() {
        this.adminService.getProducts().then(data => this.vendors = data);
    },
    methods: {
        userdetails(user) {
      this.vendordetailsDialog = true;
      this.adminService.getDetailsProfile(user.email).then(data => this.posts = data);

    },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
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
            //this.user = {};
        },
        editProduct(user) {
            this.user = {...user};
            this.productDialog = true;
        },
         historyProduct(user) {
             this.user = user;
            this.historyDialog = true;
            this.adminService.getHistory(this.user.email).then(data => this.vendorHistory = data);
        },
        confirmDeleteProduct(user) {
            this.user = user;
            this.deleteProductDialog = true;
            
        },
         confirmProduct(user) {
            this.user = {...user};
            this.confirmProductDialog = true;
        },
            async confirmstatusProduct() {
            let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.user.status = 'Confirmed'
            this.vendors [this.findIndexById(this.user.id)] = this.user;
            this.confirmProductDialog = false;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Confirmed', life: 3000});
            await this.adminService.confirmuser(this.user.id,monobjet.email);
            this.adminService.addtoMaximo(this.user.id,monobjet.email,monobjet.encode);
        },
         deleteProduct() {
            let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.vendors = this.vendors.filter(val => val.id !== this.user.id);
            this.deleteProductDialog = false;
            this.adminService.deletevendor(this.user.id,monobjet.email);
            this.user = {};
            this.vendordetailsDialog= false;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Deleted', life: 3000});
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
        exportCSV() {
            this.$refs.dt.exportCSV();
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
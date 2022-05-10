<template>
    <div>
        <div class="card" style="margin-top:3vw;">
            <DataTable ref="dt" :value="vendors" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vendors" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Requests Update Profile</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>

                <Column style="width: 3rem" :exportable="false"></Column>
                <Column field="firstname" header="vendor Name" :sortable="true" style="min-width:12rem"></Column>
                <Column field="lastname" header="vendor Subname" :sortable="true" style="min-width:16rem"></Column>
                <Column field="phone" header="phone" :sortable="true" style="min-width:12rem"></Column>
                <Column field="address" header="address" :sortable="true" style="min-width:12rem"></Column>
                <Column field="country" header="country" :sortable="true" style="min-width:10rem"></Column>
                <Column field="city" header="city" :sortable="true" style="min-width:10rem"></Column>
                <Column field="region" header="region" :sortable="true" style="min-width:10rem"></Column>
                <Column field="postalcode" header="postalcode" :sortable="true" style="min-width:10rem"></Column>
                <Column field="companywebsite" header="companywebsite" :sortable="true" style="min-width:10rem"></Column>
                <Column field="revenu" header="revenu" :sortable="true" style="min-width:10rem"></Column>
                <Column field="taxregistrationnumber" header="taxregistrationnumber" :sortable="true" style="min-width:10rem"></Column>
                <Column field="taxclassificationcode" header="taxclassificationcode" :sortable="true" style="min-width:10rem"></Column>
                <Column field="dateEstablished" header="dateEstablished" :sortable="true" style="min-width:10rem"></Column>
                <Column :exportable="false" style="min-width:16rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-check" class="p-button-rounded p-button-success mr-2" @click="confirmProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>


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
            vendors: null,
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
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Deleted', life: 3000});
        },
         deleteProduct() {
            this.vendors = this.vendors.filter(val => val.id !== this.user.id);
            this.deleteProductDialog = false;
            this.adminService.deleteRequest(this.user.email);
            this.user = {};
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
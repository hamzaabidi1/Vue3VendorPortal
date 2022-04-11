<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="vendors" v-model:selection="selectedProducts" dataKey="id" 
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

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="firstname" header="vendor Name" :sortable="true" style="min-width:12rem"></Column>
                <Column field="lastname" header="vendor Subname" :sortable="true" style="min-width:16rem"></Column>
                <Column field="username" header="username" :sortable="true" style="min-width:16rem"></Column>
                <Column field="email" header="email" :sortable="true" style="min-width:10rem"></Column>
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
                <Column field="status" header="Status" :sortable="true" style="min-width:12rem">
                    <template #body="slotProps">
                        <span :class="'product-badge status-' + (slotProps.data.status ? slotProps.data.status.toLowerCase() : '')">{{slotProps.data.status}}</span>
                    </template>
                </Column>
                <Column :exportable="false" style="min-width:16rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-check" class="p-button-rounded p-button-success mr-2" @click="confirmProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="confirmDeleteProduct(slotProps.data)" />
                        <Button icon="pi pi-book" class="p-button-rounded p-button-error" @click="historyProduct(slotProps.data)" />

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
            <Column field="status" header="Status"></Column>
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
	</div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import ProductService from '../services/ProductService';
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
import axios from 'axios'


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
            vendorHistory: null,
            productDialog: false,
            historyDialog: false,
            confirmProductDialog : false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
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
    productService: null,
    created() {
        this.productService = new ProductService();
        this.initFilters();
    },
    mounted() {
        this.productService.getProducts().then(data => this.vendors = data);
    },
    methods: {
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
            historyDialog = false;
        },
        saveProduct() {
            this.submitted = true;
            let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.user.status = this.user.status.value ? this.user.status.value: this.user.status;
            this.vendors[this.findIndexById(this.user.id)] = this.user;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Updated', life: 3000});
            this.productService.updateStatus(this.user.id,this.user.status,monobjet.email);
            this.productDialog = false;
            this.user = {};
        },
        editProduct(user) {
            this.user = {...user};
            this.productDialog = true;
        },
         historyProduct(user) {
             this.user = user;
            this.historyDialog = true;
            this.productService.getHistory(this.user.email).then(data => this.vendorHistory = data);
        },
        confirmDeleteProduct(user) {
            this.user = user;
            this.deleteProductDialog = true;
        },
         confirmProduct(user) {
            this.user = user;
            this.confirmProductDialog = true;
        },
        confirmstatusProduct() {
            let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.vendors = this.vendors.filter(val => val.id !== this.user.id);
            this.confirmProductDialog = false;
            this.productService.confirmuser(this.user.id,monobjet.email);
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Confirmed', life: 3000});
        },
         deleteProduct() {
            let jsonobject= localStorage.user;
            let monobjet = JSON.parse(jsonobject)
            this.vendors = this.vendors.filter(val => val.id !== this.user.id);
            this.deleteProductDialog = false;
            this.productService.deletevendor(this.user.id,monobjet.email);
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
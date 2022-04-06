<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
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
                <Column :exportable="false" style="min-width:12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-check" class="p-button-rounded p-button-success mr-2" @click="confirmProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-error" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="user Details" :modal="true" class="p-fluid">
            <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="user.image" class="product-image" v-if="user.image" />
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="user.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
                <small class="p-error" v-if="submitted && !user.name">Name is required.</small>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Textarea id="description" v-model="user.description" required="true" rows="3" cols="20" />
            </div>

            <div class="field">
				<label for="inventoryStatus" class="mb-3">Inventory Status</label>
				<Dropdown id="inventoryStatus" v-model="user.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
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

            <div class="field">
                <label class="mb-3">Category</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category1" name="category" value="Accessories" v-model="user.category" />
                        <label for="category1">Accessories</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category2" name="category" value="Clothing" v-model="user.category" />
                        <label for="category2">Clothing</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category3" name="category" value="Electronics" v-model="user.category" />
                        <label for="category3">Electronics</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category4" name="category" value="Fitness" v-model="user.category" />
                        <label for="category4">Fitness</label>
                    </div>
                </div>
            </div>

            <div class="formgrid grid">
                <div class="field col">
                    <label for="price">Price</label>
                    <InputNumber id="price" v-model="user.price" mode="currency" currency="USD" locale="en-US" />
                </div>
                <div class="field col">
                    <label for="quantity">Quantity</label>
                    <InputNumber id="quantity" v-model="user.quantity" integeronly />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="user">Are you sure you want to delete <b>{{user.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
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
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            user: {},
            selectedProducts: null,
            filters: {},
            submitted: false,
            statuses: [
				{label: 'INSTOCK', value: 'instock'},
				{label: 'LOWSTOCK', value: 'lowstock'},
				{label: 'OUTOFSTOCK', value: 'outofstock'}
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
        formatCurrency(value) {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
        },
        openNew() {
            this.user = {};
            this.submitted = false;
            this.productDialog = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        saveProduct() {
            this.submitted = true;

			if (this.user.name.trim()) {
                if (this.user.id) {
                    this.user.inventoryStatus = this.user.inventoryStatus.value ? this.user.inventoryStatus.value: this.user.inventoryStatus;
                    this.vendors[this.findIndexById(this.user.id)] = this.user;
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Updated', life: 3000});
                }
                else {
                    this.user.id = this.createId();
                    this.user.code = this.createId();
                    this.user.image = 'product-placeholder.svg';
                    this.user.inventoryStatus = this.user.inventoryStatus ? this.user.inventoryStatus.value : 'INSTOCK';
                    this.vendors.push(this.vendors);
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Created', life: 3000});
                }

                this.productDialog = false;
                this.user = {};
            }
        },
        editProduct(user) {
            this.user = {...user};
            this.productDialog = true;
        },
        confirmDeleteProduct(user) {
            this.user = user;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            this.vendors = this.vendors.filter(val => val.id !== this.user.id);
            this.deleteProductDialog = false;
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
        createId() {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
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
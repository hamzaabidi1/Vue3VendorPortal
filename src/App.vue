<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div v-if="currentUser">
       <Sidebar v-model:visible="visibleLeft" class="bg-dark">
          <tr> <a  v-if="showAdminBoard" href="/config" ><i class="pi pi-cog" style="float:left;font-size: 1.5rem"></i></a></tr>
           <tr><img src="./assets/logo-home.png" v-tooltip="'Vendor Portal'" style="margin:auto;margin-left:8vw;margin-bottom:1vw;"
            width="60" height="60" class="sponsor_button"></tr>

         
         
       
          <li v-if="showAdminBoard">
            <router-link to="/admin" v-tooltip="'click to show table of list of vendor'" @click.prevent="showvendorlist"
              class="navbar-brand" style="color:white;">{{$t("app.vendorlist")}}</router-link>
          </li>

           <li v-if="showAdminBoard" >
            <router-link to="" @click.prevent="showrequestsUpdate"
              v-tooltip="'click to show list of requests to change information account'" class="navbar-brand"
              style="color:white;">{{$t("app.vendorrequest")}}</router-link>
          </li>
      <!--    <li v-if="showFournisseurBoard && currentUser.status == 'Confirmed'">
            <router-link to="/fournisseur" v-tooltip="'click to show po list,rfq list and invoice list'"
              @click.prevent="showvendorboard" class="navbar-brand" style="color:white;">RFQ,PO,INVOICE</router-link>
          </li>

          -->
          <li v-if="showFournisseurBoard && currentUser.status == 'Confirmed'">
            <router-link to="/rfq" v-tooltip="'click to show rfq list '"
              @click.prevent="showvendorboard" class="navbar-brand" style="color:white;">{{$t("app.rfq")}}</router-link>
          </li>
          <li v-if="showFournisseurBoard && currentUser.status == 'Confirmed'">
            <router-link to="/po" v-tooltip="'click to show po list '"
              @click.prevent="showvendorboard" class="navbar-brand" style="color:white;">{{$t("app.po")}}</router-link>
          </li>
          <li v-if="showFournisseurBoard && currentUser.status == 'Confirmed'">
            <router-link to="/invoice" v-tooltip="'click to show Invoice list '"
              @click.prevent="showvendorboard" class="navbar-brand" style="color:white;">{{$t("app.invoice")}}</router-link>
          </li>
          <li v-if="showFournisseurBoard && currentUser.status == 'Confirmed'">
            <router-link to="" @click.prevent="requestUpdate" v-tooltip="'click to update Information of account'"
              class="navbar-brand" style="color:white;">{{$t("app.updateinfo")}}</router-link>
          </li>

          <li v-if="showFournisseurBoard && currentUser.status == 'Confirmed'">
            <router-link to="" @click.prevent="changepassword" v-tooltip="'click to change password'"
              class="navbar-brand" style="color:white;">{{$t("app.updatepass")}}</router-link>
          </li>
        
          
        

         

        <li>
          <LocaleSwitcher style="width:3vw;background-color:grey ;" />
          </li>
         
        </Sidebar>
        <i class="pi pi-bars navbar-brand" @click="visibleLeft = true"></i>

      </div>
      <li class="nav-item" v-if="!currentUser">
        <router-link to="" @click.prevent="showhome" class="navbar-brand" v-tooltip="'home'">
          <font-awesome-icon icon="home" />{{$t("app.portal")}}
        </router-link>
      </li>
        <li class="nav-item" v-if="currentUser && currentUser.roles == 'ROLE_FOURNISSEUR'">
        <router-link to="" @click.prevent="showhome" class="navbar-brand" v-tooltip="'home'">
          <font-awesome-icon icon="home" />{{$t("app.portal")}}
        </router-link>
      </li>
       <li class="nav-item" v-if="currentUser && currentUser.roles == 'ROLE_ADMIN'">
        <router-link to="" @click.prevent="showhome" class="navbar-brand" v-tooltip="'home'">
          <font-awesome-icon icon="home" />{{$t("app.portal")}}
        </router-link>
      </li>

   <Dialog v-model:visible="changepasswordDialog" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '25vw'}">
    <template #header>
		<i class="pi pi-info-circle" v-tooltip="'password must be longer than 6 characters'"></i>
	</template>
         <div class="col-md-12" style="margin:auto">
    
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleConfirmPassword" :validation-schema="schema">
       <div class="form-group">
          <label for="password1"><strong>{{$t("app.password")}}</strong></label>
          <Field name="password1" type="password" class="form-control" v-model="password1" v-on:change="verif" />
           <div id="container" ></div>
          <ErrorMessage name="password1" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password2"><strong>{{$t("app.confirmpassword")}}</strong></label>
          <Field name="password2" type="password" class="form-control" v-model="password2"/>
          <ErrorMessage name="password2" class="error-feedback" />
        </div>
        <div class="form-group" style="margin-top:3vw">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>{{$t("app.confirm")}}</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    
  </div>
                  
                </Dialog>






      <Dialog :maximizable="true" v-model:visible="requestDialog" :dismissableMask="true" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '90vw' }" :header="$t('app.updateinfodialog')">
        <div class="flex">
          <div class="row align-items-start">
            <div class=col-md-6>
              <div class="card" style="margin:auto;width: 99%;height: 28vw;">
                <h5 class="text-center" style="margin-top:1vw;"><strong>{{$t("app.generalinformation")}}</strong></h5>
                <div class="p-fluid">


                  <label for="firstname" style="width: 90%;margin-left:2vw;"><strong>{{$t("app.name")}}</strong></label>
                  <InputText style="width: 90%;margin-left:2vw;" id="firstname" v-model="posts.firstname"
                    :class="{ 'p-invalid': validationErrors.firstname && submitted }" />
                  <small style="width: 90%;margin-left:2vw;" v-show="validationErrors.firstname && submitted"
                    class="p-error">Vendor Name is required.</small>


                  <label for="lastname" style="width: 90%;margin-left:2vw;"><strong>{{$t("app.subname")}}</strong></label>
                  <InputText style="width: 90%;margin-left:2vw;" id="lastname" v-model="posts.lastname"
                    :class="{ 'p-invalid': validationErrors.lastname && submitted }" />
                  <small style="width: 90%;margin-left:2vw;" v-show="validationErrors.lastname && submitted"
                    class="p-error">Vendor Subname is required.</small>


                  <label style="width: 90%;margin-left:2vw;" for="phone"><strong>{{$t("app.phone")}}</strong></label>
                  <InputNumber style="width: 90%;margin-left:2vw;margin-bottom:3vw;" id="phone" v-model="posts.phone"
                    :class="{ 'p-invalid': validationErrors.phone && submitted }" />
                  <small style="width: 90%;margin-left:2vw"
                    v-show="validationErrors.phone && submitted" class="p-error">Phone Number is required.</small>

                </div>

              </div>
            </div>


            <div class=col-md-6>
              <div class="card" style="margin:auto;width: 99%;height: 28vw;">
                <h5 class="text-center" style="margin-top:1vw;"><strong>{{$t("app.addressinformation")}}</strong></h5>
                <div class="p-fluid">
                  <div class=row>

                    <div class=col-md-6>
                      <div class="field">
                        <label for="country" style="width: 90%;margin-left:2vw;"><strong>{{$t("app.country")}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="country" v-model="posts.country"
                          :class="{ 'p-invalid': validationErrors.country && submitted }" />
                        <small style="width: 90%;margin-left:2vw;" v-show="validationErrors.country && submitted"
                          class="p-error">Country is required.</small>
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label for="region" style="width: 90%;margin-right:2vw;"><strong>{{$t("app.state")}}</strong></label>
                        <InputText style="width: 90%;margin-right:2vw;" id="region" v-model="posts.region"
                          :class="{ 'p-invalid': validationErrors.region && submitted }" />
                        <small style="width: 90%;margin-right:2vw;" v-show="validationErrors.region && submitted"
                          class="p-error">region is required.</small>
                      </div>
                    </div>
                  </div>
                  <div class=row>
                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="city"><strong>{{$t("app.city")}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="city" v-model="posts.city"
                          :class="{ 'p-invalid': validationErrors.city && submitted }" />
                        <small style="width: 90%;margin-left:2vw;" v-show="validationErrors.city && submitted"
                          class="p-error">City is required.</small>
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-right:2vw;" for="postalcode"><strong>{{$t("app.postalcode")}}</strong></label>
                        <InputText style="width: 90%;margin-right:2vw;" id="postalcode" v-model="posts.postalcode"
                          :class="{ 'p-invalid': validationErrors.postalcode && submitted }" />
                        <small style="width: 90%;margin-right:2vw;" v-show="validationErrors.postalcode && submitted"
                          class="p-error">Postal Code is required.</small>
                      </div>
                    </div>
                  </div>
                  <div class=row>

                    <div class=col-md-12>
                      <label style="width: 90%;margin-left:2vw;" for="address"><strong>{{$t("app.address")}}</strong></label>
                      <InputText style="width: 90%;margin-left:2vw;margin-bottom:3vw" id="address"
                        v-model="posts.address" :class="{ 'p-invalid': validationErrors.address && submitted }" />
                      <small style="width: 90%;margin-left:2vw"
                        v-show="validationErrors.address && submitted" class="p-error">address is required.</small>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>


          <div class="row align-items-end " >

            <div class=col-md-6>
              <div class="card" style="margin:auto;margin-top: 1vw;width: 99%;height: 23vw;">
                <h5 class="text-center" style="margin-top:1vw;"><strong>{{$t("app.fiscalinformation")}}</strong></h5>

                <div class="p-fluid">
                  <div class=row>
                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="taxregistrationnumber"><strong>{{$t("app.registration")}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;" id="taxregistrationnumber"
                          v-model="posts.taxregistrationnumber"
                          :class="{ 'p-invalid': validationErrors.taxregistrationnumber && submitted }" />
                        <small style="width: 90%;margin-left:2vw;"
                          v-show="validationErrors.taxregistrationnumber && submitted" class="p-error">tax registration
                          number is required.</small>
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-right:2vw;" for="taxclassificationcode"><strong>{{$t("app.classification")}}</strong></label>
                        <InputText style="width: 90%;margin-right:2vw;" id="taxclassificationcode"
                          v-model="posts.taxclassificationcode"
                          :class="{ 'p-invalid': validationErrors.taxclassificationcode && submitted }" />
                        <small style="width: 90%;margin-right:2vw;"
                          v-show="validationErrors.taxclassificationcode && submitted" class="p-error">tax
                          classification code is required.</small>
                      </div>
                    </div>
                  </div>

                  <div class=row >
                    <div class=col-md-6>

                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="revenu"><strong>{{$t("app.revenu")}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;margin-bottom:3vw;" id="revenu"
                          v-model="posts.revenu" :class="{ 'p-invalid': validationErrors.revenu && submitted }" />
                        <small style="width: 90%;margin-left:2vw;margin-bottom:3vw;"
                          v-show="validationErrors.revenu && submitted" class="p-error">Revenu is required.</small>
                      </div>
                    </div>

                    <div class=col-md-6>
                      <div class="field">
                        <label style="width: 90%;margin-right:2vw;" for="dateEstablished"><strong>{{$t("app.dateestablished")}}</strong></label>
                        <Calendar style="width: 90%;margin-right:2vw;margin-bottom:3vw;" id="dateEstablished"
                          v-model="posts.dateEstablished" :showIcon="true" />
                        <small style="width: 90%;margin-right:2vw;margin-bottom:3vw;"
                          v-show="validationErrors.dateEstablished && submitted" class="p-error">dateEstablished is
                          required.</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div class=col-md-6>
              <div class="card" style="margin:auto;margin-top: 1vw;width: 99%;height: 23vw;">
                <h5 class="text-center" style="margin-top:1vw;"><strong>{{$t("app.legacyinformation")}}</strong></h5>
                <div class="p-fluid">
                  <div class=row>
                    <div class=col-md-12>
                      <div class="field">
                        <label style="width: 90%;margin-left:2vw;" for="companywebsite"><strong>{{$t("app.website")}}</strong></label>
                        <InputText style="width: 90%;margin-left:2vw;margin-bottom:1vw;" id="companywebsite"
                          v-model="posts.companywebsite"
                          :class="{ 'p-invalid': validationErrors.companywebsite && submitted }" />
                        <small style="width: 90%;margin-left:2vw;margin-bottom:1vw;"
                          v-show="validationErrors.companywebsite && submitted" class="p-error">company web site is
                          required.</small>
                      </div>
                    </div>
                  </div>
                  <div class=row>
                    <div class=col-md-3>
                      <div class="field-checkbox" style="margin-left:2vw;">
                        <Checkbox style="width: 100%;margin-top: 1vw;" id="accept" :binary="true" v-model="accept"/>
                      </div>
                    </div>
                    <div class=col-md-9>
                      <label style="width: 100% ; margin-left:-6vw;" for="accept">{{$t("app.read")}}</label>
                      
                    </div>
                  </div>
                  <div class=row style="margin-top:1vw">
                    <div class=col-md-12>
                      <p style="color:#6495ED;width: 80%;float:left;margin-bottom:2vw;margin-left: 2vw;" @click="terms()"> {{$t("app.terms")}}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Button :disabled='isDisabled' :label="$t('app.confirm')" @click="confirm()"
          style="width: 20%;float:right;margin-right:2vw;margin-bottom:1vw;margin-top: 2vw;" />
      </Dialog>

      <Dialog header="Terms" v-model:visible="termsDialog" :style="{ width: '50vw' }">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</p>

        <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
          qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
          quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
          vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>

        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
          rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
          dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
          sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.</p>
        <template #footer>
          <Button label="Confirm" icon="pi pi-check" @click="closeBasic2" autofocus style="margin-top:1vw" />
        </template>
      </Dialog>

      <div class="navbar-nav mr-auto">
        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <font-awesome-icon icon="home" />{{$t("app.home")}}
            </router-link>
          </li>
        </div>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/verifyemail" class="nav-link">
            <font-awesome-icon icon="user-plus" /> {{$t("app.signup")}}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> {{$t("app.signin")}}
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li v-if="currentUser.roles == 'ROLE_ADMIN'" class="nav-item">
          <i class="pi pi-bell mr-2 p-text-secondary" style="font-size: 1.5rem;margin-top:1vw;"
            v-tooltip="'click to show list of request to update informations account'" v-badge.danger="number"
            @click="getAllrequest()"></i>
        </li>

        <li v-if="currentUser.roles == 'ROLE_FOURNISSEUR'" style="margin:auto;"
          :class="'status-' + (statusVendor ? statusVendor.toLowerCase() : '')">
          {{ statusVendor }}
        </li>

        <li class="nav-item">
          <router-link @click.prevent="droitModification" to="" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
          <Toast />
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> {{$t("app.logout")}}
          </a>
        </li>
      </div>
    </nav>
    <router-view />
  </div>

  <Button icon="pi pi-check" @click="chatdialog('bottomright')" class="p-button-rounded  p-button-outlined"
    style="float:bottom;margin-right:1vw;margin-left:96vw;position:fixed;bottom:5vw" v-tooltip="'VendorPortal Assistant'">
    <img alt="logo" src="./assets/chat.png" style="width: 1.5rem" />
  </Button>


  <Dialog  
    style="bottom:50px;margin-right:5vw; position:fixed;max-height: 35vw;min-height: 20vw;opacity: 1;border-radius: 20%;background: #6495ED;" :draggable="false"
    v-model:visible="displayResponsive" :position="position" :breakpoints="{ '960px': '75vw', '640px': '90vw'}" :style="{width: '20vw'}">

<template #header :style="{color:black }" style="background-color: black; color: aqua;">
		<img alt="logo" src="./assets/assistant-intelligent.png" style="width: 2rem;height: 2rem;" />
    <span style="font-size: small;"><b>Vendor Portal Assistant</b></span>
	</template>

	<div id="container" style="min-height: 15vw;min-width: 15vw" >
    </div>

	<template #footer  >
    <div class="row" style="border-top:3px ridge" >
    <div style="max-width: 70%"   >
     <Form @submit="chattextfn"  >                
     <InputText class="p-inputtext-sm" placeholder="message ..."  style="margin-top: 1.5vw;max-width: 100%;" id="chattext" v-model="chattext" />
    </Form>
    </div>
    <div style="max-width: 15%;margin-left:4%"  >
      <i class="pi pi-send" style="font-size: 1.5rem;margin-right:1%;margin-top: 2vw;max-width: 100%;"  @click="chattextfn" v-tooltip="'send message'"></i>
    </div>
    <div style="max-width: 15%;margin-left:2%;" >
    
		 <Button icon="pi pi-bell" @click="chat" class="p-button-rounded p-button-secondary p-button-outlined voice"  v-tooltip="'vocal message'"
      style="margin-top: 1.5vw;border: none;max-width: 100%;  float: right; ">
      <img alt="logo" src="./assets/record.png" style="width:1.8rem;" />
    </Button>   
    </div>
    </div>
	</template>


  </Dialog>



<footer style="position:fixed;bottom:0;width:100%" class="bg-light text-center text-lg-start">
  <!-- Copyright -->
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    © 2022 Copyright: All rights reserved.
    <a class="text-Blue" href="https://www.smartech-tn.com/">smartech-tn.com</a>
  </div>
  <!-- Copyright -->
</footer>


</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import 'primeicons/primeicons.css';
import Badge from 'primevue/badge';
import AdminService from './services/AdminService';
import UserService from './services/user.service';
import VendorService from './services/VendorService';
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext"
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Divider from 'primevue/divider';
import LocaleSwitcher from "./components/LocaleSwitcher.vue";
import * as yup from "yup";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    Badge,
    Dialog,
    InputText,
    Button,
    Checkbox,
    InputNumber,
    Calendar,
    Divider,
    LocaleSwitcher

  },

  data() {
     const schema = yup.object().shape({
      password2: yup.string().required("confirmation of password is required!"),
      password1: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
       message: "",
      schema,
      statusVendor:'',
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
      chattext:'',
      accept: null,
      number: null,
      visibleLeft: false,
      visibleRight: false,
      requestDialog: false,
      changepasswordDialog: false,
      termsDialog: false,
      vendorDetails: null,
      state: null,
      submitted: false,
      validationErrors: {},
      position: 'bottomright',
      displayResponsive: false,
      val: 0,
    }
  },
  UserService: null,
  AdminService: null,
  VendorService: null,

  created() {
    this.UserService= new UserService();
    this.AdminService = new AdminService();
    this.VendorService = new VendorService();
  },
  
   mounted() {
    if(localStorage.user){
      let jsonobject = localStorage.user
      let monobjet = JSON.parse(jsonobject)
      this.$i18n.locale=monobjet.langue;
      if(monobjet.roles == 'ROLE_ADMIN'){
      this.AdminService.getNumberOfRequest().then(data => this.number = data);
      }
      if(monobjet.roles == 'ROLE_FOURNISSEUR')
      this.UserService.statusVendor(monobjet.email).then(data => this.statusVendor = data);
      }
      
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showFournisseurBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_FOURNISSEUR');
      }

      return false;
    },
    isDisabled() {

      if (this.accept == true) {

        return false
      }
      else
        return true

    }

  },

  methods: {

        verif(){
       console.log("***")
      console.log(this.password1.length)
if (this.password1.length < 6 )
{

const myTextNode = document.createTextNode("Password Must be over 6 caracter")
const verification = document.createElement("p");
verification.setAttribute(
        'style',
        'color: red',
      );
      verification.appendChild(myTextNode)
      var element = document.getElementById("container");
      element.appendChild(verification);

}
else
{
  const elementrem = document.getElementById("container");
  elementrem.remove();

}

    },
    // chat box methods...

    addHumanText(text) {
      const voice = document.querySelector(".voice");
      const voice2text = document.querySelector(".voice2text");
      const chatContainer = document.createElement("div");
      chatContainer.setAttribute(
        'style',
        'border-color: #ccc ; border: 2px solid #dedede;background-color: 	#F5F5F5; border-radius: 10px;padding: 10px;margin: 10px auto;width: 90%',
      );
      const chatBox = document.createElement("p");
      chatBox.classList.add("voice2text");
      const chatText = document.createTextNode(text);
      chatBox.appendChild(chatText);
      chatContainer.appendChild(chatBox);
      return chatContainer;
    },

    addBotText(text) {
      const voice = document.querySelector(".voice");
      const voice2text = document.querySelector(".voice2text");
      const chatContainer1 = document.createElement("div");
      chatContainer1.setAttribute(
        'style',
        'border-color: #ccc ; background-color: #c0ffee;   border: 2px solid #dedede; border-radius: 10px;padding: 10px;margin: 10px auto;width: 90%',
      );

      const chatBox1 = document.createElement("p");
      chatBox1.classList.add("voice2text");
      const chatText1 = document.createTextNode(text);
      chatBox1.appendChild(chatText1);
      chatContainer1.appendChild(chatBox1);
      return chatContainer1;
    },
    botVoice(message) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = "Sorry,i do not have any idea, please contact the administration .";

      if (message == "" ) {
        speech.text = "Welcome to VendorPortal Assistant,how can i help you?";
      }

      if (message.includes('hello')) {
        speech.text = "Welcome to VendorPortal Assistant,how can i help you?";
      }

      if (message.includes('how are you')) {
        speech.text = "I am fine, thanks. and you?";
      }

      if (message.includes('what time spend of registration process ')) {
        speech.text = "we notify you when your request is processed ";
      }

      
      if (message.includes('help')) {
        speech.text = "i will try to answer your questions";
      }

       if (message.includes('Vendor Portal do')) {
        speech.text = "It is a portal for monitoring and streamline the procurement process ";
      }

        if (message.includes('Vendor Portal values')) {
        speech.text = "It is a portal for monitoring and streamline the procurement process ";
      }

      if (message.includes('fine')) {
        speech.text = "Nice to hear that. How can I help you today?";
      }
      speech.lang = 'en-US';
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
      var element = document.getElementById("container");
      element.appendChild(this.addBotText(speech.text));
    },
    chattextfn(){
      let element = document.getElementById("container");
        element.appendChild(this.addHumanText(this.chattext.toLowerCase()));
        this.botVoice(this.chattext.toLowerCase());
        this.chattext=""
    },

    chat() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recorder = new SpeechRecognition();
      recorder.lang = 'en-US';
      recorder.start()
      recorder.onstart = () => console.log('Voice activated');

      recorder.onresult = (event) => {
        const resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript;
        let element = document.getElementById("container");
        element.appendChild(this.addHumanText(transcript));
        this.botVoice(transcript);
      };
    },

    chatdialog(position) {
      if (this.val == 0) {
        this.displayResponsive = true;
        this.position = position;
        this.val = 1;


      }
      else {

        this.displayResponsive = false;
        this.val = 0;

      }
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    droitModification() {
      if (this.currentUser.roles == "ROLE_FOURNISSEUR") {
        if (this.currentUser && this.currentUser.status == "InProgress")
          this.$toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Validation of your information In progress', life: 3000 });
         else  if (this.currentUser && this.currentUser.status == "Submitted")
          this.$toast.add({ severity: 'error', summary: 'Warn Message', detail: 'You Are in submitted Mode', life: 3000 });
        else if (this.currentUser && this.currentUser.status == "Draft") {
          this.$router.push('/register');
        }
      }
    },
    terms() {
      this.termsDialog = true;
    },
    getAllrequest() {
      this.visibleLeft = false;
      this.number=0;
      this.$router.push('/requests');
    },
    showvendorboard() {
      this.visibleLeft = false;
    },
    showvendorlist() {
      this.visibleLeft = false;
    },
    showrequestsUpdate() {
      this.visibleLeft = false;
      this.number=0;
      this.$router.push('/requests');
    },
    showhome(){
      this.$router.push('/');
    },
    requestUpdate() {
      this.requestDialog = true;
      this.visibleLeft = false;
      let jsonobject = localStorage.user;
      let monobjet = JSON.parse(jsonobject)
      this.VendorService.getDetailsProfile(monobjet.email).then(data => this.posts = data);
    },
     changepassword() {
      this.changepasswordDialog = true;
      this.visibleLeft = false;
    

    },


    handleConfirmPassword(){
          let jsonobject = localStorage.user;
          let monobjet = JSON.parse(jsonobject)
          this.VendorService.changeUserPassword(monobjet.email,this.password1)
          if (this.password1 == this.password2){
          this.$toast.add({severity:'success', summary: 'Success Message', detail:'Password changed succefully', life: 3000})
          this.changepasswordDialog = false;
          }
          else
          this.$toast.add({severity:'error', summary: 'Error Message', detail:'please confirm your password correctly', life: 6000})
    },
  

    async confirm() {
      this.submitted = true;
      let jsonobject = localStorage.user;
      let monobjet = JSON.parse(jsonobject)
      await this.VendorService.findRequest(monobjet.email).then(data => this.state = data)
      if (this.validateForm()) {
        if (this.state == false) {
          this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Request Success', life: 3000 });
          this.VendorService.postRequestForUpdateProfile(this.posts, monobjet.email);
          this.requestDialog = false;
          this.accept= null;
        } else {
          this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'You have a request in progress', life: 3000 });
        }
      }
    },
    validateForm() {
      if (!this.posts.firstname.trim())
        this.validationErrors['firstname'] = true;
      else
        delete this.validationErrors['firstname'];
      if (!this.posts.lastname.trim())
        this.validationErrors['lastname'] = true;
      else
        delete this.validationErrors['lastname'];
      if (this.posts.phone === null)
        this.validationErrors['phone'] = true;
      else
        delete this.validationErrors['phone'];
      if (!this.posts.country.trim())
        this.validationErrors['country'] = true;
      else
        delete this.validationErrors['country'];
      if (!this.posts.region.trim())
        this.validationErrors['region'] = true;
      else
        delete this.validationErrors['region'];

      if (!this.posts.city.trim())
        this.validationErrors['city'] = true;
      else
        delete this.validationErrors['city'];

      if (!this.posts.postalcode.trim())
        this.validationErrors['postalcode'] = true;
      else
        delete this.validationErrors['postalcode'];

      if (!this.posts.address.trim())
        this.validationErrors['address'] = true;
      else
        delete this.validationErrors['address'];


      if (!this.posts.taxregistrationnumber.trim())
        this.validationErrors['taxregistrationnumber'] = true;
      else
        delete this.validationErrors['taxregistrationnumber'];


      if (!this.posts.taxclassificationcode.trim())
        this.validationErrors['taxclassificationcode'] = true;
      else
        delete this.validationErrors['taxclassificationcode'];

      if (!this.posts.revenu.trim())
        this.validationErrors['revenu'] = true;
      else
        delete this.validationErrors['revenu'];

      if (this.posts.dateEstablished === null)
        this.validationErrors['dateEstablished'] = true;
      else
        delete this.validationErrors['dateEstablished'];

      if (!this.posts.companywebsite.trim())
        this.validationErrors['companywebsite'] = true;
      else
        delete this.validationErrors['companywebsite'];

      if (!this.posts.postalcode.trim())
        this.validationErrors['postalcode'] = true;
      else
        delete this.validationErrors['postalcode'];

      return !Object.keys(this.validationErrors).length;
    },


  }
};
</script>
<style lang="scss" scoped>
.status-inprogress {

  color: #e9e38e;
}

.status-confirmed {
  color: #7fc584 !important;
}

.status-submitted {

  color: #e68e8e;
}

.status-draft {
  color: #6183f3;
}

.sponsor_button img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.footerChat{
  position: fixed;
  height: 25%;
}
.container{
  min-height:10vw ;
  overflow-y: scroll;
  overflow-y: hidden;}

p-dialog-title{
  background-color: black;
}
</style>


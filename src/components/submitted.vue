<template>
            <div>
        <div class="card" style="margin:3vw;">
               <h2 style="margin: auto;float: center;"><strong style="margin-bottom: 2vw;">{{$t("submittedpage.title1")}}</strong></h2>
               <h3 style="margin: auto;margin-bottom: 2vw;float: center;"><strong style="margin-bottom: 4vw;">{{$t("submittedpage.title2")}}</strong></h3>
              
              
                 <div class="row">  
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="class" style="margin-right:0.5vw">{{$t("submittedpage.name")}}:</label>
                    <b>{{ details.firstname ? details.firstname : '-'}} {{details.lastname ? details.lastname : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="phone" style="margin-right:0.5vw">{{$t("submittedpage.phone")}}:</label>
                    <b>{{details.phone ? details.phone : '-'}}</b>
                </div>
                </div>
                 <div class="row">
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="class" style="margin-right:0.5vw">{{$t("submittedpage.address")}}:</label>
                    <b>{{details.country ? details.country : '-'}} {{details.city ? details.city : '-'}} {{details.region ? details.region : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="address" style="margin-right:0.5vw">{{$t("submittedpage.address")}}:</label>
                    <b>{{details.address ? details.address : '-'}}</b>
                </div>
                </div>
                <div class="row">
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="codepostal" style="margin-right:0.5vw">{{$t("submittedpage.postalcode")}}:</label>
                    <b>{{details.postalcode ? details.postalcode : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="taxregistrationnumber" style="margin-right:0.5vw">{{$t("submittedpage.registration")}}:</label>
                    <b>{{ details.taxregistrationnumber ? details.taxregistrationnumber : '-'}}</b>
                </div>
                </div>
                <div class="row">
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="taxclassificationcode" style="margin-right:0.5vw">{{$t("submittedpage.classification")}}:</label>
                    <b>{{details.taxclassificationcode ? details.taxclassificationcode : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="revenu" style="margin-right:0.5vw">{{$t("submittedpage.revenu")}}:</label>
                    <b>{{details.revenu ? details.revenu : '-'}}</b>
                </div>
                </div>
                <div class="row" style="margin-bottom:2vw">
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="date" style="margin-right:0.5vw">{{$t("submittedpage.dateestablished")}}:</label>
                    <b>{{details.dateEstablished ? details.dateEstablished : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="companywebsite" style="margin-right:0.5vw">{{$t("submittedpage.website")}}:</label>
                    <b>{{details.companywebsite ? details.companywebsite : '-'}}</b>
                </div>
                </div>
        

               <img alt="logo" src="../assets/submitted.png" style="max-width: 200px;max-height: 150px;margin: auto;margin-bottom: 1vw;" />
               <p style="margin: auto;">{{$t("submittedpage.info")}}</p>

        </div>
        </div>
       
</template>

<script>
import VendorService from '../services/VendorService';
import Card from 'primevue/card';

export default {
  components: {
  
    Card,
   
  },

  
   data() {
        return {

          details: {
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
      
          }
        }
        
        },

   vendorService: null,


    created() {
        this.vendorService = new VendorService();
         
    
    },

  mounted(){
 
      let jsonobject = localStorage.user;
      let monobjet = JSON.parse(jsonobject);
      this.vendorService.getDetailsProfile(monobjet.email).then(data => this.details = data);
      console.log(this.details)   
  }
}

</script>
<template>
            <div>
        <div class="card" style="margin:3vw;">
               <h2 style="margin: auto;float: center;"><strong style="margin-bottom: 2vw;">Welcome To Vendor Portal </strong></h2>
               <h3 style="margin: auto;margin-bottom: 2vw;float: center;"><strong style="margin-bottom: 4vw;">your application for registration on the portal is being processed</strong></h3>
              
              
                 <div class="row">  
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="class" style="margin-right:0.5vw">Name :</label>
                    <b>{{ details.firstname ? details.firstname : '-'}} {{details.lastname ? details.lastname : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="phone" style="margin-right:0.5vw">Phone Number :</label>
                    <b>{{details.phone ? details.phone : '-'}}</b>
                </div>
                </div>
                 <div class="row">
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="class" style="margin-right:0.5vw">Address :</label>
                    <b>{{details.country ? details.country : '-'}} {{details.city ? details.city : '-'}} {{details.region ? details.region : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="address" style="margin-right:0.5vw">Address :</label>
                    <b>{{details.address ? details.address : '-'}}</b>
                </div>
                </div>
                <div class="row">
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="codepostal" style="margin-right:0.5vw">Code Postal :</label>
                    <b>{{details.postalcode ? details.postalcode : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="taxregistrationnumber" style="margin-right:0.5vw">Tax Registraion Number :</label>
                    <b>{{ details.taxregistrationnumber ? details.taxregistrationnumber : '-'}}</b>
                </div>
                </div>
                <div class="row">
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="taxclassificationcode" style="margin-right:0.5vw">Tax Classification Code :</label>
                    <b>{{details.taxclassificationcode ? details.taxclassificationcode : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="revenu" style="margin-right:0.5vw">Revenue For Last Year :</label>
                    <b>{{details.revenu ? details.revenu : '-'}}</b>
                </div>
                </div>
                <div class="row" style="margin-bottom:2vw">
                <div class="field col-6" style="margin-right:-5vw;margin-left: 5vw;">
                    <label for="date" style="margin-right:0.5vw">Date Established :</label>
                    <b>{{details.dateEstablished ? details.dateEstablished : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="companywebsite" style="margin-right:0.5vw">Company Web Site :</label>
                    <b>{{details.companywebsite ? details.companywebsite : '-'}}</b>
                </div>
                </div>
        

               <img alt="logo" src="../assets/submitted.png" style="max-width: 200px;max-height: 150px;margin: auto;margin-bottom: 1vw;" />
               <p style="margin: auto;">we will inform you by email when the request has been processed</p>

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
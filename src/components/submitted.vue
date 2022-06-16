<template>
            <div>
        <div class="card" style="margin:3vw;">
               <strong style="margin: auto;margin-bottom: 2vw;">Welcome To Vendor Portal your application for registration on the portal is being processed</strong>
               <p style="width: 90%;color:#3f2de1;margin-bottom:2vw;margin-left: 2vw;">Company Web Site : {{old.dateEstablished}}</p>

               <img alt="logo" src="../assets/submitted.png" style="max-width: 400px;max-height: 300px;margin: auto;margin-bottom: 0vw;" />
               <p style="margin: auto;">we will inform you by email when the request has been processed</p>

        </div>
        </div>
       
</template>

<script>
import AdminService from '../services/AdminService';
import Card from 'primevue/card';

export default {
  components: {
  
    Card,
   
  },

  
   data() {
        return {

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
      
          }
        }
        
        },

   adminservice: null,


    created() {
        this.adminservice = new AdminService();
         
    
    },

  mounted(){
      let jsonobject = localStorage.user;
      console.log("jsonobject    :"+jsonobject)
      let lcluser = JSON.parse(jsonobject);

      console.log("monobject     :"+lcluser)

      this.adminservice.getDetailsProfile(monobject.email).then(data => this.old = data);
  }
}

</script>
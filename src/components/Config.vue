<template>
<Toast />
            <div>
        <div class="card" >

         <div class="flex">
          
          
          <div class="row align-items-start">
                <div class=col-md-12>
                <h5 class="text-center" style="margin-right: auto;margin-left: auto;"><strong>{{$t("configpage.title")}}</strong></h5>
                </div>
                </div>

                 <div class="row align-items-start">
         
                 <div class="col-md-6">
                <div class="p-fluid">
                    <label for="email" style="width: 90%;margin-left:2vw;"><strong>{{$t("configpage.email")}}</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="email" v-model="configuration.email" />
                </div>
            </div>


                 <div class="col-md-6">
                <div class="p-fluid">
              <label for="passwordemail" style="width: 90%;margin-left:2vw;"><strong>{{$t("configpage.emailpassword")}}</strong></label>
            <Password v-model="configuration.password" :feedback="false"  style="width: 90%;margin-left:2vw;" id="passwordemail" toggleMask/>
                </div>
                </div>
                 

            </div>


             <div class="row align-items-start">
         
                 <div class="col-md-6">
                <div class="p-fluid">
                    <label for="maximopath" style="width: 90%;margin-left:2vw;"><strong>{{$t("configpage.maximopath")}}</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="maximopath" v-model="configuration.maximopath" />
                </div>
            </div>


                   <div class="col-md-6">
                <div class="p-fluid">
                    <label for="logpath" style="width: 90%;margin-left:2vw;"><strong>{{$t("configpage.logpath")}}</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="logpath" v-model="configuration.logpath" />
                </div>
            </div>
                 

            </div>


                 <div class="row align-items-start">
            
                 <div class="col-md-6">
                <div class="p-fluid">
                    <label for="maximouser" style="width: 90%;margin-left:2vw;"><strong>{{$t("configpage.maximouser")}}</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="maximouser" v-model="configuration.usermaximo" />
                </div>
            </div>


                 <div class="col-md-6">
                <div class="p-fluid">
              <label for="maximopassword" style="width: 90%;margin-left:2vw;"><strong>{{$t("configpage.maximopassword")}}</strong></label>
            <Password v-model="configuration.passwordmaximo" :feedback="false"  style="width: 90%;margin-left:2vw;" id="maximopassword" toggleMask/>
                </div>
                </div>
                 

            </div>

             <div class="row align-items-start">
            
       <div class="col-md-6">
                <div class="p-fluid">
                    <label for="organisation" style="width: 90%;margin-left:2vw;"><strong>{{$t("configpage.organisation")}}</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="organisation" v-model="configuration.organization" />
                </div>
            </div>
               
            </div>

            <Button :label="$t('configpage.apply')" icon="pi pi-check" @click="apply()" style="margin: 2vw;float: right;"  />

            
            

        </div>
        </div>
        </div>
       
</template>

<script>
import Card from 'primevue/card';
import InputText from "primevue/inputtext"
import Password from 'primevue/password';
import Button from 'primevue/button';
import ConfigService from '../services/ConfigService';

export default {
  components: {
    InputText,
    Card,
    Password,
    Button

  },
   
    data() {
    return {
           configuration: {
            email: '',
            password: '',
            maximopath:'',
            logpath:'',
            passwordmaximo:'',
            usermaximo:'',
            organization:''
        }

     

  }
    },

    ConfigService: null,
  
    created() {

        this.ConfigService = new ConfigService();
  
    },
  
  mounted()
  {
      let person = prompt("Please enter your password");
      if (person != "admin") {
        this.$router.push('/notfound');
}
this.ConfigService. getConfig().then(data => this.configuration = data);
  },
  methods: {

apply(){

     this.ConfigService.updateConfig(this.configuration);
        this.$toast.add({severity:'success', summary: 'Success Message', detail:'Configuration saved successfully', life: 3000});

}
  }
};

</script>
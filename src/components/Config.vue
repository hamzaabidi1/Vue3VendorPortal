<template>
<Toast />
            <div>
        <div class="card" >

         <div class="flex">
          
          
          <div class="row align-items-start">
                <div class=col-md-12>
                <h5 class="text-center" style="margin-right: auto;margin-left: auto;"><strong>Configuration</strong></h5>
                </div>
                </div>

                 <div class="row align-items-start">
         
                 <div class="col-md-6">
                <div class="p-fluid">
                    <label for="email" style="width: 90%;margin-left:2vw;"><strong>Email</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="email" v-model="configuration.email" />
                </div>
            </div>


                 <div class="col-md-6">
                <div class="p-fluid">
              <label for="password" style="width: 90%;margin-left:2vw;"><strong>Email Password</strong></label>
            <Password v-model="configuration.password" :feedback="false"  style="width: 90%;margin-left:2vw;" id="password" toggleMask/>
                </div>
                </div>
                 

            </div>


             <div class="row align-items-start">
         
                 <div class="col-md-6">
                <div class="p-fluid">
                    <label for="maximopath" style="width: 90%;margin-left:2vw;"><strong>Maximo Path</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="maximopath" v-model="configuration.maximopath" />
                </div>
            </div>


                   <div class="col-md-6">
                <div class="p-fluid">
                    <label for="logpath" style="width: 90%;margin-left:2vw;"><strong>Log Path</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="logpath" v-model="configuration.logpath" />
                </div>
            </div>
                 

            </div>


                 <div class="row align-items-start">
            
                 <div class="col-md-6">
                <div class="p-fluid">
                    <label for="email" style="width: 90%;margin-left:2vw;"><strong>Maximo user</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="email" v-model="configuration.usermaximo" />
                </div>
            </div>


                 <div class="col-md-6">
                <div class="p-fluid">
              <label for="password" style="width: 90%;margin-left:2vw;"><strong>Maximo Password</strong></label>
            <Password v-model="configuration.passwordmaximo" :feedback="false"  style="width: 90%;margin-left:2vw;" id="password" toggleMask/>
                </div>
                </div>
                 

            </div>

            <Button label="Apply" icon="pi pi-check" @click="apply()" style="margin: 2vw;float: right;"  />

            
            

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
            usermaximo:''
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
<template>
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
                    <InputText style="width: 90%;margin-left:2vw;" id="email" v-model="email" />
                </div>
            </div>


                 <div class="col-md-6">
                <div class="p-fluid">
              <label for="password" style="width: 90%;margin-left:2vw;"><strong>Email Password</strong></label>
            <Password v-model="password" :feedback="false"  style="width: 90%;margin-left:2vw;" id="password"/>
                </div>
                </div>
                 

            </div>


             <div class="row align-items-start">
         
                 <div class="col-md-6">
                <div class="p-fluid">
                    <label for="maximopath" style="width: 90%;margin-left:2vw;"><strong>Maximo Path</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="maximopath" v-model="maximopath" />
                </div>
            </div>


                   <div class="col-md-6">
                <div class="p-fluid">
                    <label for="logpath" style="width: 90%;margin-left:2vw;"><strong>Log Path</strong></label>
                    <InputText style="width: 90%;margin-left:2vw;" id="logpath" v-model="logpath" />
                </div>
            </div>
                 

            </div>

            
            

        </div>
        </div>
        </div>
       
</template>

<script>
import Card from 'primevue/card';
import InputText from "primevue/inputtext"
import Password from 'primevue/password';

export default {
  components: {
    InputText,
    Card,
    Password
  },
   
    data() {
    return {
email: '',
password: '',
maximopath:'',
logpath:''

  }
    }
  ,
  mounted()
  {
      let person = prompt("Please enter your password");
if (person != "admin") {

    this.$router.push('/notfound');



}
  }
}

</script>
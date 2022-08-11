<template>

 
               <h3 style="margin: auto;text-align: center;margin-top: 3vw;"><strong >{{$t('home.title1')}}</strong></h3>
               <img class="center" alt="logo" src="../assets/logo-home.png" style="max-width: 300px;max-height: 300px;margin: auto;margin-bottom: 2vw;margin-top: 2vw;" />
               <p style="margin: auto;text-align: center;">{{$t('home.title2')}}</p>
    

</template>

<script>


export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {

   
    
  },
};
</script>
<style scoped >

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}


</style>

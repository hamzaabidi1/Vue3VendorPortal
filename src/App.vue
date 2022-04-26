<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div v-if="currentUser" >
      <Sidebar v-model:visible="visibleLeft" class="bg-dark">
	        <li v-if="showAdminBoard">
          <router-link to="/admin" class="navbar-brand" style="color:white;">Admin Board</router-link>
        </li>
        <li v-if="showFournisseurBoard" >
          <router-link to="/fournisseur" class="navbar-brand" style="color:white;">Vendor Board</router-link>
        </li>
      </Sidebar>
     <i class="pi pi-bars navbar-brand" @click="visibleLeft = true" ></i>
     
     </div>
        <li class="nav-item" >
      <router-link to="/" class="navbar-brand"><font-awesome-icon icon="home" />VendorPortal</router-link>
      </li>
      
      <div class="navbar-nav mr-auto">
        <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        </div>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/verifyemail" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
         <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Sign In
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li v-if="currentUser.roles =='ROLE_FOURNISSEUR'" class="nav-item">
          <router-link to="" class="nav-link">
            {{ currentUser.status }}
          </router-link>
        </li>
        
        <li  class="nav-item">
          <router-link @click.prevent="droitModification" to="" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
          <Toast />
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    



    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import 'primeicons/primeicons.css';
export default {
   data() {
        return {
            visibleLeft: false,
        }},
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
   
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
     droitModification() {
       if (this.currentUser.roles == "ROLE_FOURNISSEUR")
       {
      if (this.currentUser && this.currentUser.status == "InProgress" ) 
        this.$toast.add({severity:'warn', summary: 'Warn Message', detail:'Validation of your information In progress', life: 3000});
        else if (this.currentUser && this.currentUser.status == "Draft" ){
           this.$router.push('/register');
        }
      }
     }
  }
};
</script>
<style lang="scss" scoped>
.status-inprogress{
   background: #feedaf;
    color: #8a5340;
}
.status-Confirmed{
    background: #c8e6c9;
    color: #256029;
}
.status-submitted {
    background: #ffcdd2;
    color: #c63737;
}
.status-draft {
    background: #99d9f7;
    color: #1a07cc;
}
</style>

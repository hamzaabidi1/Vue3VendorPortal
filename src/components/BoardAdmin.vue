<template>
  <div class="container">
      <center><h3>{{ content }}</h3></center>
  </div>
   <Table />
</template>

<script>
import UserService from "../services/user.service";
import Table from "./datatable.vue"

export default {
  name: "Admin",
  components: {
    Table
  },
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

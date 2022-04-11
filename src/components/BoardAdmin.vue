<template>
  <div class="container">
      <h3 style="text-align: center">{{ content }}</h3>
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

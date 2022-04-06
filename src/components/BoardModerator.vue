<template>
</template>

<script>
import UserService from "../services/user.service";
import register from "./Register.vue"

export default {
  name: "Moderator",
   components: {
   register
  },
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getModeratorBoard().then(
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

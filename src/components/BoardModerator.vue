<template>
<TablesFournisseur />
</template>

<script>
import UserService from "../services/user.service";
import register from "./Register.vue"
import TablesFournisseur from "./TablesFournisseur.vue"
export default {
  name: "Moderator",
   components: {
   register,
   TablesFournisseur
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

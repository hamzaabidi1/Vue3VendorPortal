<template>
<TablesFournisseur />
</template>

<script>
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
  },
};
</script>

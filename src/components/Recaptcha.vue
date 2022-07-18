<template >
<div style="margin-bottom: 1vw;">
  <vue-recaptcha ref="recaptcha" sitekey="6LfqZ_0gAAAAAKqip6SnPm_Xl3dPypzsoNnj6lVS"  style="transform:scale(0.9);transform-origin:0;-webkit-transform:scale(0.9);
transform:scale(0.9);-webkit-transform-origin:0 0;transform-origin:0 0;" />

  </div>
</template>

<script>
  import { VueRecaptcha } from 'vue-recaptcha';
  export default {
    components: { VueRecaptcha },

    methods: {
      onEvent() {
        // when you need a reCAPTCHA challenge
        this.$refs.recaptcha.execute();
      }
    }
  };
</script>
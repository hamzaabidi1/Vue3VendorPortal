<template>
<Steps :model="items" />
<router-view />

</template>

<script>

export default {
    name: "StepSignup",
	data() {
		return {
			items: [{
                label: 'Genneral Information',
                to: '/steps'
            },
            {
                label: 'Adress Information',
                to: '/steps/Adress'
            },
            {
                label: 'Fiscal Information',
                to: '/steps/fiscal'
            },
            {
                label: 'Legacy Information',
                to: '/steps/legacy'
            },
            {
                label: 'Confirmation',
                to: '/steps/confirmation'
            }
            ]
		}
	}
  
  };

</script>


<style >

</style>

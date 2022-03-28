<template>
    <div>
        <div class="content-section introduction">
            <div class="feature-intro">
                <h1>Resgister</h1>
            </div>
        </div>

        <div class="content-section implementation">
            <div class="card">
                <Steps :model="items" :readonly="true" />
            </div>

            <router-view v-slot="{Component}" :formData="formObject" @prev-page="prevPage($event)" @next-page="nextPage($event)" @complete="complete">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </div>


    </div>
</template>

<script>


export default {
    data() {
        return {
            items: [{
                label: 'General Information',
                to: '/register'
            },
            {
                label: 'Address Information',
                to: '/register/adressInformation'
            },
            {
                label: 'Fiscal Information',
                to: '/register/fiscal'
            },
            {
                label: 'Legacy Information',
                to: '/register/legacy'
            },
            {
                label: 'Confirmation',
                to: '/register/confirmation'
            }],
            formObject: {}
        }
    },
    methods: {
        nextPage(event) {
            console.log("nextPage Steps")
            for (let field in event.formData) {
                this.formObject[field] = event.formData[field];
            }

            this.$router.push(this.items[event.pageIndex + 1].to);
        },
        prevPage(event) {
            this.$router.push(this.items[event.pageIndex - 1].to);
        },
        complete() {
            this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
        }
    }
}
</script>



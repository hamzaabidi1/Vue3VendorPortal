<template>
    <div>
        

        <div class="content-section implementation">
            <div class="card" style="margin:auto">
                <Steps :model="items" :readonly="true" style="margin-top:1vw" />
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
    emits: ['nextPage', 'prevPage','complete'],
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

<style scoped lang="scss">
::v-deep(b) {
    display: block;
}
::v-deep(.p-card-body) {
    padding: 2rem;
}
</style>



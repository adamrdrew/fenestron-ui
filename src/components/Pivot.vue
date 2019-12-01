<template lang="pug">
div(style="display: grid; grid-template-rows: 4em auto; height: 100%; max-height: 100%;")
    .pivot-item-bar.divider-border-color
        slot(name="items")
    slot(name="content")
</template>

<script>
export default {
    props: {
        defaultTabId: String
    },
    data:() => ({
        activeTab: ""
    }),
    methods: {
        registerChildPivotItemHandler() {
            this.$on("pivot-item-clicked", (param) => this.itemClickHandler(param))
        },
        itemClickHandler(event) {
            this.activeTab = event
        },
        showDefault() {
            if (this.activeTab == this.defaultTabId) return
            this.itemClickHandler(this.defaultTabId)
        }
    },
    mounted() {
        this.registerChildPivotItemHandler()
        this.showDefault()
    }
}
</script>

<style scoped>
.pivot-item-bar {
    display: flex;
    flex-direction: horizontal;
    width: 98%;
    margin: auto;
    border-style: solid;
    border-width: 0 0 1px 0;
}
</style>
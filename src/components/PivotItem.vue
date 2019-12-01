<template lang="pug">
.pivot-item.border-color-transition.ms-fontSize-18(@click="clickHandler", :style="borderStyle")
    p.pivot-p(:class="textClass") {{ label }}     
</template>

<script>
export default {
    props: {
        label: String,
        tabId: String
    },
    methods: {
        clickHandler() {
            this.$parent.$emit("pivot-item-clicked", this.tabId)
        }
    },
    computed: {
        accentColor() {
            return `#${this.$store.state.theme.accentColor}`
        },
        borderColor() {
            return this.isActive ? this.accentColor : "transparent"
        },
        isActive() {
            return this.tabId === this.$parent.activeTab
        },
        textClass() {
            return {"text-primary": this.isActive, "text-secondary": !this.isActive}
        },
        borderStyle() {
            return {
                borderStyle: "solid",
                borderWidth: "0 0 4px 0",
                borderColor: this.borderColor
            }
        }
    }
}
</script>

<style scoped>
.pivot-item {
    min-width: 5em;
    margin-left: 1em;
    margin-right: 1em;
    text-align: center;
    cursor: hand;

}
.pivot-p {
    margin-bottom: .5em; 
    cursor: hand;
    -webkit-user-select: none; 
}
</style>
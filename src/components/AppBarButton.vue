<template lang="pug">
.app-bar-button(@click="clickProxy")
    i(:class="iconClass").ms-Icon
    .null(v-if="showTitle") {{title}}
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Button"
        },
        icon: {
            type: String,
            default: "BuildQueue"
        },
        showTitle: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        iconClass() {
            return {
                [`ms-Icon--${this.icon}`]: true
            }
        },
    },
    methods: {
        clickProxy() {
            this.$emit("click")
        }
    }

}
</script>

<style scoped>
.app-bar-button {
    cursor: hand;
    -webkit-user-select: none;
    display: flex;
    border-style: none;
    margin-left: 4px;
    margin-right: 4px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 64px;
    height: 95%;
}
.app-bar-button:hover {
    background-color: lightgray;
    border-style: solid;
    border-color: darkgrey;
    border-width: 1px;
}
</style>
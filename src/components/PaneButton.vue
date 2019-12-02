<template lang="pug">
div.pane-button.border-color-transition(@click="clicked", :style="buttonStyle")
    div.pane-button-icon(:style="iconStyle")
        i(:class="iconClass").ms-Icon
    p(v-show="paneOpen") {{ title }}
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: "GlobalNavButton"
        },
        title: {
            type: String,
            default: "Button"
        },
        paneOpen: {
            type: Boolean,
            default: true
        },
        highlight: {
            type: Boolean,
            default: false
        },
        navigate: {
            type: String,
            default: "NoNavigationConfigured"
        },
        useAccentColor: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: false
        }

    },
    methods: {
        clicked() {
            if ( this.navigate != "NoNavigationConfigured") this.$router.push({name: this.navigate})
            this.$emit("click")
        }
    },
    computed: {
        smartActive() {
            if ( this.navigate === "NoNavigationConfigured") return this.active
            return this.$route.name === this.navigate
        },
        iconClass() {
            return {
                [`ms-Icon--${this.icon}`]: true
            }
        },
        iconStyle() {
            return this.useAccentColor ? {color: this.accentColor} : {}
        },
        accentColor() {
            return `#${this.$store.state.theme.accentColor}`
        },
        borderColor() {
            return this.smartActive ? this.accentColor : "transparent"
        },
        buttonStyle() {
            return {
                borderStyle: "solid",
                borderWidth: "0 0 0 4px",
                borderColor: this.borderColor
            }
        }
    }
}
</script>

<style scoped>
.pane-button {
    display: grid; 
    grid-template-columns: 44px auto;
}
.pane-button:hover {
    background-color: lightgray;
}
.pane-button-icon {
    font-size: 22px; 
    padding: .5em;
}
</style>
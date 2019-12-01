<template lang="pug">
div.theme-panel(:style="panelStyle")
    slot
</template>

<script>
export default {
    props:{
        orientation: {
            type: String,
            default: "vertical"
        },
        widthPercent: {
            type: Number,
            default: 100
        },
        heightPercent: {
            type: Number,
            default: 100
        },
        scroll: {
            type: Boolean,
            default: false
        },
        wrap: {
            type: String,
            default: "no-wrap"
        },
        opacity: {
            type: Number,
            default: 1.0
        },
        rgb: {
            type: String,
            default: "noneSpecified"
        }
    },
    data:() => ({
        directions: {
            vertical: "column",
            horizontal: "row"
        }
    }),
    computed: {
        flexDirection() {
            return this.directions[this.orientation]
        },
        overflowAuto() {
            return this.scroll ? "auto" : "hidden"
        },
        panelStyle() {
            let style = {
                display: "flex",
                minWidth: 0,
                minHeight: "min-content",
                overflowY: this.overflowAuto,
                overflowX: this.overflowAuto,
                width: `${this.widthPercent}%`,
                height: `${this.heightPercent}%`,
                flexWrap: this.wrap,
                flexDirection: this.flexDirection
            }
            if ( this.rgb != "noneSpecified") style["background-color"] = `rgba(${this.rgb}, ${this.opacity})`
            return style

        }
    }
}
</script>
<template lang="pug">
div(style="position: relative; height: 100%; padding: 0px; margin: 0px;")
    div.backgroundLayer(style="height: 100%; width: 100%; z-index: 80; position: absolute; top: 0; left: 0;")
        slot(name="background")
    div.foregroundLayer(:style="fgStyle")
        slot(name="foreground")
</template>

<script>
export default {
    props: {
        fgWidth: {
            type: String,
            default: "100%"
        },
        fgHeight: {
            type: String,
            default: "100%"
        },
        fgTop: {
            type: String,
            default: "0"
        },
        fgLeft: {
            top: String,
            default: "0"
        },
        fgRight: {
            top: String,
            default: "auto"
        },
        fgBottom: {
            top: String,
            default: "auto"
        }
    },
    computed: {
        fgStyle() {
            return {
                zIndex: "90",
                position: "absolute",
                width: this.fgWidth,
                height: this.fgHeight,
                top: this.fgTop,
                left: this.fgLeft,
                right: this.fgRight,
                bottom: this.fgBottom
            }
        }
    }
    
}
</script>

<style scoped>
</style>
<template lang="pug">
div(:style="[appBarStyle, appBarPosition]", @mouseenter="mouseEnter", @mouseleave="mouseLeave")
    .showing-bar(v-if="!hidden")
        slot(name="primary-commands")
        .right-side
            slot(name="secondary-commands")
    .hidden-bar(v-else)
        i.ms-Icon.ms-Icon--More
</template>

<script>
export default {
    props: {
        bottom: {
            type: Boolean,
            default: false
        },
        autoHide: {
            type: Boolean,
            default: false
        },
        hideTimeOut: {
            type: Number,
            default: 500
        }
    },
    data: () => ({
        hidden: false,
        fullHeight: "42px",
        minHeight: "9px",
        timeOutfunction: () => ({})
    }),
    computed: {
        currentHeight() {
            return this.hidden ? this.minHeight : this.fullHeight
        },
        appBarPosition() {
            var style = { 
                width: "100%",
                position: "sticky",
            }
            if ( this.bottom ) {
                style.top = `calc(100% - ${ this.currentHeight } )`
                style.left = "0"
            } else {
                style.top = "0"
                style.left = "0"
            }
            return style
        },
        appBarStyle() {
            var style = {
                content: " ",
                height: this.currentHeight, 
                minHeight:  this.currentHeight,   
                display: "flex",
                flexDirection: "row",
                left: 0,
                backgroundColor: "#dadada",
                top: 0,
                filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.1))",
                transition: "height .1s linear"
            }
            return style

        }
    },
    methods: {
        mouseEnter() {
            if ( !this.autoHide ) return
            this.hidden = false
            clearTimeout(this.timeOutfunction)
        },
        mouseLeave() {
            if ( !this.autoHide ) return
            this.timeOutfunction = window.setTimeout(() => {
                this.hidden = true
            }, this.hideTimeOut)
        }
    },
    mounted() {
        this.mouseLeave()

    }
}
</script>

<style scoped>
.hidden-bar {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: -2px;
}
.showing-bar {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
}

.right-side {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}
</style>
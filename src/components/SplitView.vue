<template lang="pug">
div(:style="gridStyle")
    div.theme-panel-secondary(:style="paneStyle")
        PaneButton(v-if="toggleButton", :pane-open="paneOpen", icon="GlobalNavButton", @click="toggle", title="")
        slot(name="pane", :paneOpen="paneOpen")
    div(:style="contentStyle")
        slot(name="content", :paneOpen="paneOpen")
</template>

<script>

export default {
    props: {
        toggleButton: {
            type: Boolean,
            default: true
        },
        openWidth: {
            type: String,
            default: "23em"
        },
        compactWidth: {
            type: String,
            default: "3.2em"
        },
        paneBackground: {
            type: String,
            default: "#e1e1e1"
        },
        titleBarOffset: {
            type: Boolean,
            default: false
        },
        displayMode: {
            type: String,
            default: "inline"
        }

    },
    data: () => ({
        paneOpen: true
    }),
    methods: {
        toggle() {
            this.paneOpen = !this.paneOpen
        }
    },
    computed: {
        paneWidth() {
            return this.paneOpen ? this.openWidth : this.compactWidth
        },
        contentMargin() {
            if ( this.displayMode === "inline"  ) return 0
            if ( this.displayMode === "overlay" ) return this.compactWidth
            return 0
        },
        displayModeContentColumnStart() {
            //These magic numbers are grid-column-start values for the .content
            //we change between inline and overlay by switching which column
            //the content's grid definition starts on
            if ( this.displayMode === "inline"  ) return 2
            if ( this.displayMode === "overlay" ) return 1
            return 2
        },
        contentStyle() {
            let style = {
                overflow: "auto",
                gridColumnStart: this.displayModeContentColumnStart,
                gridColumnEnd: 3,
                gridRowStart: 1,
                gridRowEnd: 2,
                zIndex: 49,
                marginLeft: this.contentMargin
            }

            if ( this.titleBarOffset) {
                style["padding-top"] = "30px"
                style["height"] = "calc(100% - 30px)" 
            }

            return style
        },
        paneStyle() {
            let style = {
                gridColumnStart: 1,
                gridColumnEnd: 2,
                gridRowStart: 1,
                gridRowEnd: 2,
                zIndex: 50,
                filter: "drop-shadow(1px 0px 5px rgba(0,0,0,0.2))",
            }
            if ( this.titleBarOffset) {
                style["padding-top"] = "30px"
                style["height"] = "calc(100% - 30px)" 
            }
            if ( this.displayMode == "overlay" ) {
                style["backdrop-filter"] = "blur(8px)"
                style["background-color"] = `${this.paneBackground}99`
            } else {
                style["background-color"] = `${this.paneBackground}`
            }
            return style
        },
        gridStyle() {
            return {
                height: "100%",
                display: "grid",
                gridTemplateColumns: `${this.paneWidth} auto`,
                gridTemplateRows: "auto",
                //This doesn't work but leaving in hopes that a browser engine update someday adds this
                transition: "grid-template-columns 5s"
            }
        }
    }
}
</script>

<style scoped>
.grid {
    height: 100%;
    display: grid;
    grid-template-columns: 23em auto;
    grid-template-rows: auto;
}


</style>
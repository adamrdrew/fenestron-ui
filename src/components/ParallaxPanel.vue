<template lang="pug">
.parallax(:style="parallaxStyle")
    .parallax-content(:style="parallaxContentStyle")
        .parallax-background(:style="parallaxBackgroundStyle")
        .slot-content-area(ref="slotContentArea", :style="blurStyle")
            slot
</template>

<script>
export default {
    components: {
    },
    props: {
        backgroundImage: {
            type: String,
            default: ""
        },
        blur: {
            type: Boolean,
            default: false
        },
        blurSize: {
            type: String,
            default: "10px"
        }
    },
    data:() => ({
        contentHeight: "100%"
    }),
    methods: {
        /*
            getContentHeight, updated, mounted, event listeners... uh, what's up?
            We need the div containing the background image to resize if the content resizes.
            There are a bunch of different scenarios that can cause that, but the 2 most notable
            are the DOM changing and window resizing. mounted and updated have us covered for initial render
            and when the dom changes. the resize listeners handle the window resizing.
        
            why the next tick? we're trying to deal with content area resizes based on dom updates.
            we need the dom to render out before we can do that.

            all told this solution may be ugly but I think it is the most efficient way to deal with this.
            we're only calculating the height of the ref when something happens, so this should be
            fairly efficient.
        */
        getContentHeight() {
            this.$nextTick(() => { 
                this.contentHeight = this.$refs.slotContentArea.clientHeight
            })
        }
    },
    mounted() {
        this.getContentHeight() 
    },
    updated() {
        this.getContentHeight()
    },
    created() {
        window.addEventListener('resize', this.getContentHeight)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getContentHeight)
    },
    computed: {
        parallaxStyle() {
            return {
                height: "100%",
                width: "100%",
                overflow: "hidden",
                backgroundColor: "transparent"
            }
        },
        parallaxContentStyle() {
            return {
                position: "relative",
                perspective: "100px",
                overflowX: "hidden",
                overflowY: "auto",
                height: "100%",
                width: "100%",
                background: `url(${this.backgroundImage})`,
            }
        },
        parallaxBackgroundStyle() {
            return {
                position: "absolute",
                backgroundImage: `url(${this.backgroundImage})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                height: `${this.contentHeight}px`,
                width: "100%",
                overflowX: "hidden",
                transform: "translateZ(-50px) scale(1.5)",
                zIndex: "-1",
            }
        },
        blurStyle() {
            let p = {
                padding: "1em",
            }
            if ( !this.blur ) return p
            p["backdrop-filter"] = `blur(${this.blurSize})`
            return p

        }
    }
}
</script>



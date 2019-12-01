<template lang="pug">
div(:style="[panelStyle, blurStyle]")
    slot
</template>

<script>
import StackPanel from '@/components/StackPanel.vue'
export default {
    extends: StackPanel,
    props: {
        blurSize: {
            type: Number,
            default: 1
        }
    },
    computed: {
        blurStyle() {
            return {
                backdropFilter: `blur(${this.blurSize}px)`,
                filter: "drop-shadow(0px 8px 5px rgba(0,0,0,0.5))",
            }
        }
    }
}
</script>


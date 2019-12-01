<template lang="pug">
div.grid(:style="gridStyle")
    slot
</template>

<script>
export default {
    props: {
        widthPercent: {
            type: Number,
            default: 100
        },
        heightPercent: {
            type: Number,
            default: 100
        },
        columns: {
            type: String,
            default: "0"
        },
        rows: {
            type: String,
            default: "0"
        },
        columnDefinitions: {
            type: Array,
            default:() => []
        },
        rowDefinitions: {
            type: Array,
            default:() => []
        }
    },
    methods: {
        percents(axis) {
            return axis.map(pct => `${pct}`).join(" ")
        }
    },
    computed: {
        gridStyle() {
            var styles = {
                display: "grid",
                minWidth: 0,
                minHeight: 0,
                maxHeight: "100%",
                overflowY: "auto",
                overflowX: "auto",
                width: `${this.widthPercent}%`,
                height: `${this.heightPercent}%`,
            }
            if (this.columnDefinitions.length > 0) styles.gridTemplateColumns = this.columnDefinitions.join(" ")
            if (this.rowDefinitions.length > 0) styles.gridTemplateRows = this.rowDefinitions.join(" ")
            return styles
        }
    }
}
</script>

<style>
.grid {
    display: grid;
}
</style>
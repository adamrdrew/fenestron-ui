<template lang="pug">
.container
    .tab-bar(@dragover.prevent="dragOver")
        .tab-button(
            v-for="(item, index) in itemSource",
            :arrayIndex="index", 
            @click="tabClicked(item[idProperty])", 
            :class="tabClass(item[idProperty])",
            :draggable="canDrag",
            @dragstart="dragStart($event, item)",
            @drop="dragDrop")
            img.tab-icon(v-if="hasIcon(item)", :src="item[iconProperty]")
            .tab-title(:title="item[titleProperty]") {{ item[titleProperty] }}
            .close-button(@click="tabCloseClicked({id: item[idProperty], index: index})", v-if="canClose")
                i.ms-Icon.ms-Icon--StatusCircleErrorX
            AppBarSeperator(v-show="item[idProperty] != selectedItemID")
    div(v-if="activeBackground")
        div(v-for="item in itemSource", v-show="item[idProperty] === selectedItemID")
            slot(name="tab-content", :item="item", :background="item[idProperty] != selectedItemID")
    div(v-if="!activeBackground")
        div(v-for="item in itemSource", v-if="item[idProperty] === selectedItemID")
            slot(name="tab-content", :item="item", :background="item[idProperty] != selectedItemID")
</template>

<script>

export default {
    data: () => ({
        selectedItemID: 0
    }),
    props: {
        itemSource: {
            type: Array,
            default: () => []
        },
        titleProperty: {
            type: String,
            default: "title"
        },
        idProperty: {
            type: String,
            default: "id"
        },
        iconProperty: {
            type: String,
            default: "icon"
        },
        activeBackground: {
            type: Boolean,
            default: false
        },
        canClose: {
            type: Boolean,
            default: false
        },
        canDrag: {
            type: Boolean,
            default: false
        },
        value: {}
    },
    methods: {
        dragStart(event, item) {
            event.dataTransfer.setData( "itemID", item[this.idProperty] )
        },
        dragDrop(e) {
            var droppedItemID = parseInt( e.dataTransfer.getData("itemID") )
            var targetItemID  = parseInt(e.currentTarget.getAttribute("arrayIndex"))
            if ( typeof(targetItemID) === "undefined" ) return
            this.$emit("drag-and-drop", {source: droppedItemID, destination: targetItemID})
        },
        dragOver(e) {
            //This NOOP just serves to prevent default
            return e
        },
        hasIcon(item) {
            return typeof(item[this.iconProperty]) != "undefined"
        },
        tabCloseClicked(e) {
            this.$emit('tab-close-clicked', e)
        },
        isTabSelected(id) {
            return id === this.selectedItemID
        },
        tabClicked(id) {
            this.$emit("input", id)
            this.selectedItemID = id
        },
        tabClass(id) {
            return {
                activeTab: this.isTabSelected(id),
                inactiveTab: !this.isTabSelected(id)
            }
        }
    },
    mounted() {
        if ( this.itemSource.length === 0 ) return
        this.selectedItemID = this.itemSource[0][this.idProperty]
    },
    watch: {
        selectedItemID() {
            this.$emit("update", this.selectedItemID);
        }
    }


}
</script>

<style scoped>
.tab-icon {
    width: 16px;
    height: 16px;
    padding: 4px;
}

.container {
    width: 100%;
}

.tab-title {
    width: calc(100%);
    max-width: calc(100%);
    text-overflow: ellipsis !important;
    overflow:hidden;
    white-space:nowrap;

}

.close-button {
    align-self: center;
    border-radius: 1em;
    width: 16px;
    height: 16px;
    padding: 0px;
    text-align: center;
    z-index: +1;
}

.close-button:hover {
    background-color: darkgrey;
}

.tab-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-content: stretch;
    justify-items: flex-start;
    background-color: darkgrey;
    padding-top: 8px;
    padding-left: 8px;
}
.tab-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-style: solid;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    min-width: 100px;
    max-width: 200px;
    width: 100%;
    height: 32px;
    -webkit-user-select: none;
}
.activeTab {
    background-color: lightgray !important;
    border-color: lightgray !important; 
}

.inactiveTab {
    background-color: darkgrey !important;
    border-color: darkgrey !important;
    border-right-width: 1px;
    border-top-right-radius: 0px;
}

</style>
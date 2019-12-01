export default {
    methods: {
        dragAndDrop(dnd, itemArray) {
            var sourceIndex = dnd.source
            var destIndex = dnd.destination
            var sourceItem = itemArray.splice(sourceIndex, 1)[0]
            itemArray.splice(destIndex, 0, sourceItem)
        },
        tabCloseClicked(e, itemArray) {
            itemArray.splice(e.id, 1)
        }
    }
}
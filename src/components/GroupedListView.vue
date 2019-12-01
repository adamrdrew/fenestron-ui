<!-- https://developer.mozilla.org/en-US/docs/Web/CSS/position#Sticky_positioning -->
<template lang="pug">
.group-list-view
    transition(:name="itemsTransition")
        dl(v-if="!headerGridShowing", ref="itemList")
            .item-group(v-for="group in itemsSource")
                dt.header-button.text-inverted(:ref="group.heading", :style="groupHeaderStyle", @click="showHeaderGrid") {{group.heading}}
                dd.list-item(v-for="item in group.items", :key="item.id" @click="itemClick(item)") 
                    slot(:item="item")
                        h3.text-primary {{ item.content }}
    transition(:name="headersTransition",  @after-leave="scrollToSelectedHeading")
        .header-grid(v-if="headerGridShowing",ref="headerGrid")
                dt.header-button.text-inverted.ms-Icon.ms-Icon--Back(:style="groupHeaderStyle", @click="hideHeaderGrid")
                dt.header-button.text-inverted(v-for="group in itemsSource", :style="groupHeaderStyle", @click="headingSelected(group.heading)") {{group.heading}}
</template>

<script>
export default {
    data:() => ({
        headerGridShowing: false,
        selectedHeading: ""
    }),
    props: {
        itemsTransition: {
            type: String,
            default: "zoom-in"
        },
        headersTransition: {
            type: String,
            default: "zoom-out"
        },
        clickableHeaders: {
            type: Boolean,
            default: true
        },
        itemsSource: {
            type: Array,
            default: () => ([
                {heading: "Foo", items: [ 
                    {content: "Bar", id: "AAAA"},
                ]}
            ])
        }
    },
    methods: {
        scrollToSelectedHeading() {
            this.$refs[this.selectedHeading][0].scrollIntoView()
        },
        headingSelected(heading) {
            this.selectedHeading = heading
            this.headerGridShowing = false;

        },
        itemClick(item) {
            this.$emit('item-click', item)
        },
        showHeaderGrid() {
            if ( !this.clickableHeaders ) return
            this.headerGridShowing = true
        },
        hideHeaderGrid() {
            this.headerGridShowing = false
            
        }
    },
    computed: {
        groupHeaderStyle() {
            return {
                backgroundColor: `#${this.$store.state.theme.accentColor}`
            }
        }
    }
}
</script>

<style scoped>

.group-list-view {
    height: 100%;
    width: 100%;
    overflow: auto;
    position: relative;
}

.header-grid {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: space-evenly;
    align-content: center;
}

.header-button {
    width: 1em;
    height: 1em;
    font-size: 48px;  
    font-weight: bold;  
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: horizontal;
    justify-content: center;
    align-items: center;
    -webkit-user-select: none;
    transition: all .1s ease;
    margin: 8px;
}

.list-item {
  white-space: nowrap;
  -webkit-user-select: none;
}


</style>
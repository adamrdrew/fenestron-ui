var componentNames = [
    "AppBarSeperator",
    "AppBarButton",
    "BlurPanel",
    "CommandBar",
    "Grid",
    "GroupedListView",
    "LayerPanel",
    "PaneButton",
    "ParallaxPanel",
    "Pivot",
    "PivotItem",
    "PivotContent",
    "SplitView",
    "StackPanel",
    "TabView",
    "TitleBar"
]

for (var componentName in componentNames) {
    import component from `@/components/${componentName}.vue`
    Vue.component(componentName, component)
}

/*
import AppBarSeperator from '@/zamel/components/AppBarSeperator.vue'
import AppBarButton from '@/zamel/components/AppBarButton.vue'
import CommandBar from '@/zamel/components/CommandBar.vue'
import TabView from '@/zamel/components/TabView.vue'
import GroupedListView from '@/zamel/components/GroupedListView.vue'
import BlurPanel from '@/zamel/components/BlurPanel.vue'
import Grid from '@/zamel/components/Grid.vue'
import LayerPanel from '@/zamel/components/LayerPanel.vue'
import PaneButton from '@/zamel/components/PaneButton.vue'
import ParallaxPanel from '@/zamel/components/ParallaxPanel.vue'
import Pivot from '@/zamel/components/Pivot.vue'
import PivotItem from '@/zamel/components/PivotItem.vue'
import PivotContent from '@/zamel/components/PivotContent.vue'
import SplitView from '@/zamel/components/SplitView.vue'
import StackPanel from '@/zamel/components/StackPanel.vue'
import TitleBar from '@/zamel/components/TitleBar.vue'

Vue.component("AppBarSeperator", AppBarSeperator)
Vue.component("AppBarButton", AppBarButton)
Vue.component("CommandBar", CommandBar)
Vue.component("GroupedListView", GroupedListView)

Vue.component("BlurPanel", BlurPanel)
Vue.component("Grid", Grid)
Vue.component("LayerPanel", LayerPanel)
Vue.component("StackPanel", StackPanel)
Vue.component("PaneButton", PaneButton)
Vue.component("ParallaxPanel", ParallaxPanel)
Vue.component("Pivot", Pivot)
Vue.component("PivotItem", PivotItem)
Vue.component("PivotContent", PivotContent)
Vue.component("SplitView", SplitView)
Vue.component("StackPanel", StackPanel)
Vue.component("TitleBar", TitleBar)

Vue.component("TabView", TabView)
*/
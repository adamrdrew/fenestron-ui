# Fenestron UI
A UI component framework inspired by Microsoft's XAML and UWP. Fenestron UI tries to provide a similar component set, layout, and styling to XAML and UWP. 

Fenestron UI is part of the Fenestron project. The goal of Fenestron is to allow developers to create Electron apps that have a look and feel that is as close to native as possible on Windows 10. If you are looking for a component framework to build web apps with then these probably aren't the droids you are looking for. If you are looking to build Windows 10 apps with Electron then we suggest you head on over to the Fenestron repo and get started there.

<!-- vscode-markdown-toc -->
* 1. [Layout and Sizing](#LayoutandSizing)
* 2. [Components](#Components)
	* 2.1. [TitleBar](#TitleBar)
		* 2.1.1. [Example](#Example)
		* 2.1.2. [Props](#Props)
	* 2.2. [Grid](#Grid)
		* 2.2.1. [Example](#Example-1)
		* 2.2.2. [Props](#Props-1)
	* 2.3. [StackPanel](#StackPanel)
		* 2.3.1. [Props](#Props-1)
	* 2.4. [SplitView](#SplitView)
		* 2.4.1. [Inline Example](#InlineExample)
	* 2.5. [Overlay Example](#OverlayExample)
		* 2.5.1. [Props](#Props-1)
* 3. [PaneButton](#PaneButton)
		* 3.1. [Props](#Props-1)
	* 3.1. [BlurPanel](#BlurPanel)
	* 3.2. [LayerPanel](#LayerPanel)
		* 3.2.1. [Example: Modal-Like](#Example:Modal-Like)
		* 3.2.2. [Example: Top Panel](#Example:TopPanel)
		* 3.2.3. [Example: Bottom Panel](#Example:BottomPanel)
		* 3.2.4. [Example: Picture In Picture](#Example:PictureInPicture)
		* 3.2.5. [Props](#Props-1)
	* 3.3. [Pivot, PivotItem, & PivotContent](#PivotPivotItemPivotContent)
		* 3.3.1. [Example:](#Example:)
		* 3.3.2. [Props](#Props-1)
	* 3.4. [ParallexPanel](#ParallexPanel)
	* 3.5. [GroupedList](#GroupedList)
		* 3.5.1. [Example:](#Example:-1)
		* 3.5.2. [Example with Item Template](#ExamplewithItemTemplate)
	* 3.6. [CommandBar, AppBarButton, & AppBarSeperator](#CommandBarAppBarButtonAppBarSeperator)
		* 3.6.1. [Example:](#Example:-1)
		* 3.6.2. [Props](#Props-1)
		* 3.6.3. [CommandBar Slots](#CommandBarSlots)
* 4. [TabView](#TabView)
	* 4.1. [Data Model and Custom Item Properties](#DataModelandCustomItemProperties)
	* 4.2. [Selected Item ID v-model](#SelectedItemIDv-model)
	* 4.3. [Active vs Suspended Background Mode](#ActivevsSuspendedBackgroundMode)
	* 4.4. [Content Slot and Slot Props](#ContentSlotandSlotProps)
	* 4.5. [Item Mutability](#ItemMutability)
	* 4.6. [Drag and Drop Reordering](#DragandDropReordering)
* 5. [Tab Close Button](#TabCloseButton)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='LayoutandSizing'></a>Layout and Sizing
Fenestron's layout and sizing systems are inspired by XAML's rather than HTML's. This means that containers size themselves to fill up the maximum amount of space available to them rather than sizing themselves based on their content. A `<div>` with a few words in it will only take up the space required for its content. In Fenestron a `BlurPanel` or `LayerPanel` etc will size itelf to occupy the entire spce it finds itself in. This means that for the vast majority of layouts you will not have to think about manually sizing or positioning elements. When you do need to size and position elements, such as with the grid templates in `Grid` or the foregroud panel layout of `LayerPanel` you will do so through props on the components rather than CSS. This approach makes constructing familiar UIs simple and largely hassle free. 

##  2. <a name='Components'></a>Components

###  2.1. <a name='TitleBar'></a>TitleBar
Creates a window title bar that matches the Windows 10 UWP app style. Presents the expected native behavior including maximize/unmaximize, close, minimize, and window dragging. Has a space for the app's title, and implements a back button. Icons are taken from Office Fabric ensuring they represent Microsoft designs.

The back button uses the browser engine's History system, just like a back button in a browser. Combined with Vue Router and a clean SPA app design this can do a great job emulating native back button behavior.

To use TitleBar make sure `frame` is set to `false` in the window's `BrowserWindow` constructor in your Electron app's main process setup code. I also recommend you disable the in app menu bar:

```javascript
  win = new BrowserWindow({ 
    width: 1000, 
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true
  } })

  win.setMenuBarVisibility(false)
```

####  2.1.1. <a name='Example'></a>Example
```vue
<template lang="pug">
.frame
  TitleBar(:back-button="true", title="Title Bar Example")
  Grid
</template>
```
![TitleBar Example](docs/images/titleBarExample.png?raw=true)

####  2.1.2. <a name='Props'></a>Props
| Name | Type | Default | Description
|-|-|-|-
| `title` | String | "My Great App" | The title displayed 
| `back-button` | Boolean | `false` | Display the back button in the upper-right

###  2.2. <a name='Grid'></a>Grid
Grid based layout component. Designed to make it easy to create app page layouts.

####  2.2.1. <a name='Example-1'></a>Example
Use 2 grids to create a layout with a header, content section, and footer with the content divided into left and right panels.
```vue
<template lang="pug">
Grid(rows="3" :row-definitions='["4em", "auto", "4em"]')
  div(style="background-color: pink;") Header
  Grid(columns="2", :column-definitions='["10em", "auto"]')
    div(style="background-color: red;") Left Panel
    div(style="background-color: orange;") Right Panel
  div(style="background-color: purple;") Footer
</template>
```
![Grid Example](docs/images/gridExample.png?raw=true)

####  2.2.2. <a name='Props-1'></a>Props
| Name | Type | Default | Description
|-|-|-|-
| `width-percent` | Number | 100 | Width of the grid in percent of parent
| `height-percent` | Number | 100 | Height of the grid in percent of parent
| `columns` | Number | 0 | Number of columns
| `rows` | Number | 0 | Number of rows
| `column-definitions` | Array | [] | Array of column width definitions. Use any valid CSS units. Use `auto` to fill available remaining space. `em` is recomended.
| `row-definitions` | Array | [] | Array of row height definitions. Use any valid CSS units. Use `auto` to fill available remaining space. `em` is recomended.

###  2.3. <a name='StackPanel'></a>StackPanel
A panel that arranges items in row, horizontally or vertically. Has the ability to scroll, wrap, and to combine the two. Can be styled with a background color and an opacity.

```vue
<template lang="pug">
Grid(rows="3" :row-definitions='["4em", "auto", "4em"]')
  div(style="background-color: pink;") Header
  Grid(columns="2", :column-definitions='["10em", "auto"]')
    StackPanel(:scroll="true")
      div(v-for="i in new Array(100)") Entry
    StackPanel(:scroll="true", orientation="horizontal", wrap="wrap")
      div(v-for="i in new Array(100)") Entry
  div(style="background-color: purple;") Footer
</template>
```
![StackPanel Example](docs/images/stackPanelExample.png?raw=true)

####  2.3.1. <a name='Props-1'></a>Props
| Name | Type | Default | Description
|-|-|-|-
| `width-percent` | Number | 100 | Width of the grid in percent of parent
| `height-percent` | Number | 100 | Height of the grid in percent of parent
| `scroll` | Boolean | `false` | Turns on scrolling. Scrolling direction will depend on the orientation
| `orientation` | String | `"vertical"` | Controls the direction that the children stack, wrap, and scroll
| `wrap` | String | `"no-wrap"` | Defines the content wrap behavior. Values are valid flex-box wrap values: `wrap`, `no-wrap`, `wrap-reverse`
| `opacity` | Number | `1.0` | The opacity of the panle
| `rgb` | String | `255,255,255` | The background color for the panel, defined in RGB. Must be a string of RGB values, comma seperated.

###  2.4. <a name='SplitView'></a>SplitView
Provides the familiar Windows 10 SplitView "side bar" seen in apps like Groove, Mail, Todo, etc. 

SplitView has two display modes: inline and overlay. Inline mode shows the content and pane next to each other with the content resizing and reflowing based on the pane being opened or closed. Overlay displays the pane over the content with the content size and flow never changing. Inline mode has a solid background color. Overlay mode implements acrylic, showing the content underneath and bluring it generously. Inline is the default.

####  2.4.1. <a name='InlineExample'></a>Inline Example
```vue
<template lang="pug">
  SplitView(:pane-open="paneOpen")
    template(v-slot:pane)
      PaneButton(:pane-open="paneOpen", icon="GlobalNavButton", @click="paneOpen = !paneOpen", style="padding-top: 2em;")
      PaneButton(:pane-open="paneOpen", icon="DietPlanNotebook", title="Notebooks")
      PaneButton(:pane-open="paneOpen", icon="BulkUpload", title="Lists")
    template(v-slot:content)
      ...
</template>
```
![SplitView Example](docs/images/splitViewExample.png?raw=true)

###  2.5. <a name='OverlayExample'></a>Overlay Example
```vue
<template lang="pug">
  SplitView(:pane-open="paneOpen", display-mode="overlay")
    template(v-slot:pane)
      PaneButton(:pane-open="paneOpen", icon="GlobalNavButton", @click="paneOpen = !paneOpen", style="padding-top: 2em;")
      PaneButton(:pane-open="paneOpen", icon="DietPlanNotebook", title="Notebooks")
      PaneButton(:pane-open="paneOpen", icon="BulkUpload", title="Lists")
    template(v-slot:content)
      ...
</template>
```
![SplitView Example](docs/images/splitViewOverlayExample.png?raw=true)

SplitView provides 2 named slots: `pane` and `content` for the left and right sides respectively. The pane can be opened and closed by mutating the `pane-open` prop. The open and closed sizes of the `pane` are controlled by the `open-width` and `compact-width` props, with defaults set to match Windows 10 defaults. 

The `content` slot can be used for the rest of the content in your app. For a SPA experience putting `router-view` in the `content` slot works very well. 

The `pane` slot works best with controls designed for it such as `PaneButton`.

The `content` slot will scroll overflowed content. 

Setting the `title-bar-offset` prop to `true` will offset the content area by the height of the titlebar. This is implemented inconsistently in Microsoft's Windows 10 apps: some apps have a title bar offset from the content, and in others the two run into eachother. SplitView gives you the option to do what you want.

####  2.5.1. <a name='Props-1'></a>Props
| Name | Type | Default | Description
|-|-|-|-
| `open-width` | String | 23em | How wide the pane is when open
| `closed-width` | String | 3.2em | How wide the pane is when closed
| `pane-open` | Boolean | `true` | Controls whether the pane is open or closed
| `pane-background` | String | `#e1e1e1` | Pane background color
| `title-bar-offset` | Boolean | `false` | Offset the top of the content area by the size of the TitleBar
| `display-mode` | String | `"inline"` | `"inline"` puts pane and content side by side. `"overlay"` puts pane over content with acrylic.

##  3. <a name='PaneButton'></a>PaneButton
Button designed to work in the SplitView's Pane. Has an icon on the left and can be collapsed to only show the icon. Emits a `click` event.

PaneButton provides easy VueRouter navigation via the `navigate` prop. Setting `navigate` to the name of a route will cause the button to perform a VueRouter navigate to the named route on click. A PaneButton with a `navigate` prop will still emit `click` when clicked.

```vue
<template lang="pug">
  SplitView(:pane-open="paneOpen")
    template(v-slot:pane)
      PaneButton(:pane-open="paneOpen", icon="GlobalNavButton", @click="paneOpen = !paneOpen", style="padding-top: 2em;" title="")
      PaneButton(:use-accent-color="true", :pane-open="paneOpen", icon="DietPlanNotebook", title="Demo Page 1", navigate="pageOne")
      PaneButton(:pane-open="paneOpen", icon="BulkUpload", title="Demo Page 2", navigate="pageTwo")
    template(v-slot:content)
      h1 Right
</template>
```
![SplitView Example](docs/images/splitViewAccentColorExample.png?raw=true)

####  3.1. <a name='Props-1'></a>Props
| Name | Type | Default | Description
|-|-|-|-
| `icon`      | String | `"GlobalNavButton"` | The icon for the button. Appears on the left and remains even when the pane is closed. Takes a [Fabric Icon](https://developer.microsoft.com/en-us/fabric#/styles/web/icons) name with no prefixes.
| `title`     | String | `"Button"` | The label to the right of the icon. Hidden when the pane is closed.
| `pane-open` | Boolean| `true` | Sets whether the pane that contains the button is open or closed. When open the icon and the title are visible; when closed just the icon.
| `highlight` | Boolean| `false` | Background is highlighted on mouseover
| `navigate`  | String | `NoNavigationConfigured` | Must be the `name` property of a route. If set to a value other than the default will navgiate to the provded route name.
| `use-accent-color` | Boolean | `false` | If true the icon will use the system's accent color
| `active` | Boolean | `false` | If true show a thin border on the left side using the system's accent color. Useful if indicating that the currently loaded page is the page for this button.

###  3.1. <a name='BlurPanel'></a>BlurPanel
An extended StackPanel that implements an acryllic look. Blurs the background of whatever is behind it and adds a subtle drop shadow. Has all of the same props as StackPanel because it inherits from it but extends it with a new `blurSize` prop.

| Name | Type | Default | Description
|-|-|-|-
| `width-percent` | Number | 100 | Width of the grid in percent of parent
| `height-percent` | Number | 100 | Height of the grid in percent of parent
| `scroll` | Boolean | `false` | Turns on scrolling. Scrolling direction will depend on the orientation
| `orientation` | String | `"vertical"` | Controls the direction that the children stack, wrap, and scroll
| `wrap` | String | `"no-wrap"` | Defines the content wrap behavior. Values are valid flex-box wrap values: `wrap`, `no-wrap`, `wrap-reverse`
| `opacity` | Number | `1.0` | The opacity of the panle
| `rgb` | String | `255,255,255` | The background color for the panel, defined in RGB. Must be a string of RGB values, comma seperated.
| `blur-size` | Number | `1` | The blur size in pixels

```vue
<template lang="pug">
LayerPanel(fg-height="5em", fg-top="0")
    template(v-slot:background)
        StackPanel(:scroll="true")
            div(v-for="i in new Array(100)") Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot. Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot.
    template(v-slot:foreground)
        BlurPanel(rgb="255,255,255", :blur-size="3", :opacity="0.5") This is BlurPanel Content
</template>
```

![BlurPanel Example](docs/images/blurPanelExample.png?raw=true)

###  3.2. <a name='LayerPanel'></a>LayerPanel
Allows you to arrange content in 2 layers: foreground and background. Useful when you want to display some content over some other content. Effective when combined with BlurPanel so that the background layer is seen through and blurred by the foreground layer.

The background layer is essentially a pass-through; placing content in the background layer is like placing it in an empty 100%x100% div with no whitespace. There are no special props or options for the background layer. You probably want to put some more capable container in it such as a Grid or StackPanel.

The foreground layer's layout and size can be controlled via the 6 `fg-*` props that LayerPanel exposes. Most of the time you are not going to want to obscure the entire background with the entire foreground. Instead, you are likely going to want to create panels that obscure only parts of the background. These positioning props let you set the size and position of the foreground layer so that it doesn't obscure the entire background.

Layers are added as named slots: `foreground` and `background`.

LayerPanel is very flexible. You can create all kinds of different layouts with it, so multiple examples are shown.

####  3.2.1. <a name='Example:Modal-Like'></a>Example: Modal-Like
```pug
LayerPanel(fg-height="10em", fg-left="5em", fg-right="5em", fg-width="auto", fg-top="30%")
    template(v-slot:background)
        StackPanel(:scroll="true")
            div(v-for="i in new Array(100)") Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot. Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot.
    template(v-slot:foreground)
        BlurPanel(rgb="30,30,30", :blur-size="3", :opacity="0.5") This is BlurPanel Content
```
![LayerPanel Example](docs/images/layerPanelExampleOne.png?raw=true)

####  3.2.2. <a name='Example:TopPanel'></a>Example: Top Panel
```pug
LayerPanel(fg-height="5em")
    template(v-slot:background)
        StackPanel(:scroll="true")
            div(v-for="i in new Array(100)") Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot. Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot.
    template(v-slot:foreground)
        BlurPanel(rgb="30,30,30", :blur-size="3", :opacity="0.5") This is BlurPanel Content
```
![LayerPanel Example](docs/images/layerPanelExampleTwo.png?raw=true)

####  3.2.3. <a name='Example:BottomPanel'></a>Example: Bottom Panel
```pug
LayerPanel(fg-height="5em", fg-bottom="0", fg-top="auto")
    template(v-slot:background)
        StackPanel(:scroll="true")
            div(v-for="i in new Array(100)") Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot. Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot.
    template(v-slot:foreground)
        BlurPanel(rgb="30,30,30", :blur-size="3", :opacity="0.5") This is BlurPanel Content
```
![LayerPanel Example](docs/images/layerPanelExampleThree.png?raw=true)

####  3.2.4. <a name='Example:PictureInPicture'></a>Example: Picture In Picture
```pug
LayerPanel(fg-width="10em", fg-height="10em", fg-top="2em", fg-left="auto", fg-right="2em")
    template(v-slot:background)
        StackPanel(:scroll="true")
            div(v-for="i in new Array(100)") Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot. Lorem ipsum dolomor sit amet. Quesio esto el etat sinder quadrato abat domot.
    template(v-slot:foreground)
        BlurPanel(rgb="30,30,30", :blur-size="3", :opacity="0.5") This is BlurPanel Content
```
![LayerPanel Example](docs/images/layerPanelExampleFour.png?raw=true)

####  3.2.5. <a name='Props-1'></a>Props
All LayerPanel props have the same type and work the same way so they're listed here as a list instead of a table. All of the `fg-*` props are strings and all accept valid CSS values for measurements, such as exact units, percentages, and even calc.
* `fg-width`
* `fg-height`
* `fg-top`
* `fg-bottom`
* `fg-right`
* `fg-left`

###  3.3. <a name='PivotPivotItemPivotContent'></a>Pivot, PivotItem, & PivotContent
Shows child content containers in a tabbed interface. Pivot works together with PivotItem and PivotContent to provide a complete tagged UI without any code.

Pivot gives you a lot of functionality without requiring that you write any methods, but it requires that you nest and arrange your components correctly. All of the PivotItems need to go in the `items` slot and the PivotContents need to go in the `content` slot. Each PivotContent and PivotItem pair need to share the same `tab-id` prop value.

We recommend that you next Page components in your PivotContents rather than build UI directly in them, but the example below shows both approaches.

####  3.3.1. <a name='Example:'></a>Example:
```vue
Pivot(default-tab-id="allEmail")
    template(#items)
        PivotItem(label="All", tab-id="allEmail")
        PivotItem(label="Unread", tab-id="unreadEmail")
        PivotItem(label="Junk", tab-id="junkEmail") 
    template(#content)
        PivotContent(tab-id="allEmail")
            h1 Hi from adam
        PivotContent(tab-id="unreadEmail")
            DemoPageTwo
        PivotContent(tab-id="junkEmail")
            DemoPageOne
```
![Pivot Example](docs/images/pivotExample.png?raw=true)

####  3.3.2. <a name='Props-1'></a>Props
| Component | Prop | Type | Default | Description
|-|-|-|-|-|
Pivot | `default-tab-id` | String | N/A | The ID of the default tab to show
PivotItem | `label` | String | N/A | The text to display in the tab button
|PivotItem| `tab-id` | String | N/A | The ID of the tab to show. Maps to a corresponding PivotContent
|PivotContent| `tab-id` | String | N/A | The ID of the tab content. Maps to corresponding PivotItem

###  3.4. <a name='ParallexPanel'></a>ParallexPanel
A panel with a background image and a parallax scrolling effect. A blur effect can optionally be applied to the background image.

```vue
<template lang="pug">
Grid(rows="2" :row-definitions='["20em", "auto"]')
    ParallaxPanel(:background-image="image", :blur="true", blurSize="5px", )
        h3(v-for="i in new Array(50)", style="color: white;") Lorem ipsum dolomor sit amet.Lorem ipsum dolomor sit amet.Lorem ipsum dolomor sit 
    ParallaxPanel(:background-image="imageTwo", :blur="false" )
        h3(v-for="i in new Array(50)", style="color: white;") Lorem ipsum dolomor sit amet.Lorem ipsum dolomor sit amet.Lorem ipsum dolomor sit 
</template>
<script>
export default {
    data:() => ({
        image: require("@/assets/ziggy.jpg"),
        imageTwo: require("@/assets/raleigh.jpg")
    }) 
}
</script>
```
![ParallaxPanel Example](docs/images/parallaxPanelExample.png?raw=true)

###  3.5. <a name='GroupedList'></a>GroupedList
Displays a list of items with headers. Both the headers and items are clickable. Clicking an item emits an `item-clicked` event. Clicking a header hides the items and shows a grid of just the headers. Clicking on a header in the grid returns to the list and scrolls to the items for the header clicked. 

GroupedList needs to be provided with both the items and the headers, and doesn't do anything fancy like sort your headers or items, or determine headers from the data. It will display whatever you provide it in whatever order your provided it. This means you will likely need to do some work to get your list data in the right format for GroupedList but it ensures you have total control over the process and makes the headers very flexible. You could use numbers, letters, states or provinces, codes, or whatever else your data requires.

GroupedList uses transition animations for showing and hiding both the list and the header grid. The default transition animations consist of interlocking zooms in and out. You can change these via props, or omit them all-together.

Items are rendered via the default slot. The default slot has fallback content, meaning if you provide no slot template a simple list of headings will be rendered. Using the slot you can create any kind of custom UI you want for your list. The slot has `item` bound as a slot prop. This means that the item is in scope for your slot template so you can access any data on the items you want from your template.

####  3.5.1. <a name='Example:-1'></a>Example: 

```vue
<template>
  Grid(rows="2", columns="1", :row-definitions='["10%", "90%"]')
      StackPanel
          h1 Artists
      GroupedListView(:items-source="artists", @item-click="itemClicked")
<template>
```

| Items | Headers |
|-      |-        |
| ![GroupedListView Example 1](docs/images/groupedListViewExampleOne.png?raw=true) | ![GroupedListView Example 2](docs/images/groupedListViewExampleTwo.png?raw=true) |

####  3.5.2. <a name='ExamplewithItemTemplate'></a>Example with Item Template

```vue
<template>
    Grid(rows="2", columns="1", :row-definitions='["10%", "90%"]')
        StackPanel
            h1 Artists
        GroupedListView(v-slot="slotProps", :items-source="artists", @item-click="itemClicked")
            div(style="border-style: solid; border-width: 1px; border-color: pink; color: white;") {{ slotProps.item.content }}
<template>
```
![GroupedListView Example 2](docs/images/groupedListViewExampleThree.png?raw=true) |

###  3.6. <a name='CommandBarAppBarButtonAppBarSeperator'></a>CommandBar, AppBarButton, & AppBarSeperator
CommandBar presents important and useful commands to the user. It is displayed as a bar filled with buttons that sticks to either the top or the bottom of the current page with the option to auto-hide. CommandBar exposes two named slots for primary and secondary commands. Primary commands are pulled to the left of the bar and secondary on the right. You could technically put any component in CommandBar's slots but Fenestron comes with components that are intended for use in CommandBar: AppBarButton and AppBarSeperator. Because these components are almost always used together they'll all be detailed in this section.

####  3.6.1. <a name='Example:-1'></a>Example:
The following example shows two CommandBar configurations: top of the screen with auto-hide and bottom of the screen withiout auto-hide. A Grid splits the view into 2 sections each with a different CommandBar.

```
Grid(rows="2", columns="1", :row-definitions='["50%","50%"]')
    StackPanel(:scroll="true")
        CommandBar(:auto-hide="true")
            template(#primary-commands)
                AppBarButton(title="Nope", icon="OfflineOneDriveParachuteDisabled")
        | {{ artistInfo }}
    StackPanel(:scroll="true")
        CommandBar(:bottom="true")
            template(#primary-commands)
                AppBarButton(title="Reload", icon="History", :show-title="false", @click="doSomething")
                AppBarButton(title="Update", icon="ArrangeBringForward", @click="click")
                AppBarButton(title="Config", icon="ATPLogo")
                AppBarSeperator
                AppBarButton(title="Drinks", icon="Coffee")
            template(#secondary-commands)
                AppBarButton(title="More", icon="ContextMenu")
        | {{ artistInfo }}
```

![CommandBar Example 2](docs/images/commandBarExample.png?raw=true)

Notice that the top CommandBar in the example is collapsed - that is due to the auto-hide prop. If the user mouses-over the collapsed CommandBar it would expand to full size just like the bottom example. On mouse out it will collapse again after a delay. 

What the images don't show is how CommandBar handles scrolling and content flow. The scroll and content flow behavior is complex and hard to describe; it is recomended that you try CommandBar out to get a better feel for how it works. If the CommandBar is on the top then content in the same view will start after the CommandBar. In the example above the top CommandBar doesn't obscure the content at all. However, when the user scorlls the containing view the content will pass behind the CommandBar while the CommandBar sticks in its position. This makes it behave exactly like a page or window border. This also means that if auto-hide is enabled and the containing view is scrolled all the way to the top then showing the CommandBar will reflow and move the other content in the view around it. However, if the user is scrolled at all then showing the CommandBar will simply place it over the content. When the CommandBar is on the bottom however, it always obscures the content behind it even when at the starting scroll position. This means that when you use CommandBar on the bottom you will need to leave some space on the end of your page content if the user needs to scroll all the way to the bottom. In most cases you shouldn't have to but you can use a Grid to place your CommandBar in a different container if you are having trouble with your content flow around CommandBar.

A final note: you cannot put multiple CommandBar instances in the same container. Notice in the example that we used Grid to cut the page in half to produce two seperate containers and then used those for our examples. If you attempt to use two ComamndBar instances in the same container you will have layout problems. If you need 2 CommandBar instances then use a grid to sequester the bottom CommandBar into its own container. It is not recomended that you use multiple CommandBars at the same time because it may be visually confusing to the user and send unclear signals about what is important and what isn't, but if your app calls for it you can do it.

It is recomended you use AppBarButton and AppBarSeperator for your CommandBar children. AppBarSeperator just draws a 1px thin line and has no props or slots. AppBarButton displays both text and an icon with the option to omit the text. Any Microsoft Fabric Icon class can be affixed via the icon slot. 

AppBarButton emits a `click` event when clicked.

####  3.6.2. <a name='Props-1'></a>Props
| Component | Prop | Type | Default | Description
|-|-|-|-|-|
CommandBar  | `bottom` | Boolean | `false` | Puts the command bar at the bottom of the container
CommandBar | `auto-hide` | Boolean | `false` | Collapses the CommandBar automatically. Expands on mouse over.
ComamndBar | `hide-time-out` | Number | `500` | Time in milliseconds to wait before collapsing the CommandBar if `auto-hide` is one 
AppBarButton | `title` | String | `"Button"` | The title that displays under the icon
AppBarButton | `icon` | String | `"BuildQueue"` | A icon class from Microsoft Fabric Icons
AppBarButtons | `shot-title` | Boolean | `true` | If false the icon will be displayed without text under it


####  3.6.3. <a name='CommandBarSlots'></a>CommandBar Slots
* `primary-commands` - Slot for the most important buttons. Placed on the left side of the CommandBar
* `secondary-commands` - Slot for the less important buttons. Placed on the right side of the CommandBar.

##  4. <a name='TabView'></a>TabView
Presents a tabbed interface for switching between multiple different instances of a child component. TabView is a powerful component that provides many tab features including tab close buttons, drag and drop reordering, and two different background tab modes.

Due to TabView's richness its API is fairly complex. It presents many props and events and comes with a controller mixin. TabView also attempts to minimize the demands it puts on your data but at the cost of further configuraiton. If you wish to use TabView it is recommended that you read this entire TabView guide.

###  4.1. <a name='DataModelandCustomItemProperties'></a>Data Model and Custom Item Properties
TabView requires an array of objects to iterate over and create tabs for. The `item-source` prop is used for this array; we refer to the objects in this array as "items". By default TabView looks for the following properties of your items: `item.id`, `item.title`, `item.icon`. The id and title properties are required, icon is optional. 

However, to minimize the demands placed on your data model you can configure TabView to use different property names. The `id-property`, `title-property`, and `icon-property` String props can be used to change the properties of your items TabView looks for:

```vue
<template lang="pug">
TabView(
    :item-source="articles", 
    id-property="guid",
    title-property="headline",
    icon-property="thumbnail", 
    ...)
</template>
<script>
export default {
    data:() => ({
        articles: [
            {guid: 1234, headline: "Example of custom item properties", thumbnail: "/public/thumb.png"}
        ]
    })
}
</script>
```

###  4.2. <a name='SelectedItemIDv-model'></a>Selected Item ID v-model
TabView handles the work of showing and hiding the correct tab content based on the user's selection so you don't have to worry about doing that. However, it may still be useful for your code to know what item is active. You might want to send the selected ID to an API for recomendations of similar docs, or load associated data from another source by ID, etc. You can use `v-model` with TabView to keep a property on your component's data object updated with the ID of the selected item.

```vue
<template lang="pug">
TabView(:item-source="documents", v-model="activeDocumentID", ...)
</template>
<script>
export default {
    data: () => ({
        documents: [ ... ],
        activeDocumentID: ""
    })
}
</script>
```

###  4.3. <a name='ActivevsSuspendedBackgroundMode'></a>Active vs Suspended Background Mode

In active-background mode tab content for tabs that aren't currently selected continue to run in the background. They aren't visible, but they are still open and doing whatever it is they should be doing. Anything the application is allowed to do active-background tabs can also do. However, any code they are running that is looking for DOM elements or DOM changes may fail or act in unexpected ways.

In suspended-background mode tab content for tabs that aren't currently selected are removed from the component graph and deactived. They no longer execute and *any state they were holding is lost.* That last part is important. Anything that the component had in its local state that hasn't been comitted somewhere else will be lost. Because of this it is important make sure you save any content you may need to save before allowing the destroy operation to complete. You can either do this in the child component by implementing the `beforeDestroy` component life cycle hook, or in the parent component by handling the `before-destroy` event the child will emit just before it is destroyed.

Another important point to remember is that keys are required when using suspended-background mode. Keys are always a good idea when working with iteration generated components, but when working with suspended-background tabs they are required. If you do not implement keys you may observe strange behavior such as the states of multiple components seeming to "mix" or "blend" together.

A final background tab feature to be aware of is the `background` slot prop. You may want active background tabs but still want some features of your child component to turn off when in the beackground. You may want their state preserved and left open but you may want to suspend a long running operation for example. Your child component will be passed a `background` Boolean prop that you can watch and guard activity behind.

###  4.4. <a name='ContentSlotandSlotProps'></a>Content Slot and Slot Props
TabView creates and manages the tabs but it also handles showing and hiding your tab content. Your tab content will be dislplayed in a child component that you provide. For example, if your TabView is used in a text editor you might have a child component that models and presents the UI for a single document. Your tab content child content must be slotted into the TabView component via the `tab-content` named slot.

The `tab-content` slot provides some props to your child component. This is how your child component will get access to its item, have its unique ID key assigned, and be informed if it has been backgrounded:

```vue
<template lang="pug">
TabView(:item-source="webpages", ...)
    template(v-slot:tab-content="slotProps")
        WebPage(
            v-model="slotProps.item", 
            :key="slotProps.item.id", 
            :background="slotProps.background")
</template>
```
###  4.5. <a name='ItemMutability'></a>Item Mutability
You may have noticed that our items are being handed down through props. This makes them immuatable in your child components. If you intend for your tab content children to be able to write to your items this could be a problem. There are a few different ways you can handle this.

We don't recommend that the item source array contain your full content objects. For example, if you are writing a tabbed word processor we wouldn't advice that your item source array be filled with all of your documents. Rather we suggest you use the item source array as a collection of IDs and then have your child components load and manage the data they need.

That said, for some smaller apps that may be overkill and you may want to use your item source array as your entire data model. For example, maybe in a todo or sticky note app. In such a case you can either implement custom events in your child components and have your parent listen for them, or similarly implement v-model in your child components and then `v-model="slotProps.item"` instead of `:item="slotProps.item"`.

###  4.6. <a name='DragandDropReordering'></a>Drag and Drop Reordering
TabView provides drag and drop functionality for reordering tabs. Enabling drag and drop requires a combination of events and a mixin.

Fenestron includes the `TabController` mixin. You'll need to include this mixin in the component that houses your TabView.

Next, you'll need to make you TabView handle the `drag-and-drop` event and enable `can-drag`. The `drag-and-drop` event handler will call the `dragAndDrop` method provided by `TabController` and take two arguments, the event and your item colleciton. Along with that you need to enable drag and drop by setting `can-drag` to `true`. Example:

```vue
<template>
TabView(
    :item-source="webpages",
    :can-drag="true",
    @drag-and-drop="dragAndDrop($event, webpages)"
)
</template>
<script>
import TabController from `fenestron/TabController`
export default {
    mixins: [ TabController ],
    data: () => ({
        webpages: [ { ... } ... ]
    })
}
</script>
```
To be clear, you don't need to implement your own `dragAndDrop` method - it is provided by `TabController`. You just need to wire up the method to the event hander and provide it the event and your item colleciton.

##  5. <a name='TabCloseButton'></a>Tab Close Button
Implementing tab close buttons is almost exactly like implementing drag and drop. You include the `TabController` mixin, enable `can-close`, and then wire up the `tabCloseClicked` method to the `tab-close-clicked` method, handing it `$event` and your item collection:
```vue
<template>
TabView(
    :item-source="webpages",
    :can-close="true",
    @tab-close-clicked="tabCloseClicked($event, webpages)"
)
</template>
<script>
import TabController from `fenestron/TabController`
export default {
    mixins: [ TabController ],
    data: () => ({
        webpages: [ { ... } ... ]
    })
}
</script>
```

![TabView Example](docs/images/tabVieExample.png?raw=true)

```
Grid(rows="1", columns="2", :column-definitions="['50%', '50%']")
    StackPanel
        h1 Active Background Tabs
        p This demo shows tab content that remains active in the background. Start a counter and switch between tabs. The counter will keep running.
        TabView(
            :item-source="itemSelectionOne", 
            v-model="selectedActiveTabId", 
            :active-background="true",
            :canClose="true",
            :canDrag="true",
            @tab-close-clicked="tabCloseClicked($event, itemSelectionOne)"
            @drag-and-drop="dragAndDrop($event, itemSelectionOne)")
            template(v-slot:tab-content="slotProps")
                DemoTabContent(
                    :item="slotProps.item", 
                    :key="slotProps.item.id", 
                    :background="slotProps.background")
    StackPanel
        h1 Suspended Background Tabs
        p This demo shows tab content that is removed from the DOM when in the background. Any state or data not explicitely saved will be lost.
        TabView(:item-source="itemSelectionTwo", title-property="name", id-property="guid", v-model="selectedSuspendedTabID")
            template(v-slot:tab-content="slotProps")
                DemoTabContent(:item="slotProps.item", :key="slotProps.item.guid")
```
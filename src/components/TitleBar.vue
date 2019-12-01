<template lang="pug">
div.titleBar
    div.titleBarButton.theme-panel(v-if="backButton", @click="browserBack")
        i.ms-Icon.ms-Icon--Back   
    .spacer
         p.title {{ title }}
    div.titleBarButton.theme-panel(@click="minimize")
        i.ms-Icon.ms-Icon--ChromeMinimize
    div.titleBarButton.theme-panel(@click="maximizeOrUnmaximize")
        i.ms-Icon.ms-Icon--Checkbox
    div.titleBarButton.theme-panel.titleBarCloseButton(@click="close")
        i.ms-Icon.ms-Icon--ChromeClose
</template>

<script>
import electron from 'electron'

export default {
    props: {
        title: {
            type: String,
            default: "My Great App"
        },
        backButton: {
            type: Boolean,
            default: false
        }
    },
    data:() => ({
        window: electron.remote.getCurrentWindow()
    }),
    methods: {
        browserBack() {
            history.go(-1)
        },
        minimize() {
            this.window.minimize()
        },
        maximizeOrUnmaximize() {
             this.window.isMaximized() ? this.window.unmaximize() : this.window.maximize()
        },
        close() {
            this.window.close()
        }

    }
    
}
</script>

<style>
.titleBar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
}

.titleBar > p.title {
    padding: 0;
    margin: 0;
}
.titleBar > .spacer {
    flex-grow: 8;
    padding: 0;
    margin: 0;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: left;  
    -webkit-app-region: drag; 
    -webkit-user-select: none; 
    -webkit-app-region: drag;
}

.titleBar > .titleBarButton {
    font-size: 10px;
    width: 45px; 
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.titleBar > .titleBarButton:hover {
    background-color: lightgray;
}
.titleBar > .titleBarButton.titleBarCloseButton:hover {
    background-color: red;
    color: white;
}
</style>
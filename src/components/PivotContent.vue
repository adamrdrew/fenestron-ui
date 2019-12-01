<template lang="pug">
transition(name="page-slide-left")
    slot(v-if="this.$parent.activeTab === tabId")
</template>

<script>
export default {
    props: {
        tabId: String
    }
}
</script>
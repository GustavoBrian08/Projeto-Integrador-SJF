<template>
<div class="home d-flex">
    <slideBar />
    <Home />
</div>
</template>

<script>
import slideBar from '@/components/slideBar.vue'
import Home from '@/components/Home.vue';
export default {
    name: 'HomeView',
    components: {
        Home,
        slideBar
    }
}
</script>
<template>
  <div class="home d-flex bg-white">
    <slideBar />
    <Home />
  </div>
</template>

<script>
// @ is an alias to /src
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

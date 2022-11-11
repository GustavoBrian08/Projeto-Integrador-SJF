<template>
    <div class="Justificar d-flex bg-white">
      <slideBar />
      <JustificarFaltas />
    </div>
  </template>
  
  
  <script>
  import JustificarFaltas from '@/components/JustificarFaltas.vue';
  import slideBar from '@/components/slideBar.vue'

  export default{
    name: 'JustificarView',
    components: {
        JustificarFaltas,
        slideBar
    }
  }
  </script>
<template>
    <div class="Justificar bg-white">
      
      <JustificarFaltas />
    </div>
  </template>
  
  
  <script>
  import JustificarFaltas from '@/components/JustificarFaltas.vue';
  
  
  export default{
    name: 'JustificarView',
    components: {
        JustificarFaltas
    }
  }
  </script>
<template>
    <div class="Justificar">
      
      <JustificarFaltas />
    </div>
  </template>
  
  
  <script>
  import JustificarFaltas from '@/components/JustificarFaltas.vue';
  
  
  export default{
    name: 'CadastroView',
    components: {
        JustificarFaltas
    }
  }
  </script>
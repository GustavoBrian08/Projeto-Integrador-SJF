<template>
    <div class="historico">

      <HistoricoDeJustificativas />
    </div>
  </template>
  
  
  <script>

  import HistoricoDeJustificativas from '@/components/HistoricoDeJustificatias.vue';
  export default {
    name: 'historicoView',
    components: {
      HistoricoDeJustificativas
    }
  }
  </script>
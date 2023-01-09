<template>
    <div class="historico d-flex bg-white">
      <slideBar />
      <HistoricoDeJustificativas />
    </div>
  </template>
  
  
  <script>
  import slideBar from '@/components/slideBar.vue'
  import HistoricoDeJustificativas from '@/components/HistoricoDeJustificatias.vue';
  export default {
    name: 'historicoView',
    components: {
      HistoricoDeJustificativas,
      slideBar
    }
  }
  </script>
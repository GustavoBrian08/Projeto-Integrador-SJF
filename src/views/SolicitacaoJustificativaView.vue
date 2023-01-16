<template>
    <div class="SolicitacaoJustificativa d-flex bg-white">
      <slideBar />
      <SolicitacaoJustificativa />
    </div>
  </template>
  
  
 <script>
  import slideBar from '@/components/slideBar.vue'
  import SolicitacaoJustificativa from '@/components/SolicitacaoJustificativa.vue';

  export default{
    name: 'SolicitacaoJustificativaView',
    components: {
      SolicitacaoJustificativa,
        slideBar
    }
  }
</script>
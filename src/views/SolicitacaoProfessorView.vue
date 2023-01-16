<template>
    <div class="solicitacaoProfessores d-flex bg-white">
      <slideBar />
      <SolicitacaoProfessor />
    </div>
  </template>
  
  
  <script>
  import SolicitacaoProfessor from '@/components/SolicitacaoProfessor.vue'
  import slideBar from '@/components/slideBar.vue'

  export default{
    name: 'SolicitacaoProfessorView',
    components: {
      SolicitacaoProfessor,
        slideBar
    }
  }
  </script>
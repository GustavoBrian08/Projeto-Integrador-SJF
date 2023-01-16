<template>
    <div class="solicitacaoAlunos d-flex bg-white">
      <slideBar />
      <SolicitacaoAluno />
    </div>
  </template>
  
  
  <script>
  import SolicitacaoAluno from '@/components/SolicitacaoAluno.vue'
  import slideBar from '@/components/slideBar.vue'

  export default{
    name: 'SolicitacaoAlunoView',
    components: {
      SolicitacaoAluno,
        slideBar
    }
  }
  </script>
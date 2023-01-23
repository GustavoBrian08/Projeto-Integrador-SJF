<template>
  <div class="Turma d-flex bg-white">
    <slideBar />
    <Turma />
  </div>
</template>


<script>
import Turma from '@/components/Turma.vue';
import slideBar from '@/components/slideBar.vue'


export default{
  name: 'TurmaView',
  components: {
    Turma,
    slideBar
}
}

</script>

<template>
    <div class="container card rounded">
        <div class="card-body">
            <PrimeiroComponente />
            <Form />
        </div>
  </div>
</template>

<script>
    import PrimeiroComponente from './PrimeiroComponente.vue'
    import Form from './Form.vue'
    
    export default {
        name: 'Login',
        components: {
        PrimeiroComponente,
        Form
        }
    }
</script>

<style scoped>

    .color{
      color: rgb(105, 101, 105);
    }
    

    </style>
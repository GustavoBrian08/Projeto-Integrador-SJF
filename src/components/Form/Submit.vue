<template>
    <input type="submit" class="btn btn-success  mt-4 rounded-pill" value="Entrar">
    <router-link to="/cadastrar">
            <input type="submit" class="btn btn-success  mt-3 rounded-pill" value="Cadastra-se">
    </router-link>
</template>

<script>
    export default{
        name:'Submit'
    }
</script>

<style scoped>
    .btn{
      width: 70%;
      margin-left: 15%;
    }

</style>

<template>
    <div class="d-flex justify-content-evenly mt-4 mb-4">
        <div class="cento">
            <h1 style="margin:0%;">SJF</h1>
            <p style="margin:0%;">sistema de</p>
            <p style="margin:0%;">justificação</p>
            <p>de faltas</p>
        </div>
        <img src="@/assets/ifpiLogo.png" class="mt-2" style="width: 125px; height: 110px;" alt="logo">
    </div>
</template>

<script>
    export default {
        name: 'PrimeiroComponente',
    data() {
        return{
            nome: 'Cadu',
            profissão: 'Programador'
        }
    }
}
</script>

<style>
    .cento{
        text-align: center;
        font-family: 'Inder', sans-serif;
    }
</style>
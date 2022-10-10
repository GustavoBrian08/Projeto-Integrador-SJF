<template>
    <div class="logo">
        <img src="@/assets/ifpiLogo.png" alt="logo">
    </div>
    <div class="cento mt-4">
        <h1 style="margin:0%;">SJF</h1>
        <p style="margin:0%;">sistema de</p>
        <p style="margin:0%;">justificação</p>
        <p>de faltas</p>
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
    .logo{
        margin-top: 25px;
        width: 120px;
        float: right;
    }
    img{
        width: 100%;
    }
</style>
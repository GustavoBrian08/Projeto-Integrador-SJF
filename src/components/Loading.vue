<template>
    <div class="fundo" :style="display">
        <div class="text-center d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'Loading',
        props:{
            display: String,   
        }
    }
</script>

<style>
    .fundo{
        position: absolute;
        top: 0;
        bottom: 50%;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.247);
    }
</style>
<template>
  <router-view/>
</template>

<style>
  body{
    background: linear-gradient(90deg, rgba(70,70,70,1) 0%, rgba(73,72,72,1) 35%, rgba(43,43,43,1) 100%);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;

  }
  .container{
      width: 50%;
    }
    @media(max-width: 966px) {
      .container{
        width: 90%;
      }
    }
    .color{
      color: rgb(105, 101, 105);
    }
    .tamanho-button{
        margin-left: 6%;
        width: 40%;
    }
    h1{
        text-align: center;
    }
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<template>
    <div class="container card rounded">
        <div class="card-body">
            <PrimeiroComponente />
            <p class="alert alert-success" v-if="success" style="display: block"> Usuário cadastrado com sucesso</p>
            <Form />
        </div>
    </div>
    <Loading :display="loading" />
</template>

<script>
    import PrimeiroComponente from './PrimeiroComponente.vue'
    import Form from './Form.vue'
    import Loading from './Loading.vue'
    
    export default {
        name: 'Login',
        props:{
            display: String,   
        },
        components: {
            PrimeiroComponente,
            Form,
            Loading
        },data(){
            return{
                loading: 'display: none',
                success: false
            }
        },
        created(){
            this.success = localStorage.cadastro
            setTimeout(()=>{
                localStorage.clear()
                this.success = localStorage.cadastro
            },10000)
            // console.log(this.success)
            this.emitter.on('my-event', (evt) => {
                this.loading = evt.loading
            })
            this.emitter.on('alert-cadastro', (evt) => {
                console.log(evt)
                localStorage.setItem('cadastro', true)
                
            })
        }

    }
</script>

<style>

body{
    background: linear-gradient(90deg, rgba(70,70,70,1) 0%, rgba(73,72,72,1) 35%, rgba(43,43,43,1) 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
  }
    .color{
      color: rgb(105, 101, 105);
    }
    
    .alert{
        text-align: center;
    }
    

</style>
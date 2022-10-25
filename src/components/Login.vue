<template>
    <div class="container card rounded">
        <div class="card-body">
            <PrimeiroComponente />
            <p class="alert alert-success" v-if="success == 'display: block'" style="display: block"> Usuário cadastrado com sucesso</p>
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
                success: ''
            }
        },
        created(){
            console.log(this.success)
            this.emitter.on('my-event', (evt) => {
                this.loading = evt.loading
            })
            this.emitter.on('alert-cadastro', (evt) => {
                this.success = evt.success
                console.log(evt.success)
                setTimeout(()=>{
                    this.success = 'display: none'
                },7000)
            })
        }

    }
</script>

<style scoped>

    .color{
      color: rgb(105, 101, 105);
    }
    
    .alert{
        text-align: center;
    }
    

</style>
<template>
    <div class="container card rounded">
        <div class="card-body">
            <PrimeiroComponente />
            <div class="color">

                <h4><span class="fa fa-key"></span> Alterar Senha:</h4>
                <hr>
                <div>
                    <p class="alert alert-danger" :style="on">{{ msg }}</p>
                </div>
                <div>
                    <form>
                        <div class="bg-secondary d-flex flex-column justify-content-center rounded bg-opacity-10 p-4">
                            <label for="matricula" class="mb-2">Matricula:</label>
                            <input type="text" v-model="matricula" class="form-control" name="matricula" required>
                            <label for="senha" class="mb-2">Email:</label>
                            <input type="text" v-model="email" class="form-control" name="email" required>
                            <div style="display: flex; justify-content: center; align-items: center; margin: 10px;" class="g-recaptcha" data-sitekey="6LdPjBokAAAAAFIaOUnTsewB8I_j3Tk8BRE5Y6Fb"></div>
                        </div>
                        <div class="d-flex justify-content-around">
                            <router-link to="/">
                                <input type="submit" class="btn btn-success btn-lg mt-3" value="Voltar" >
                            </router-link>
                            <div>
                                <input type="submit" class="btn btn-success btn-lg mt-3" @click.prevent="recuperarSenha()" value="Enviar" >
                            </div>
                         </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import InputText from './Form/InputText.vue'
    import PrimeiroComponente from './PrimeiroComponente.vue'
    import InputSenha from './Form/InputSenha.vue'
    import Submit from './Form/Submit.vue'
    import app from './firebase/index'
    import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
    import { getFirestore, collection, query, where, getDocs,  } from "firebase/firestore";
    const db = getFirestore(app);
    export default{
        name:'mudarSenha',
        components:{
            InputText,
            InputSenha,
            Submit,
            PrimeiroComponente
        },
        data(){
            return {
                matricula: '',
                email: '',
                classe:'form-control',
                on:'display: none',
                msg:''
            }
        },
        methods: {
            async recuperarSenha(){
                const valida = this.valida()
                if (valida){
                    const auth = getAuth();
                    sendPasswordResetEmail(auth, this.email)
                    .then(() => {
                        // Password reset email sent!
                        // ..
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                    });
                }
            },
            valida(){
                if (grecaptcha.getResponse() == ''){
                    this.msg = 'Você precisa marcar a validação'
                    this.on = 'display: block'
                    setTimeout(()=>{
                        this.on = 'display: none'
                    },10000)
                    return false
                }else{
                    return true
                }
            }
        }
    }
</script>
<template>
    <div class="color">
        <h4><span class="fas fa-lock float"></span> Login:</h4>
        <hr>
        <div>
            <p class="alert alert-danger" :style="on">{{ msg }}</p>
        </div>
        <form action="" @submit.prevent="fazerLogin()" >
            <div>
                <InputText v-model="matriculaUsuario" :verificar="classe" />
                <label for="senha" class="mb-2">Senha:</label>
                <InputSenha v-model="senhaUsuario" :verificar="classe" />
            </div>
            <input class="form-check-input" type="checkbox"> Lembrar a senha?
            <div>
                <router-link to="/alterar-senha" class="link-dark">Esqueceu a senha?</router-link>
            </div>
            <div><Submit /></div>
        </form>
    </div>
    
</template>

<script>
    import InputText from './Form/InputText.vue'
    import InputSenha from './Form/InputSenha.vue'
    import Submit from './Form/Submit.vue'
    import app from './firebase/index'
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
    const db = getFirestore(app);
    const auth = getAuth(app);
    export default{
        name:'Form',
        components:{
            InputText,
            InputSenha,
            Submit
        },
        data(){
            return {
                senhaUsuario: '',
                matriculaUsuario: '',
                classe:'form-control',
                on:'display: none',
                msg:''
            }
        },
        methods: {
            async fazerLogin(){
                this.emitter.emit('my-event', {'loading': 'display: block'})
                let email;
                let isValidado
                const q = query(collection(db, "Usuarios"), where("matricula", "==", this.matriculaUsuario));
                const resultado = await getDocs(q);
                
                resultado.forEach((doc) => {
                    const matricula = doc.data().matricula
                    if (matricula == this.matriculaUsuario) {
                        email = doc.data().email
                        isValidado = doc.data().isValidado
                    }
                });
                if (!isValidado) {
                    this.matriculaUsuario = ''
                    this.senhaUsuario = ''
                    this.msg = 'Seu cadastro ainda não foi validado pelo coordenador'
                    this.on = 'display: block'
                    this.emitter.emit('my-event', {'loading': 'display: none'})
                    setTimeout(()=>{
                        this.classe = 'form-control'
                        this.on = 'display: none'
                    },10000)
                }else{
                    await signInWithEmailAndPassword(auth, email, this.senhaUsuario)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        this.$router.push({ name: "home" })
                        this.emitter.emit('my-event', {'loading': 'display: none'})
                    })
                    .catch((error) => {
                        this.msg = "Matrícula e/ou Senha incorretos"
                        this.classe = 'form-control is-invalid'
                        this.on = 'display: block'
                        this.emitter.emit('my-event', {'loading': 'display: none'})
                        setTimeout(()=>{
                            this.classe = 'form-control'
                            this.on = 'display: none'
                        },10000)
                    });
                }
            }
        }
    }
</script>
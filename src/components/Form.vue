<template>
    <div class="color">
        <h4><span class="fas fa-lock float"></span> Login:</h4>
        <hr>
        <form action="" @submit.prevent="fazerLogin()" >
            <div>
                <InputText v-model="matriculaUsuario" :verificar="class" />
                <label for="senha" class="mb-2">Senha:</label>
                <InputSenha v-model="senhaUsuario" :verificar="class" />
            </div>
            <input type="checkbox"> Lembrar a senha
            <div>
                <a href="#">Esqueceu a senha?</a>
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
                class:'form-control'
            }
        },
        methods: {
            async fazerLogin(){
                let email;
                const q = query(collection(db, "Usuarios"), where("matricula", "==", this.matriculaUsuario));
                const resultado = await getDocs(q);
                
                resultado.forEach((doc) => {
                    const matricula = doc.data().matricula
                    if (matricula == this.matriculaUsuario) {
                        email = doc.data().email
                    }
                });

                await signInWithEmailAndPassword(auth, email, this.senhaUsuario)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    this.class = 'form-control is-invalid'
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            }
        }
    }
</script>
<template>
    <div class="color">
        <h4><span class="fas fa-lock float"></span> Login:</h4>
        <hr>
        <form action="">
            <div><InputText :matricula="this.matricula" :value="this.senhaUsuario"/></div>
            <div><Submit/></div>
        </form>
    </div>
</template>

<script>
    import InputText from './Form/InputText.vue'
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
            Submit
        },
        data(){
            return {
                matricula: '',
                senhaUsuario: ''
            }
        },
        methods: {
            async fazerLogin(){
                const q = query(collection(db, "Usuarios"), where("email", "==", this.matricula));
                
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const email = doc.email;
                    return email;
                });

                signInWithEmailAndPassword(auth, email, this.senhaUsuario)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            }
        }
    }
</script>
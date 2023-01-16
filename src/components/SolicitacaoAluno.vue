<template>
    <div class="container d-flex justify-content-center align-items-center"> 
        <div id="cardSolicitacao" class="card rounded p-2 w-75 shadow-sm">
            <div class="d-flex flex-column card-body " style="max-height: 598px;">
                <h3 class="mb-4 d-flex justify-content-center">Solicitações de alunos</h3>
                <p class="alert alert-success" :style="success">Aluno aceito com sucesso!</p>
                <p class="alert alert-danger" :style="danger">{{msg}}</p>
                <div class="card-body shadow-sm p-3 mb-5 bg-body rounded overflow-auto">
                    <div id="solicitacaoAluno" v-for="u in users" :key="u.id" v-show="!u.user.isValidado" class="card mb-2 d-flex flex-row justify-content-around align-items-center">
                        <div class="d-flex flex-column p-2">
                            <p class="m-0">{{ u.user.nome }} </p>
                            <p>({{u.user.matricula}})</p>
                        </div>
                        <div id="btnSolicitacao" class="d-flex flex-column p-2">
                            <button @click="aceitar(u.id)" class="btn btn-success mb-2">Aceitar</button>
                            <button class="btn btn-danger" @click="apagar(u.id)">Recusar</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <Loading :display="loading" />
</template>


<script>
import app from './firebase/index'
import { doc, getFirestore, collection, query,updateDoc, onSnapshot, deleteDoc, increment ,arrayUnion, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, deleteUser  } from "firebase/auth";
import { useRouter } from 'vue-router';
const router = useRouter()
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;


    export default{
        name: "SolicitacaoAluno",
        data(){
            return{
                loading: 'display: none',
                success: 'display: none',
                danger: 'display: none',
                users: [],
                msg: ''
            }
        },
        methods:{
            async aceitar(id){
                this.loading = 'display: block'
                const userRef = doc(db, "Usuarios", id);
                await updateDoc(userRef, {
                    isValidado: true
                });
                this.success = 'display: block'
                this.loading = 'display: none'
                setTimeout(()=>{
                    this.success = 'display: none'
                },8000)
            },
            async apagar(id){
                this.loading = 'display: block'
                await deleteDoc(doc(db, "Usuarios", id));
                this.msg = 'Usuario foi deletado!'
                this.danger = 'display: block'
                this.loading = 'display: none'
                setTimeout(()=>{
                    this.danger = 'display: none'
                },8000)
            },
            unsubscribe(){
                onSnapshot(collection(db, "Usuarios"), () => {
                // Respond to data
                // ...
                });
            }
        },
        async created(){
            const q = query(collection(db, "Usuarios"), where("isValidado", "==", false), where ("isAluno" , "==", 2));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            this.users = []
            querySnapshot.forEach((doc) => {
                this.users.push({id: doc.id,user: doc.data()})
            });
            });
            this.unsubscribe()
        }
    }
</script>


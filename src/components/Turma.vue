<template>
    <div class="container d-flex justify-content-center align-items-center"> 
        <a href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Criar Turma</a>
        <div v-for="list in listaTurma" :key="list.id" @click="pegarID(list.id)" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" class="card rounded p-2 m-3" style="cursor: pointer;">
            <div class="d-flex flex-column card-body">
                <p>{{ list.turma.nome }}</p>
                <p>{{ list.turma.modulo }} modulo</p>
            </div>
        </div>
    </div>

<!-- modal de criar turma -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Criar turma</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <label for="nome">Nome da turma:</label>
            <input type="text" v-model="turma.nome" class="form-control" name="nome" required>
            <label for="modulo">Módulo/Ano:</label>
            <input type="text" v-model="turma.modulo" class="form-control" name="modulo" required>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" @click="criarTurma()" data-bs-dismiss="modal" class="btn btn-primary">Criar</button>
      </div>
    </div>
  </div>
</div>
<!-- fim do modal de criar turma -->
<!-- modal de adicionar professor e aluno -->
<div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h1 class="modal-title fs-5" id="staticBackdropLabel1">Criar turma</h1> -->
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <label for="nome">Adicionar professores:</label>
            <div class="d-flex card mt-2 flex-column justify-content-around">
                <span class="ms-2" v-for="aluno in alunoAll" :key="aluno.id" v-show="!aluno.user.turma">{{ aluno.user.nome }} ({{ aluno.user.matricula }}) <button @click.prevent="adicionar(aluno.id)" class="btn btn-primary m-2">Adicionar</button></span>
            </div>
            <label for="modulo">Adicionar alunos</label>
            <div class="d-flex card mt-2 flex-column justify-content-around">
                <span class="ms-2" v-for="professor in profAll" :key="professor.id" v-show="!professor.user.turma">{{ professor.user.nome }} ({{ professor.user.matricula }}) <button @click.prevent="adicionar(professor.id)" class="btn btn-primary m-2">Adicionar</button></span>
            </div>
        </form>
        <label for="modulo">Professores na turma</label>
        <hr>
            <div class="d-flex card mt-2 flex-column justify-content-around">
                <span class="ms-2" v-for="professor in profAll" :key="professor.id" v-show="professor.user.turma == idTurma">{{ professor.user.nome }} ({{ professor.user.matricula }})</span>
            </div>
        <label for="modulo">Alunos na turma</label>
        <hr>
        <div class="d-flex card mt-2 flex-column justify-content-around">
                <span class="ms-2" v-for="aluno in alunoAll" :key="aluno.id" v-show="aluno.user.turma == idTurma">{{ aluno.user.nome }} ({{ aluno.user.matricula }}) </span>
            </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import app from './firebase/index'
import { doc, getFirestore, collection, getDoc, query,updateDoc,onSnapshot, increment ,arrayUnion, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from './Loading.vue';
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;



    export default{
        name: "Turma",
        data(){
            return{
                turma:{
                    nome:'',
                    modulo:'',
                    curso: '',
                    coordenador: user.uid
                },
                users: '',
                listaTurma: [],
                idTurma:'',
                alunoAll:[],
                profAll:[]
            }
        },
        components:{
        },
        methods: {
          async criarTurma(){
            const docRef = await addDoc(collection(db, "Turmas"), this.turma);
            console.log("Document written with ID: ", docRef.id);
           },
           pegarID(id){
            this.idTurma = id
           },
           async adicionar(id){
            const userRef = doc(db,`Usuarios/${id}`)
              await updateDoc(userRef, {
                turma: this.idTurma,
              });
           }
        },
       async created(){
            onAuthStateChanged(auth, async (user) => {
                if (user !== null) {
                    const email = user.email;
                    const docRef = doc(db, "Usuarios", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        this.users = docSnap.data()
                        this.turma.curso = docSnap.data().curso
                    } else {
                    // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                    }
                    const q = query(collection(db, "Turmas"), where("curso", "==", `${this.users.curso}`));
                    const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const turma = [];
                    querySnapshot.forEach((doc) => {
                        turma.push({id: doc.id,turma: doc.data()});
                    });
                    this.listaTurma = turma
                    });
                    const q1 = query(collection(db, "Usuarios"), where ("isAluno" , "!=", 3));
                    onSnapshot( q1,  (querySnapshot) => {
                        this.alunoAll = []
                        this.profAll = []
                        querySnapshot.forEach(async (doc) => {
                            if (doc.data().isAluno == 2 && doc.data().curso == `${this.users.curso}`){
                                this.alunoAll.push({id:doc.id, user: doc.data()})
                            }else if (doc.data().isAluno == 1 && doc.data().curso == `${this.users.curso}`){
                                this.profAll.push({id:doc.id, user: doc.data()})
                            }
                        });
                    });
                });
                

            }
           
    }
</script>


<template>
  <div class="d-flex w-100 flex-row-reverse justify-content-center align-items-center p-3">
    <a href="" data-bs-toggle="modal" class="btn btn-primary align-self-start" data-bs-target="#staticBackdrop">Criar Turma</a>
    <div class="container d-flex justify-content-center align-items-center"> 
        <div v-for="list in listaTurma" :key="list.id" @click="pegarID(list.id)" data-bs-toggle="modal" data-bs-target="#staticBackdrop1" class="card rounded p-2 m-3 turma" style="cursor: pointer;">
            <div class="d-flex flex-column card-body">  
                <h5>{{ list.turma.nome }}</h5>
                <p>{{ list.turma.modulo }} Módulo</p>
            </div>
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
<div class="modal modal-lg fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h1 class="modal-title fs-5" id="staticBackdropLabel1">Criar turma</h1> -->
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <label class="my-2" for="nome"><h4>Adicionar professores:</h4></label>
            <div class="d-flex card mt-2 flex-column justify-content-around" style="overflow-y: scroll;">
                <span class="ms-2" v-for="professor in profAll" :key="professor.id" v-show="!professor.user.turma"><span class="d-flex justify-content-between align-items-center">{{ professor.user.nome }} ({{ professor.user.matricula }}) <button @click.prevent="adicionar(professor.id)" class="btn btn-primary m-2">Adicionar</button></span></span>
            </div>
            <label class="my-2" for="modulo"><h4>Adicionar alunos:</h4></label>
            <div class="d-flex card mt-2 flex-column justify-content-around" style="overflow-y: scroll;">
                <span class="ms-2" v-for="aluno in alunoAll" :key="aluno.id" v-show="!aluno.user.turma"><span class="d-flex justify-content-between align-items-center">{{ aluno.user.nome }} ({{ aluno.user.matricula }}) <button @click.prevent="adicionar(aluno.id)" class="btn btn-primary m-2">Adicionar</button></span></span>
            </div>
        </form>
        <label class="my-2" for="modulo"><h5>Professores na turma:</h5></label>
        
            <div class="d-flex card mt-2 flex-column justify-content-around" style="overflow-y: scroll;">
                <ul class="ms-2" v-for="professor in profAll" :key="professor.id" v-show="professor.user.turma == idTurma"><li><span class="d-flex justify-content-between align-items-center">{{ professor.user.nome }} ({{ professor.user.matricula }}) <button @click.prevent="remover(professor.id)" class="btn btn-danger m-2">Remover</button></span></li></ul>
            </div>
        <label class="my-2" for="modulo"><h5>Alunos na turma:</h5></label>
        
        <div class="d-flex card mt-2 flex-column justify-content-around" style="overflow-y: scroll;">
                <ul class="ms-2" v-for="aluno in alunoAll" :key="aluno.id" v-show="aluno.user.turma == idTurma"><li><span class="d-flex justify-content-between align-items-center">{{ aluno.user.nome }} ({{ aluno.user.matricula }}) <button @click.prevent="remover(aluno.id)" class="btn btn-danger m-2">Remover</button></span></li></ul>
            </div>
      </div>
      <div class="d-flex d-flex justify-content-between modal-footer">
        <button type="button" class="btn btn-success" @click="editar()"  data-bs-toggle="modal" data-bs-target="#staticBackdrop3" data-bs-dismiss="modal">Editar</button>
        <button type="button" @click="excluir()" class="btn btn-danger" data-bs-dismiss="modal">Excluir</button>
      </div>
    </div>
  </div>
</div>
<!-- final do modal de adicionar professor e aluno -->
<!-- modal de editar turma -->
<div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel3">Editar turma</h1>
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
        <button type="button" @click="salvarAlteracao()" data-bs-dismiss="modal" class="btn btn-primary">Salvar</button>
      </div>
    </div>
  </div>
</div>
<!-- final do modal de editar turma -->
</template>


<script>
import app from './firebase/index'
import { doc, getFirestore, collection, deleteField, deleteDoc, getDoc, query,updateDoc,onSnapshot, increment ,arrayUnion, where, getDocs, addDoc } from "firebase/firestore";
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
           },
           async remover(id){
            const userRef = doc(db,`Usuarios/${id}`)
            await updateDoc(userRef, {
                turma: deleteField()
            });
           },
           async excluir(){
            for(let i in this.alunoAll) {
                if (this.alunoAll[i].user.turma == this.idTurma){
                    const userRef = doc(db,`Usuarios/${this.alunoAll[i].id}`)
                    await updateDoc(userRef, {
                        turma: deleteField()
                    });
                }
            }
            for(let i in this.profAll) {
                if (this.profAll[i].user.turma == this.idTurma){
                    const userRef = doc(db,`Usuarios/${this.profAll[i].id}`)
                    await updateDoc(userRef, {
                        turma: deleteField()
                    });
                }
            }
            await deleteDoc(doc(db, "Turmas", this.idTurma));
           },
           async editar(){
            const docRef = doc(db, "Turmas", this.idTurma);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        this.turma = docSnap.data()
                        console.log(this.turma)
                    } else {
                    // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
           },
           async salvarAlteracao(){
            const userRef = doc(db,`Turmas/${this.idTurma}`)
              await updateDoc(userRef, {
                nome: this.turma.nome,
                modulo: this.turma.modulo
              });
              window.location.reload()
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

<style>

.turma:hover {
  transition: .3s;
  scale: 1.02;
  box-shadow: 0px 0px 20px 1px rgb(0 0 0 / 24%);
}

</style>
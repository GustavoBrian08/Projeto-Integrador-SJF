<template> 
    <div class="over bg-white bloco p-3" >
        <div class="d-flex flex-column mb-3">
            <h3>Justificativas dos Alunos:</h3>
            <div class="mb-4">
                <p>Filtros:</p>
                <div class="d-flex responsive bg-secondary bg-opacity-25 p-4 rounded flex-wrap">
                    <div class="d-flex flex-column mb-3 w-25">
                        <label for="text">Texto:</label>
                        <div class="inputWithIcon">
                            <input class="form-control form-control-L" type="search" @input="filtrar" name="texto">
                            <i class="bi bi-search" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="d-flex responsive flex-column mb-3 w-25">
                        <label for="text">Situação:</label>
                        <select class="form-select form-select-L" @input="situacaoFiltrar" name="selected" id="selected">
                            <option value="Selecione uma situação" selected>Selecione uma situação</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Recusado">Recusado</option>
                        </select> <!-- form-contro-L é um media screen feito para ajustar o input para telas de <=544 -->
                    </div>
                </div>
                <hr>
                <div class="overflow-auto mt-4">
                    <paginate :list="list" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import app from './firebase/index'
    import { doc, getFirestore, getDoc, collection,collectionGroup, query,updateDoc, onSnapshot ,arrayUnion, where, getDocs, addDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    const db = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;
import paginate from '@/components/paginate.vue'

    export default {
        name: 'HistoricoDeJustificativas',
        components:{
            paginate
        },
        data(){
            return{
                list:[],
                input: '',
                list1:[],
                situacao: 'Selecione uma situação',
            }
        },
        methods: {
            filtrar(event){
                this.input = event.target.value
                this.list = this.items
            },
            situacaoFiltrar(event){
                this.situacao = event.target.value
                this.list = this.items
            },
            async pegarUsuario(id){
                const docRef = doc(db, "Usuarios", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  return docSnap.data()
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }
            }
            
        },computed: {
            items() {
                let valores = []
                valores = this.list1.filter((item) =>{
                    return (
                        item.responsavel.toLowerCase().indexOf(this.input.toLowerCase()) > - 1 || 
                        item.id.toLowerCase().indexOf(this.input.toLowerCase()) > - 1 ||
                        item.dataInicio.toLowerCase().indexOf(this.input.toLowerCase()) > - 1
                    )
                })
                
                valores = valores.filter((item) =>{
                    
                    if (this.situacao == 'Selecione uma situação'){ 
                        return item
                    }else{
                        return item.situacao === this.situacao
                    }
                })
                return valores
            }
        },
        created(){
          onAuthStateChanged(auth, async (user) => {
              if (user !== null) {
                const usuario = await this.pegarUsuario(user.uid)
                if (usuario.isAluno == 1){
                    const q = query(collectionGroup(db, "Justificativas"));
                    const unsubscribe = onSnapshot( q,  (querySnapshot) => {
                    const justificativas = [];
                    querySnapshot.forEach(async (doc) => {
                        let situacao
                        if(doc.data().situacao == 1) {
                            situacao = 'Pendente'
                        }else if(doc.data().situacao == 2){
                            situacao = 'Concluído'
                        }else if(doc.data().situacao == 3){
                            situacao = 'Recusado'
                        }
                        try{
                            if (doc.data().idProfessor.includes(user.uid)){
                                justificativas.push({id: doc.id, mensagem: doc.data().mensagem, nome: doc.data().nome, assunto: doc.data().assunto, dataInicio: doc.data().dataInicio, situacao: situacao, responsavel: doc.data().responsavel});
                            }
                        }catch(e){

                        }
                    });
                    this.list = justificativas
                    this.list1 = justificativas
                    });
                }else if(usuario.isAluno == 3){
                    const q = query(collectionGroup(db, "Justificativas"));
                    const unsubscribe = onSnapshot( q,  (querySnapshot) => {
                    const justificativas = [];
                    querySnapshot.forEach(async (doc) => {
                        let situacao
                        if(doc.data().situacao == 1) {
                            situacao = 'Pendente'
                        }else if(doc.data().situacao == 2){
                            situacao = 'Concluído'
                        }else if(doc.data().situacao == 3){
                            situacao = 'Recusado'
                        }
                        justificativas.push({id: doc.id, mensagem: doc.data().mensagem, nome: doc.data().nome, assunto: doc.data().assunto, dataInicio: doc.data().dataInicio, situacao: situacao, responsavel: doc.data().responsavel});
                    });
                    this.list = justificativas
                    this.list1 = justificativas
                    });
                }else{ 
                    const q = await collection(doc(db,'Usuarios',user.uid),"Justificativas");
                    onSnapshot(q, (querySnapshot) => {
                    const justificativas = [];
                    querySnapshot.forEach((doc) => {
                        let situacao
                        if(doc.data().situacao == 1) {
                            situacao = 'Pendente'
                        }else if(doc.data().situacao == 2){
                            situacao = 'Concluído'
                        }else if(doc.data().situacao == 3){
                            situacao = 'Recusado'
                        }
                        justificativas.push({id: doc.id, mensagem: doc.data().mensagem, assunto: doc.data().assunto, dataInicio: doc.data().dataInicio, situacao: situacao, responsavel: doc.data().responsavel});
                    });
                    this.list = justificativas
                    this.list1 = justificativas
                    });
                }
              }
              });
      }
    }
</script>

<style scoped>
    body {
        background: rgba(255, 255, 255, 0.842);
    }
</style>

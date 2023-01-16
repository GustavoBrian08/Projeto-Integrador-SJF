<template>
    <div class="container d-flex justify-content-center align-items-center"> 
        <div id="cardSolicitacao" class="card rounded p-2 w-75 shadow-sm">
            <div class="d-flex flex-column card-body " style="max-height: 598px;">
                <h3 class="mb-4 d-flex justify-content-center">Solicitações de Justificativas</h3>
                <p class="alert alert-success" :style="success">Aluno aceito com sucesso!</p>
                <p class="alert alert-danger" :style="danger">{{msg}}</p>
                <div class="card-body shadow-sm p-3 mb-5 bg-body rounded overflow-auto">
                    <div id="solicitacaoAluno" v-for="u in users" :key="u.id" v-show="!u.user.isValidado" class="card mb-2 d-flex flex-row justify-content-around align-items-center">
                        <div class="d-flex flex-column p-2">
                            <p class="m-0">{{ u.user.nome }} </p>
                            <p>({{u.user.matricula}})</p>
                        </div>
                        <div id="btnSolicitacao" class="d-flex flex-column p-2">
                            <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-success mb-2">Aceitar</button>
                            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Recusar</button>
                            <button class="btn btn-secondary mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop3" @click="aceitar(u.id)" >Ver mais</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Avisar sobre justificativas para os professores</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div v-for="user in userLogado" :key="user.id" class="form-check d-flex  align-items-center">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
        </label>
        <div class="d-flex flex-column justify-content-center align-items-center">
            <p class="m-0">{{ user.user.nome }}</p>
            <p class="m-0">({{ user.user.matricula }})</p>
            <p class="m-0">({{ user.user.email }})</p>
        </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success">Enviar</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Observação:</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card">
            <textarea class="form-control" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success">Enviar</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalhes da justificativa:</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card d-flex flex-row justify-content-around">
            <div class="d-flex flex-column ">
                <p class="m-0 pe-4">Inicio</p>
                <span>{{ justificativa.dataInicio }}</span>
            </div>
            -
            <div class="d-flex flex-column">
                <p class="m-0">Fim</p>
                <span>{{ justificativa.dataFinal}}</span>
            </div>
        </div>
        <div class="card-body mt-2">
            <label for="descricao">Descrição:</label>
            <p class="form-control">{{ justificativa.descricao }}</p>
        </div>
        <div class="card-body d-flex flex-column mt-2">
            <label for="descricao">Arquivos anexados:</label>
            <p  style="cursor: pointer; color: blue; margin: 5px;" v-for="anexo in justificativa.anexos" :key="anexo.id" class="form-control" @click="downloadAnexo(anexo)">{{ anexo.substr(47) }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
    <Loading :display="loading" />
</template>


<script>
import app from './firebase/index'
import { doc, getFirestore, collection, getDocFromCache, collectionGroup, query,updateDoc, onSnapshot, deleteDoc, increment ,arrayUnion, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, deleteUser  } from "firebase/auth";
import { useRouter } from 'vue-router';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const storage = getStorage();
const router = useRouter()
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;


    export default{
        name: "SolicitacaoJustificativa",
        data(){
            return{
                loading: 'display: none',
                success: 'display: none',
                danger: 'display: none',
                users: [],
                msg: '',
                userLogado:[],
                justificativa:''
            }
        },
        methods:{
            async aceitar(id){
                this.justificativa = []
                let valores = []
                valores = this.users.filter((item) =>{
                    return (item.id.indexOf(id) > - 1)
                })
                this.justificativa = valores[0].justificativa
            },
            async apagar(id){
                
            },
            unsubscribe(){
                onSnapshot(collection(db, "Usuarios"), () => {
                // Respond to data
                // ...
                });
            },
            async pegarUsuario(id){
                const docRef = doc(db, "Usuarios", id);
                try {
                const doc = await getDocFromCache(docRef);
                return doc.data()
                } catch (e) {
                console.log("Error getting cached document:", e);
                }
            },
            downloadAnexo(url){
                getDownloadURL(ref(storage, url))
                .then((url) => {
                    // `url` is the download URL for 'images/stars.jpg'

                    // This can be downloaded directly:
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                    const blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();

                    // Or inserted into an <img> element
                    const img = document.getElementById('myimg');
                    img.setAttribute('src', url);
                })
                .catch((error) => {
                    // Handle any errors
                });
            }
        },
        async created(){
            const q = query(collectionGroup(db, "Justificativas"));
            const unsubscribe = await onSnapshot( q,  (querySnapshot) => {
            this.users = []
            querySnapshot.forEach(async (doc) => {

                const user = await this.pegarUsuario(doc._document.key.path.segments[6])
                this.users.push({user: user,id: doc.id, justificativa: doc.data()})
                console.log(this.users)
            });
            });
            const q1 = query(collection(db, "Usuarios"), where ("isAluno" , "==", 1));
            await onSnapshot( q1,  (querySnapshot) => {
                this.userLogado = []
                querySnapshot.forEach(async (doc) => {
                    this.userLogado.push({id:doc.id, user: doc.data()})
                });
            });
            // this.unsubscribe()
            // const unsubscribe1 = onSnapshot(collectionGroup(db, "Justificativas"), () => {
            //     // Respond to data
            //     // ...
            //     });
            // unsubscribe1()
        }
    }
</script>


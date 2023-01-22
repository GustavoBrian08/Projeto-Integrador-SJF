<template>
    <div class="container d-flex justify-content-center align-items-center"> 
      <div id="cardSolicitacao" class="card rounded p-2 w-75 shadow-sm">
        <div class="d-flex flex-column card-body " style="max-height: 598px;">
          <p class="alert alert-success" :style="success">{{ alerta }}</p>
          <p class="alert alert-danger" :style="danger">{{ alerta }}</p>
          <h3 class="mb-4 d-flex justify-content-center">Solicitações de Justificativas</h3>
                <div class="card-body shadow-sm p-3 mb-5 bg-body rounded overflow-auto">
                    <div id="solicitacaoAluno" v-for="u in users" :key="u.id" v-show="!u.user.isValidado" class="card mb-2 d-flex flex-row justify-content-around align-items-center">
                        <div class="d-flex flex-column p-2">
                            <p class="m-0">{{ u.user.nome }} </p>
                            <p>({{u.user.matricula}})</p>
                        </div>
                        <div id="btnSolicitacao" class="d-flex flex-column p-2">
                            <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-success mb-2" @click="pegarJustificativa(u.id, u.userID, u.user.nome)" >Aceitar</button>
                            <button class="btn btn-danger" data-bs-toggle="modal" @click="pegarJustificativa(u.id, u.userID, u.user.nome)" data-bs-target="#staticBackdrop2">Recusar</button>
                            <button class="btn btn-secondary mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop3" @click="pegarJustificativa(u.id, u.userID, u.user.nome)" >Ver mais</button>
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
        <button type="button" class="btn-close" data-bs-dismiss="modal" @click="limparDados()" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div v-for="user in userLogado" :key="user.id" class="form-check d-flex  align-items-center">
        <input class="form-check-input" type="checkbox" value="" @click="pegarIdProfessores(user.id)" id="flexCheckDefault" unchecked>
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
        <button type="button" class="btn btn-success" @click="aceitarJustificativa(idJustificativa)" data-bs-dismiss="modal">Enviar</button>
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
        <button type="button" class="btn-close" data-bs-dismiss="modal" @click="limparDados()" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card">
            <textarea class="form-control" v-model="msg" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" data-bs-dismiss="modal" @click="recusar()" class="btn btn-success">Enviar</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 fw-bold" id="staticBackdropLabel">Detalhes da justificativa:</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" @click="limparDados()" aria-label="Close"></button>
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
            <label class="fw-bold" for="descricao">Descrição:</label>
            <p  v-if="justificativa.descricao" class="form-control">{{ justificativa.descricao }}</p>
            <p  v-else class="fw-bold text-center"> Nenhuma descrição</p>
        </div>
        <div class="card-body d-flex flex-column mt-2">
            <label class="fw-bold" for="descricao">Arquivos anexados:</label>
            <p  id="linkAnexos" v-for="anexo in justificativa.anexos" :key="anexo.id" class="form-control fw-bold" @click="downloadAnexo(anexo.substr(47))" >{{ anexo.substr(47) }}</p>
            <p class="fw-bold text-center" v-if="justificativa.anexos == 0">Sem Anexos</p>
          </div>
      </div>
    </div>
  </div>
</div>
    <Loading :display="loading" />
</template>


<script>
import app from './firebase/index'
import { doc, getFirestore, collection, getDoc, arrayUnion, updateDoc, collectionGroup, query, onSnapshot, where} from "firebase/firestore";
import { getAuth  } from "firebase/auth";
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
                justificativa:'',
                link:'',
                idJustificativa:'',
                idProfessores: [],
                idUsuario: '',
                alerta:'',
                nomeUsuario: ''
            }
        },
        methods:{
            async pegarJustificativa(id, userID, nome){
              this.nomeUsuario = nome
              this.idJustificativa = id
              this.idUsuario = userID
                this.justificativa = []
                let valores = []
                valores = this.users.filter((item) =>{
                    return (item.id.indexOf(id) > - 1)
                })
                this.justificativa = valores[0].justificativa
            },
            pegarIdProfessores(id){
              if (!this.idProfessores.includes(id)){
                this.idProfessores.push(id)
              }else{
                let indice = this.idProfessores.indexOf(id);
                while(indice >= 0){
                  this.idProfessores.splice(indice, 1);
                    indice = this.idProfessores.indexOf(id);
                }
              }
            },
            async aceitarJustificativa(id){   
              if (this.idProfessores.length == 0){
                this.danger = 'display: block'
                this.alerta = 'Você tem que marcar pelo menos 1 professor'
              }else{
                this.success = 'display: block'
                this.alerta = `Justificativa ${id} aceita com sucesso!`
                const userRef = doc(db,`Usuarios/${this.idUsuario}/Justificativas/${id}`)
                for (let i in this.idProfessores){
                  await updateDoc(userRef, {
                        nome: this.nomeUsuario,
                        situacao: 2,
                        idProfessor: arrayUnion(this.idProfessores[i])
                    });
                }
              }
              setTimeout(()=>{
                this.danger = 'display: none'
                this.success = 'display: none'
              },5000)
              this.limparDados()
            },
            limparDados(){
              const elem = document.querySelectorAll('#flexCheckDefault')
              for (let i in elem){
                if (elem[i].checked)
                {
                    elem[i].checked = false
                }
              }
              this.idProfessores = []
              this.msg = ''
              this.idJustificativa = ''
              this.idUsuario = ''
              this.justificativa = []
            },
            async recusar(){
              this.success = 'display: block'
              this.alerta = `Justificativa ${this.idJustificativa} recusada.`
              const userRef = doc(db,`Usuarios/${this.idUsuario}/Justificativas/${this.idJustificativa}`)
              await updateDoc(userRef, {
                nome: this.nomeUsuario,
                situacao: 3,
                mensagem: this.msg
              });
              setTimeout(()=>{
                this.success = 'display: none'
              },5000)
              this.limparDados()
            },
            unsubscribe(){
                onSnapshot(collection(db, "Usuarios"), () => {
                // Respond to data
                // ...
                });
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
            },
            downloadAnexo(url){
              this.link = ''
                getDownloadURL(ref(storage, `anexos/${url}`))
                .then((url) => {
                    window.open(url, '_blank');
                    
                })
                .catch((error) => {
                  console.log(error)
                    // Handle any errors
                });
            }
        },
        async created(){
            console.log('created')
            const q = query(collectionGroup(db, "Justificativas"),where('situacao', '==', 1));
            const unsubscribe = onSnapshot( q,  (querySnapshot) => {
            this.users = []
            querySnapshot.forEach(async (doc) => {
                const user = await this.pegarUsuario(doc._document.key.path.segments[6])
                this.users.push({userID: doc._document.key.path.segments[6],user: user,id: doc.id, justificativa: doc.data()})
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


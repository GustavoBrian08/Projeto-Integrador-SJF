<template>
    <div class="overflow-auto" style="background-color: #fff;">
        <div class="table-L" id="historico-paginate" >
            <table  class="table overflow-auto table-striped table-bordered table-hover">
                        <thead>
                            <tr >
                            <th scope="col" v-for="h in headrs" :key="h">{{h}}</th>
                            </tr>
                        </thead>
                        <tbody class="overflow-auto table-group-divider">
                            <tr v-for="l in list" :key="l">
                            <th style="cursor: pointer;" @click="pegarJustificativa(l.id)" data-bs-toggle="modal" data-bs-target="#staticBackdrop" scope="row"><i  class="bi bi-search" aria-hidden="true"  ></i></th>
                            <td>{{l.id}}</td>
                            <td>{{l.assunto}}</td>
                            <td v-if="l.nome">{{l.nome}}</td>
                            <td v-else>{{user.nome}}</td>
                            <td>{{l.dataInicio}}</td>
                            <td>{{l.situacao}}</td>
                            <td>{{l.responsavel}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    </div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Justificativa {{ justificativa.id }} </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="d-flex">
                    <button type="button" @click="trocar()" v-show="documentos == false" class="btn btn-primary me-2">Documentos</button>
                    <button type="button" @click="trocar()" v-show="documentos" class="btn btn-outline-secondary">Comentarios</button>
                </div>
                <div v-show="documentos" class="card">
                    <div class="card-body">
                        <div class="card mb-2 p-2" v-if="justificativa.situacao == 'Concluído'" >
                           <h6 style="color: green;"><strong>Termo: Finalização do processo {{ justificativa.id }}</strong></h6>
                            <br>
                            <hr>
                            <strong><p>Incluido por: {{ justificativa.responsavel }}</p></strong>
                        </div>
                        <div class="card mb-2 p-2">
                            <h6 style="color: green;"><strong>Requerimento: Justificativa de faltas</strong></h6>
                            <br>
                            <hr>
                            <strong><p>Incluido por: {{ user.nome }}</p></strong>
                        </div>
                    </div>
                </div>
                <div v-show="documentos == false" class="card p-4">
                    <h6 v-if="justificativa.mensagem">{{ justificativa.mensagem }}</h6>
                    <h3 v-else>SEM COMENTÁRIOS NO MOMENTO</h3>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import app from './firebase/index'
    import { doc, getFirestore, onSnapshot, collection, query,updateDoc ,arrayUnion, where, getDocs, addDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    const db = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;
    const headrs = ['#', 'ID', 'Assunto', 'Pessoa interessada', 'Data cadastro', 'Situação', 'Responsavel atual']
    const exibirTotalPage =  5
    export default {
        name:'paginate',
        props:{
            list: [Array , Object],
            modelValue: [String, Number]
        },
        data(){
            return{
                headrs: headrs,
                idI: 1,
                idF: exibirTotalPage,
                porPagina: '',
                disable: false,
                user: '',
                justificativa: [],
                documentos: true
            }
        },
        methods:{
            updatedLast() {
                if (this.idF < totalPage){
                    this.idI +=exibirTotalPage
                    this.idF += exibirTotalPage
                }
                
            },
            updatedPrev() {
                this.idI -=exibirTotalPage
                this.idF -=exibirTotalPage
                if (this.idI < 1){
                    this.idI = 1
                    this.idF = exibirTotalPage
                }
            },
            goTo(number){
                this.idF = number * exibirTotalPage
                this.idI = this.idF - (exibirTotalPage - 1) 
            },
            pegarJustificativa(id){
                this.justificativa = []
                let valores = []
                valores = this.list.filter((item) =>{
                    return (item.id.indexOf(id) > - 1)
            })
            this.justificativa = valores[0]
        },
        trocar(){
            this.documentos = !this.documentos
        }

        },
        created(){
            const usuario = onSnapshot(doc(db, "Usuarios", user.uid), (doc) => {
                this.user = doc.data()  
            });
            setTimeout(()=>{
                let totalPage = this.list.length
                this.porPagina = Math.ceil(totalPage / exibirTotalPage)
            },2000)

        }
    }
</script>

<style>
 body{
    background: #ffff;
 }
 @media (max-height: 625px) {
      .over{
        overflow: auto;
      }
    }
</style>
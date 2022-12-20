<template>
    <div class="overflow-auto" style="background-color: #fff;">
        <div class="table-L" >
            <table class="table overflow-auto table-striped table-bordered table-hover">
                        <thead>
                            <tr >
                            <th scope="col" v-for="h in headrs" :key="h">{{h}}</th>
                            </tr>
                        </thead>
                        <tbody class="overflow-auto table-group-divider">
                            <tr v-for="l in list" :key="l">
                            <th scope="row"><i class="bi bi-search" aria-hidden="true"></i></th>
                            <td>{{l.id}}</td>
                            <td>{{l.assunto}}</td>
                            <td>{{user.nome}}</td>
                            <td>{{l.dataInicio}}</td>
                            <td>{{l.situacao}}</td>
                            <td>{{l.responsavel}}</td>
                            </tr>
                        </tbody>
                    </table>
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
                user: ''
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
<template>
    <div class="over" style="background-color: #fff;">
        <div class="table-L" >
            <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr >
                            <th scope="col" v-for="h in headrs" :key="h">{{h}}</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="l in list" :key="l">
                            <th scope="row" v-if="l.ID >= idI && l.ID <= idF"><i class="bi bi-search" aria-hidden="true"></i></th>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.ID}}</td>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.assunto}}</td>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.nome}}</td>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.dataInicio}}</td>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.situacao}}</td>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.responsavel}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        <div class="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" href="" @click.prevent="updatedPrev()" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item" v-for="i in porPagina" :key="i" @click.prevent="goTo(i)"><a class="page-link" href="">{{i}}</a></li>
                    <li class="page-item">
                    <a class="page-link" href="" @click.prevent="updatedLast()" aria-label="Next">
                        <span aria-hidden="true" >&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    import app from './firebase/index'
    import { doc, getFirestore, collection, query,updateDoc ,arrayUnion, where, getDocs, addDoc } from "firebase/firestore";
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
</style>
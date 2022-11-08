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
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.Assunto}}</td>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.Pessoa}}</td>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.data}}</td>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.Situação}}</td>
                            <td v-if="l.ID >= idI && l.ID <= idF">{{l.Responsavel}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        <div class="d-flex justify-content-center align-items-end">
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
    const headrs = ['#', 'ID', 'Assunto', 'Pessoa interessada', 'Data cadastro', 'Situação', 'Responsavel atual']
    const list = [
        {'ID': 1, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe'},
        {'ID': 2, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu1', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe1'},
        {'ID': 3, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu2', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe2'},
        {'ID': 4, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu3', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe3'},
        {'ID': 5, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu4', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe4'},
        {'ID': 6, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu5', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe5'},
        {'ID': 7, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu3', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe3'},
        {'ID': 8, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu4', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe4'},
        {'ID': 9, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu5', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe5'},
        {'ID': 10, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu6', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe5'},
        {'ID': 11, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe'},
        {'ID': 12, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu1', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe1'},
        {'ID': 13, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu2', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe2'},
        {'ID': 14, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu3', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe3'},
        {'ID': 15, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu4', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe4'},
        {'ID': 16, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu5', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe5'},
        {'ID': 17, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu3', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe3'},
        {'ID': 18, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu4', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe4'},
        {'ID': 19, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu5', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe5'},
        {'ID': 20, 'Assunto': 'Blabla bla', 'Pessoa': 'Cadu6', 'data': '2022-11-07', 'Situação': 'Concluido', 'Responsavel': 'mãe5'},
    ]
    const totalPage = list.length
    const exibirTotalPage =  5
    const porPagina = Math.ceil(totalPage / exibirTotalPage)
    export default {
        name:'paginate',
        data(){
            return{
                headrs: headrs,
                list: list,
                idI: 1,
                idF: exibirTotalPage,
                porPagina: porPagina
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

        }
    }
</script>

<style>
 body{
    background: #ffff;
 }
</style>
<template>
    <div class="d-flex tamanho flex-column flex-shrink-0 text-bg-secondary">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <h2 >SJF</h2>
        </a>
        <div class="dropdown" >
            <img src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png" alt="" width="52" height="52" class="rounded-circle me-2">
            <div class="d-flex align-items-center text-white"  style="height: 48px;">
                <img id="nome" class="visivel" v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 40px; margin-left: 86px;">
                <strong>{{users.nome}}</strong>
            </div>
        </div>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <router-link to="/" class="nav-link">
            <iconify-icon icon="line-md:home-md"></iconify-icon><strong>   Inicio</strong> 
            </router-link>
        </li>
        <li v-show="users.isAluno == 3">
            <router-link to="/solicitacaoJustificativa" class="nav-link">
                <iconify-icon icon="line-md:email-opened-twotone-alt"></iconify-icon><strong>   Solicitações de justificativas</strong> 
            </router-link>
        </li>
        <li v-show="users.isAluno == 3">
            <router-link to="/solicitacaoAlunos" class="nav-link">
                <iconify-icon icon="line-md:account-add"></iconify-icon><strong>   Solicitações de alunos</strong> 
            </router-link>
        </li>
        <li v-show="users.isAluno == 3">
            <router-link to="/solicitacaoProfessor" class="nav-link">
                <iconify-icon icon="line-md:account"></iconify-icon><strong>   Solicitações de professores</strong> 
            </router-link>
        </li>
        <li v-show="users.isAluno != 3">
            <router-link to="/justificar" class="nav-link">
                <iconify-icon icon="line-md:clipboard-list"></iconify-icon><strong>   Justificar falta</strong> 
            </router-link>
        </li>
        <li>
            <router-link to="/historico-de-justificativas" class="nav-link">
            <iconify-icon icon="line-md:text-box-to-text-box-multiple-transition"></iconify-icon><strong>   Historico Justificativas</strong>  
        </router-link>
        </li>
        <li v-show="users.isAluno == 3">
            <router-link to="/historico-de-justificativas" class="nav-link">
                <iconify-icon icon="line-md:image-twotone"></iconify-icon><strong>   Criar turma</strong>  
            </router-link>
        </li>
        <li>
            <a href="/login" @click="deslogar()" class="nav-link red">
                <iconify-icon icon="line-md:arrow-left-circle"></iconify-icon><strong>   Sair</strong>
            </a>
        </li>
        </ul>
        <div @click="ativarMenu()" class="mostrar-menu text-bg-secondary">
            <iconify-icon icon="ic:outline-arrow-forward-ios"></iconify-icon>
        </div>
    </div>
</template>

<script>
    import app from './firebase/index'
    import { doc, getFirestore, onSnapshot } from "firebase/firestore";
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
    const db = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;
    export default{
        name: "slideBar",
            data(){
            return{
                users:''
            }
            },
            methods:{
                deslogar(){
                    signOut(auth).then(() => {
                    }).catch((error) => {
                    // An error happened.
                    });
                },
                ativarMenu(){
                    const menu = document.querySelector('div.mostrar-menu').classList
                    const menuGeral = document.querySelector('div.tamanho').classList
                    if (menuGeral.value.includes('ativado')){
                        menuGeral.remove('ativado')
                    }else{
                        menuGeral.add('ativado')
                    }
                }
            },
            created(){
                onAuthStateChanged(auth, async (user) => {
                    if (user !== null) {
                        const email = user.email;
                        const usuario = onSnapshot(doc(db, "Usuarios", user.uid), (doc) => {
                            this.users = doc.data()
                            this.users = {nome: this.users.nome, matricula: this.users.matricula, email: this.users.email, turma: this.users.turma, isAluno: this.users.isAluno}
                        }); 
                    }
                    });
            }
        }
</script>
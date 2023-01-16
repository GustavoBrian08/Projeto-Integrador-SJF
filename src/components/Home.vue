<template>
  <div class="over d-flex">
    <main class="d-flex flex-column">
      <div style="width:75vw; margin-left:25px;">
        <div class="d-flex justify-content-around mt-5" style="width: 95%;">
          <img v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 50px;"> <h2 v-else> {{users.nome}}  ({{users.matricula}})</h2>
          <AlterarSenha />
        </div>
      </div>
      <h3 class="ms-4 mb-5 mt-3">Dados Gerais</h3>
      <div class="d-flex colum">
        <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" fill="currentColor" class="bi bi-person-circle m-4" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        <table class="table table-striped table-hover">
          <tbody class="table-group-divider">
            <tr>  
              <td><strong>Nome: </strong><img v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 40px;"> <span v-else >{{users.nome}}</span></td>
              <td v-show="users.isAluno != 3"><strong>Situação: </strong><img v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 40px;"><span v-else class="card-body situacao">Matriculado</span></td>
            </tr>
            <tr>
              <td><strong>Matricula: </strong><img v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 40px;">
                 {{users.matricula}}</td>
              <td v-show="users.isAluno != 3"><strong>Ingressou: </strong><img v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 40px;"><span v-else >{{ users.ingressou }}/2</span></td>
            </tr>
            <tr>
              <td colspan="2"><strong>Email: </strong><img v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 40px;"> <span v-else >{{users.email}}</span></td>
            </tr>
            <tr>
              <td colspan="2" v-show="users.isAluno != 3"><strong>Curso: </strong><img v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 40px;"><spam v-else >16MINF - Técnico em {{ users.turma }}</spam> </td>
            </tr>
            <tr>
              <td colspan="2" v-show="users.isAluno == 3"><strong>Coordenação: </strong><img v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 40px;"><spam v-else >Informática</spam> </td>
            </tr>
            <tr>
              <td colspan="1" v-show="users.isAluno != 3"><strong>Periodo: </strong><img v-if="!users.nome" src="http://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif" style="width: 40px;"><spam v-else > {{ users.ingressou }}</spam> </td>
            </tr>
          </tbody>
        </table>
      </div>
   </main>
  </div>
</template>

<script>
 import app from './firebase/index'
import { doc, getFirestore, onSnapshot  } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import AlterarSenha from "./AlterarSenha.vue"
    const db = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;
export default {
    name: 'Home',
    components: {
      AlterarSenha
    },
    data(){
      return{
        users:''
      }
    },
      created(){
          onAuthStateChanged(auth, async (user) => {
              if (user !== null) {
                  const email = user.email;
                  const usuario = onSnapshot(doc(db, "Usuarios", user.uid), (doc) => {
                      this.users = doc.data()
                      let ingressou = this.users.matricula.substr(0,4)
                      this.users = {nome: this.users.nome, matricula: this.users.matricula, email: this.users.email, turma: this.users.turma, ingressou: ingressou, isAluno: this.users.isAluno}
                  });
              }
              });
            
      }
}
</script>

<style scoped>
  .situacao {
    background: rgba(180, 219, 255, 0.925) !important;
    border-radius: 0 30px 30px 0;
    padding: 8px;
    border: 1px solid black;
  }
  @media screen and (max-width: 550px) {
    .colum{
      flex-direction: column;
      align-items: center;
    }
  }
</style>
<template>
    <div class="container card rounded">
      
      <div class="card-body">
        <div class="logo">
          <img src="@/assets/ifpiLogo.png" alt="logo">
        </div>
        
        <form action="" >
          <h1 class="mt-4">Cadastro</h1>
          <label for="matricula" class="mt-4">Matricula:</label>
            <input class="form-control mt-2" v-model="usuario.matricula" type="text" required>
            <label for="nome">Nome:</label>
            <input class="form-control mt-2" v-model="usuario.nome" type="text" required>
            <label for="email">Email:</label>
            <input class="form-control mt-2" v-model="usuario.email" type="email" required>
            <label for="turma">Turma:</label>
            <input class="form-control mt-2" v-model="usuario.turma" type="text" required>
            <label for="senha">Senha:</label>
            <InputSenha required />
            <label for="confirmarSenha" >Confirmar senha:</label>
            <InputSenha required />
            <router-link to="/">
                <input type="submit" class="btn btn-success tamanho-button mt-4 rounded-pill btn-lg" value="Voltar">
            </router-link>
            <input type="submit" @click.prevent="cadastrarUsuario()" class="btn btn-success tamanho-button mt-4 rounded-pill btn-lg" value="Enviar">
          </form>

        </div>
  </div>
</template>

<script>
  import app from './firebase/index'
  import { getFirestore, addDoc, collection} from "firebase/firestore";
  import InputSenha from './Form/InputSenha.vue';
  const db = getFirestore(app);
  
    export default {
        name: "Cadastrar",
        data(){
          return{
            usuario: {
            matricula: '',
            nome: '',
            email: '',
            turma: '',
            }

          }
        },
        components:{
          InputSenha
        },
        methods: {
          async cadastrarUsuario(){
            try {
              const docRef = await addDoc(collection(db, "Usuarios"), this.usuario);
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
        },
        created(){
          // this.cadastrarUsuario();
        }
    }
</script>

<style>
    .container{
      width: 50%;
    }

    @media(max-width: 966px) {
      .container{
        width: 90%;

      }
    }


    .color{
      color: rgb(105, 101, 105);
    }
    .tamanho-button{
        margin-left: 6%;
        width: 40%;
    }
    h1{
        text-align: center;
    }
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    </style>
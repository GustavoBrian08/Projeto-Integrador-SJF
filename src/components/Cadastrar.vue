<template>
    
    <div class="container card rounded">
      
      <div class="card-body">
        <div class="logo">
          <img src="@/assets/ifpiLogo.png" alt="logo">
        </div>
        
        <form form-control >
          <h1 class="mt-4">Cadastro</h1>
          <div>
            <label for="matricula" class="mt-4">Matricula:</label>
              <input :class="validarCampos.tamanho" @input="tamanhoMatricula()" v-model="usuario.matricula" type="text" required>
              <div class="invalid-feedback">
                Porfavor insira uma matrícula válida.
          </div>
          </div>
          <div>
            <label for="nome">Nome:</label>
            <input :class="validarCampos.nome" @input="tamanhoNome()" v-model="usuario.nome" type="text" required>
            <div class="invalid-feedback">
              Nome deve ser maior que 3 caracteres.
            </div>
          </div>
          <div>
            <label for="email">Email:</label>
            <input :class="validarCampos.email" @input="validarEmail()" v-model="usuario.email" type="email" required>
            <div class="invalid-feedback">
              Porfavor insira um email válido.
            </div>
          </div>
          <div>
            <label for="turma">Turma:</label>
            <input :class="validarCampos.turma" @input="tamanhoTurma()" v-model="usuario.turma" type="text" required>
            <div class="invalid-feedback">
              A turma deve ser maior que 3 caracteres.
            </div>
          </div>
          <label for="senha">Senha:</label>
          <InputSenha v-model="senha" @input="tamanhoSenha()" :verificar="validarCampos.senha" :name="name" required />
          <label for="confirmarSenha" >Confirmar senha:</label>
          <InputSenha v-model="confirmarSenha" @input="senhas()" :verificar="validarCampos.confirmaSenha" required />
            


            <router-link to="/">
                <input type="submit" class="btn btn-success tamanho-button mt-4 rounded-pill btn-lg" value="Voltar">
            </router-link>
            <input type="submit" @click.prevent="cadastrarUsuario()" class="btn btn-success tamanho-button mt-4 rounded-pill btn-lg" value="Enviar">
          </form>

        </div>
      </div>
      <Loading :display="loading" />
</template>

<script>
  import app from './firebase/index'
  import ValidarTexto from './validation/validation'
  import { getFirestore, addDoc, collection } from "firebase/firestore";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import InputSenha from './Form/InputSenha.vue';
  import Loading from './Loading.vue'
  const db = getFirestore(app);
  const auth = getAuth(app);
  const validação = new ValidarTexto()
  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{1,3})+$/
  
    export default {
        name: "Cadastrar",
        data(){
          return{
            validarCampos: {
              tamanho: 'form-control mt-2',
              nome: 'form-control mt-2',
              email: 'form-control mt-2',
              turma: 'form-control mt-2',
              senha: 'form-control',
              confirmaSenha: 'form-control'
            },
            usuario: {
              matricula: '',
              nome: '',
              email: '',
              turma: '',
            },
            senha: '',
            confirmarSenha: '',
            erros: [],
            name: '',
            loading: 'display: none'

          }
        },
        components:{
          InputSenha,
          Loading
        },
        methods: {
          tamanhoMatricula(){
            let resultado = validação.validarTamanho(this.usuario.matricula,this.validarCampos.tamanho,'matricula') // verifica o tamanho do campo matricula
            this.usuario.matricula = this.usuario.matricula.trim() // evita colocar espaços
            this.validarCampos.tamanho = resultado
          },
          tamanhoNome(){
            let resultado = validação.validarTamanho(this.usuario.nome,this.validarCampos.nome, 'nome') // verifica o tamanho do campo matricula
            this.validarCampos.nome = resultado
          },
          validarEmail(){
            if (emailRegex.test(this.usuario.email)){
              this.validarCampos.email = 'form-control mt-2 is-valid'
            }else{
              this.validarCampos.email = 'form-control mt-2 is-invalid'
            } 
          },
          tamanhoTurma(){
            let resultado = validação.validarTamanho(this.usuario.turma,this.validarCampos.turma, 'nome') // verifica o tamanho do campo matricula
            this.validarCampos.turma = resultado

          },
          tamanhoSenha(){
            let resultado = validação.validarTamanho(this.senha,this.validarCampos.senha, 'senha') // verifica o tamanho do campo matricula
            this.validarCampos.senha = resultado
            this.name = 'A senha deve ter no mínimo 8 caracteres'
          },
          senhas(){
            if (this.senha != this.confirmarSenha || this.senha == ''){
              this.validarCampos.confirmaSenha = 'form-control is-invalid'
              this.name = 'As senhas não são iguais'
            }else{
              this.validarCampos.confirmaSenha = 'form-control is-valid'
            }

          },
          async cadastrarUsuario(){
            
            this.loading = 'display: block'
            this.erros = []
            if (this.usuario.matricula == '' || this.usuario.nome == '' || this.usuario.email == '' || !this.usuario.email.includes('@') || this.usuario.turma == '' || this.senha == '' || this.confirmarSenha == '') this.erros.push('campos vazios')
            if (this.usuario.matricula.length < 13 ||this.usuario.nome.length < 3 || this.usuario.turma.length < 3 || this.senha.length < 8) this.erros.push('pouco caracteres')
            if (this.senha != this.confirmarSenha) {
              this.erros.push('senha diferentes')
              this.senha = ''
              this.confirmarSenha = ''
            }
            if (this.erros.length > 0){
              this.loading = 'display: none'
              this.tamanhoMatricula()
              this.tamanhoNome()
              this.validarEmail()
              this.tamanhoTurma()
              this.tamanhoSenha()
              this.senhas()
              console.log('deu erro')
            }else{
              this.loading = 'display: block'
              
              console.log('Usuario cadastrado com sucesso!')
              try {
                const docRef = await addDoc(collection(db, "Usuarios"), this.usuario);

                createUserWithEmailAndPassword(auth, this.usuario.email, this.senha)
                .then((userCredential) => {
                  const user = userCredential.user;
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                });

                this.$router.push({ name: "home" })
                setTimeout(() => {
                  this.emitter.emit('alert-cadastro', {'success': 'display: block'})  
                }, 300);
                this.loading = ''
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
          }
        },
        created(){
          // this.cadastrarUsuario();
        }
    }
</script>
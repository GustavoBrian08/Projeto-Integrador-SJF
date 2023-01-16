<template>
    <div class="container d-flex justify-content-center  card rounded"> 
      <div class="card-body d-flex flex-column ">
        <div class="d-flex justify-content-between mt-4 mb-4">
          <div style="width: 50px;"></div>
          <h1 class="mt-4">Cadastro</h1>
          <img src="@/assets/ifpiLogo.png" style="width: 120px;" alt="logo">
        </div>
        <p class="alert alert-danger" :style="danger">{{msg}}</p>
        <div class="tela-600 p-3">
          <form>
            <div>
              <label for="matricula">Matricula:</label>
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
              <label for="nome">Curso:</label>
              <select class="form-select" v-model="usuario.curso" aria-label="Default select example">
                <option selected>Selecione seu curso</option>
                <option value="1">Administração</option>
                <option value="2">Informática</option>
                <option value="3">Vestuário</option>
              </select>
            </div>
            <div>
              <label for="email">Email:</label>
              <input :class="validarCampos.email" @input="validarEmail()" v-model="usuario.email" type="email" required>
              <div class="invalid-feedback">
                Porfavor insira um email válido.
              </div>
            </div>
            <label for="senha">Senha:</label>
            <InputSenha v-model="senha" @input="tamanhoSenha()" :verificar="validarCampos.senha" :name="name" required />
            <label for="confirmarSenha" >Confirmar senha:</label>
            <InputSenha v-model="confirmarSenha" @input="checar_senhas()" :verificar="validarCampos.confirmaSenha" required />
            <div class="d-flex">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="usuario.isAluno" name="inlineRadioOptions" id="inlineRadio1" value="1" required>
                <label class="form-check-label" for="inlineRadio1">Professor</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="usuario.isAluno" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" required>
                <label class="form-check-label" for="inlineRadio2">Aluno</label>
              </div>
            </div>
          </form>
        </div>
        <div class="d-flex align-items-center">
          <router-link class="w-50" to="/">
              <input type="submit" class="btn btn-success tamanho-button mt-4 w-100 ms-0 me-2 rounded-pill btn-lg" value="Voltar">
          </router-link>
          <div class="w-50">
            <input type="submit" @click.prevent="cadastrarUsuario()" class="btn btn-success tamanho-button ms-2 me-0 w-100 mt-4 rounded-pill btn-lg" value="Enviar">
          </div>
        </div>
        </div>
      </div>
      <Loading :display="loading" />
      
</template>

<script>
  import app from './firebase/index'
  import ValidarTexto from './validation/validation'
  import { getFirestore, doc, setDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
  import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
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
              senha: 'form-control',
              confirmaSenha: 'form-control'
            },
            usuario: {
              matricula: '',
              nome: '',
              email: '',
              curso:'Selecione seu curso',
              isAluno: 0,
              isValidado:false

            },
            senha: '',
            confirmarSenha: '',
            erros: [],
            name: '',
            loading: 'display: none',
            danger: 'display: none',
            msg: ''

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
          tamanhoSenha(){
            let resultado = validação.validarTamanho(this.senha,this.validarCampos.senha, 'senha') // verifica o tamanho do campo matricula
            this.validarCampos.senha = resultado
            this.name = 'A senha deve ter no mínimo 8 caracteres'
          },
          checar_senhas(){
            if (this.senha != this.confirmarSenha || this.senha == ''){
              this.validarCampos.confirmaSenha = 'form-control is-invalid'
              this.name = 'As senhas não são iguais'
            }else{
              this.validarCampos.confirmaSenha = 'form-control is-valid'
            }
          },
          checarValidacao(){
            this.erros = []
            this.usuario.isAluno = parseInt(this.usuario.isAluno)
            if (this.usuario.matricula == '' || this.usuario.nome == '' || this.usuario.email == '' || !this.usuario.email.includes('@') ||  this.senha == '' || this.confirmarSenha == '') this.erros.push('campos vazios')
            if (this.usuario.matricula.length < 13 ||this.usuario.nome.length < 3 || this.senha.length < 8) this.erros.push('pouco caracteres')
            if (this.senha != this.confirmarSenha) {
              this.erros.push('senha diferentes')
              this.senha = ''
              this.confirmarSenha = ''
            } 
            return this.erros
          },
          async checarMatricula(){
            let matriculaCheck;
            const q = query(collection(db, "Usuarios"), where("matricula", "==", this.usuario.matricula));
            const resultado = await getDocs(q);
            resultado.forEach((doc) => {
              const matricula = doc.data().matricula
              if (matricula == this.usuario.matricula) {
                matriculaCheck = true
              }
            });
            return matriculaCheck
          },
          limparCampos(){
            this.usuario = {
                  matricula: '',
                  nome: '',
                  email: '',
                }
                this.senha = ''
                this.confirmarSenha = ''
                this.validarCampos ={
              tamanho: 'form-control mt-2',
              nome: 'form-control mt-2',
              email: 'form-control mt-2',
              senha: 'form-control',
              confirmaSenha: 'form-control'
            }
          },
          checagemFinal(erros, matriculaCheck){
            if (erros.length > 0){
              this.loading = 'display: none'
              this.tamanhoMatricula()
              this.tamanhoNome()
              this.validarEmail()
              this.tamanhoSenha()
              this.checar_senhas()
              return false
            }else if(matriculaCheck == true ){
              this.msg = "Matricula já está cadastrada na base de dados"
              this.danger = 'display: block'
              this.loading = 'display: none'
                setTimeout(()=>{
                  this.danger = 'display: none'
                },8000)
            this.limparCampos()
            return false
            }else{
              return true
            }
          },
          async cadastrarUsuario(){
            this.loading = 'display: block' // Ativando o carregamento da tela loading
            const erros = this.checarValidacao() // fazendo validação dos campos de cadastro
            let matriculaCheck = await this.checarMatricula() // verificando se a matricula já existe na base de dados
            if (matriculaCheck == undefined) matriculaCheck = false
            const chacagemFinal = this.checagemFinal(erros, matriculaCheck)
            if (chacagemFinal){
              this.loading = 'display: block'
              try {
                createUserWithEmailAndPassword(auth, this.usuario.email, this.senha)
                .then(async (userCredential) => {
                  const user = userCredential.user;
                  const docRef = await setDoc(doc(db, "Usuarios", user.uid), this.usuario);
                  // deslogar o usuario
                  signOut(auth).then(() => {
                    console.log('deslogado')
                    }).catch((error) => {
                    // An error happened.
                    });
                  //await setDoc(doc(db, "Usuarios", user.uid), this.usuario);
                })
                .catch((error) => {
                  this.loading = 'display: none'
                  this.msg = "Email já está cadastrada na base de dados"
                  this.danger = 'display: block'
                  setTimeout(()=>{
                  this.danger = 'display: none'
                  },8000)
                  this.limparCampos()
                });
                this.emitter.emit('alert-cadastro', true)
                this.$router.push({ name: "home" })
                this.loading = 'display: none'
                
              } catch (e) {
                this.loading = 'display: none'
                this.msg = 'Houve um erro interno'
                this.danger = 'display: block'
                setTimeout(()=>{
                  this.danger = 'display: none'
                },8000)
                this.limparCampos()
              }
            }
          }
        },
        created(){
          localStorage.clear()
        }
    }
</script>

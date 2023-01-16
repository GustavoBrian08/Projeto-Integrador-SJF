<template>
    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Editar Senha
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Alterar Senha</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="alterarSenha">
            <div class="mb-3">
                <label for="senha" class="form-label">Nova Senha</label>
                <input type="password" :class="validacao" name="senha" v-model="senha" @input="tamanhoSenha">
                <div class="invalid-feedback">
                  {{ name }}
                </div>
            </div>
            <div class="mb-3">
                <label for="confirmarSenha" class="form-label">Repita a Senha</label>
                <input type="password" :class="validacao" name="confirmarSenha" v-model="cSenha" @input="checarSenhasIguais">
              <div class="invalid-feedback">
                {{ name }}
              </div>
              <div :class="alert" role="alert">
                  {{ alertContent }}
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import app from './firebase/index'
import { getAuth, updatePassword } from "firebase/auth";
let auth = getAuth(app)

    export default {
        name: 'AlterarSenha',
        data(){
          return {
            senha: '',
            cSenha: '',
            name: '',
            alert: 'alert',
            alertContent: '',
            validacao: 'form-control'
          }
        },
        methods: {
          alterarSenha(){
            if (this.senha == this.cSenha && this.senha.length >= 8){
              const user = auth.currentUser;
              updatePassword(user, this.senha).then(() => {
                this.alert = 'alert alert-success my-3'
                this.alertContent = 'Senha alterada com sucesso!'
              }).catch((error) => {
                this.alert = 'alert alert-danger my-3'
                this.alertContent = 'Erro! Sua senha não pôde ser alterada!'
                console.log('um erro ocorreu: ', error.message)
              })

              this.validacao = 'form-control'
              this.senha = ''
              this.cSenha = ''
            }
          },
          tamanhoSenha(){
            if(this.senha.length < 8){
              this.validacao = 'form-control is-invalid'
              this.name = 'A senha deve ter no mínimo 8 caracteres'
            } else {
              this.validacao = 'form-control is-valid'
              this.name = ''
            }
          },
          checarSenhasIguais(){
            if(this.senha == this.cSenha){
              this.validacao = 'form-control is-valid'
            } else {
              this.validacao = 'form-control is-invalid'
              this.name = 'As senhas não são iguais.'
            }
          }
        }
    }
</script>
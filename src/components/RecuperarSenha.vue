<template>

  <div class="container card rounded">
    <div class="card-body">
      <PrimeiroComponente />
      <h4><span class="fas fa-key float"></span> AlterarSenha:</h4>
      <div class="p-2 d-flex flex-column mb-3 justify-content-between" style="background-color: #F2F2F2">
        <div class="d-flex flex-row mb-3 justify-content-center">
          <label for="usuario">Matricula: </label>
          <input class="form-control w-50" type="text" style="margin-left: 5px">
        </div>
        <div class="d-flex flex-row justify-content-center">
          <label for="usuario">Email: </label>
          <input class="form-control w-50" type="text" style="margin-left: 35px">
        </div>
      </div>
      <div class="d-flex flex-row justify-content-center">
        <img src="https://developers.google.com/static/recaptcha/images/newCaptchaAnchor.gif" alt="" style="width: 250px;">
      </div>
      <div class="d-flex justify-content-evenly ">
        <input type="submit" class="btn btn-success mt-3 rounded-pill" value="  Voltar  ">
        <input type="submit" class="btn btn-success mt-3 rounded-pill" value="  Enviar  ">
      </div>
    </div>
  </div>
</template>
<script>
import PrimeiroComponente from './PrimeiroComponente.vue';

export default {
  name: 'RecuperarSenha',
  components: {
    PrimeiroComponente
  }
}
</script>





<template>
  <div class="d-flex">
    <main class="d-flex flex-column">
      <div style="width:75vw; margin-left:25px;">
        <div class="d-flex justify-content-between mt-5" style="width: 100%;">
            <h2>Douglas Barros (2020003minf247)</h2>
            <button type="button" class="btn btn-primary">Editar</button>
        </div>
      </div>
      <h3 class="ms-4 mb-5 mt-3">Dados Gerais</h3>
      <div class="d-flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" fill="currentColor" class="bi bi-person-circle m-4" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        <table class="table table-striped table-hover">
            <tr>
              <td><strong>Nome: </strong>Douglas Barros</td>
              <td><strong>Situação: </strong><span class="card-body situacao">Matriculado</span></td>
            </tr>
            <tr>
              <td><strong>Matricula: </strong>2020003minf223</td>
              <td><strong>Ingressou: </strong>2022/2</td>
            </tr>
            <tr>
              <td colspan="2"><strong>Email:</strong> douglasbarros@gmail.com</td>
            </tr>
            <tr>
              <td colspan="2"><strong>Curso:</strong> 16MINF - Técnico em Informática</td>
            </tr>
            <tr>
              <td ><strong>Período:</strong> 4</td>
            </tr>
        </table>
      </div>
   </main>
  </div>
</template>

<script>

export default {
    name: 'Home'
}
</script>

<style>
  body{
    background: rgb(255, 255, 255);
  }
  .situacao {
    background-color: #A5D4FF;
    border-radius: 0 30px 30px 0;
    padding: 8px;
    border: 1px solid black;
  }
</style>
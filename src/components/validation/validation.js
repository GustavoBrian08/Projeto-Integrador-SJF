
export default class ValidarTexto{
    validarTamanho(matricula,texto,menor = false){

        if(matricula.length < 13 && matricula.length >=0 && menor == 'matricula'|| matricula.length >= 17 && menor == 'matricula'){
            texto = 'form-control mt-2 is-invalid'
          }else if (matricula.length >= 13 && menor == 'matricula'){
            texto = 'form-control mt-2 is-valid'
          }else if(matricula.length < 3 && menor == 'nome'){
            texto = 'form-control mt-2 is-invalid'
          }else if (matricula.length > 3 && menor == 'nome'){
            texto = 'form-control mt-2 is-valid'
          }else if(matricula.length < 8 && menor == 'senha'){
            texto = 'form-control is-invalid'
          }else{
            texto = 'form-control is-valid'
          }
        return texto
    }
};
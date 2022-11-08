<template>
    <div class="bg-white bloco p-3" >
        <div class="d-flex flex-column mb-3">
            <h3>Processos:</h3>
            <div class="mb-4">
                <p>Filtros:</p>
                <div class="d-flex responsive bg-secondary bg-opacity-25 p-4 rounded flex-wrap">
                    <div class="d-flex flex-column mb-3 w-25">
                        <label for="text">Texto:</label>
                        <input class="form-control form-control-L" type="text" name="texto">
                    </div>
                    <div class="d-flex responsive flex-column mb-3 w-25">
                        <label for="text">Situação:</label>
                        <div class="inputWithIcon">
                            <input type="text" class="form-control form-control-L" name="texto"> <!-- form-contro-L é um media screen feito para ajustar o input para telas de <=544 -->
                            <i class="bi bi-search" aria-hidden="true"></i>
                        </div>
                    </div>
                    <input type="button" class="d-flex btn-L btn btn-success" value="Filtrar" >
                </div>
                <hr>
                <div class="mt-4">
                    <paginate />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import paginate from '@/components/paginate.vue'
    export default {
        name: 'HistoricoDeJustificativas',
        components:{
            paginate
        },
        data(){
            return{
                e:''
            }
        }
    }
</script>

<style scoped>
    body {
        background: rgba(255, 255, 255, 0.842);
    }
</style>

<template>
    <div class="container p-3"> 
        <div class="card rounded p-5" style="height: 600px;">
            <div class="card-body">
                <label for="data">Data inicio e fim da ausência</label>
                <div class="card w-50 mt-2 mb-2">
                    <div class="card-body d-flex justify-content-around ">
                        <div class="d-flex flex-column align-items-center ">
                            <label for="inicio">Inicio: </label>
                            <input class="form-control" type="date" name="datainicio" id="datainicio">
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            <label for="fim">Fim: </label>
                            <input class="form-control " type="date" name="datafim" id="datafim">
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column mt-2 mb-2">
                    <label for="descricao">Descrição</label>
                    <textarea class="form-control mt-2 mb-2" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="mt-2 mb-2">
                    <label for="formFileMultiple" class="form-label">Anexar foto</label>
                    <input class="form-control" type="file" id="formFileMultiple" multiple>
                </div>
            <input type="button" value="Enviar" class="btn btn-success mt-2 mb-2">
            </div>
        </div>
    </div>
</template>


<script>
    export default{
        name: "JustificarFaltas"
    }
</script>
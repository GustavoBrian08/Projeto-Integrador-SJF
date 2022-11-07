<template>
    <div class="container d-flex justify-content-center align-items-center"> 
        <div class="card rounded p-5">
            <div class="d-flex flex-column card-body">
                <h3 class="mb-4 d-flex justify-content-center">Justificar Falta</h3>
                <p class="alert alert-success" :style="success">Justificativa enviada com sucesso!</p>
                <div class="d-flex flex-row justify-content-between flex-wrap">
                    <div class="d-flex flex-column align-items-center mw-100">
                        <label for="inicio">Data inicial: </label>
                        <input :class="validarCampos.dataInicio" @input="limparCampo()" v-model="dataInicio" type="date" name="datainicio" id="datainicio">
                    </div>
                    <div class="d-flex flex-column align-items-center mw-100">
                        <label for="fim">Data final: </label>
                        <input :class="validarCampos.dataFim" @input="limparCampo()" v-model="dataFim" type="date" name="datafim" id="datafim">
                    </div>
                </div>
                <div class="d-flex flex-column mt-2 mb-2">
                    <label for="descricao">Descrição:</label>
                    <textarea :class="validarCampos.desc" @input="limparCampo()" v-model="desc" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="d-flex flex-column mt-2 mb-2">
                    <label for="formFileMultiple" class="form-label">Anexar atestado:</label>
                    <input :class="validarCampos.anexo" @input="pegar" type="file" id="formFileMultiple" multiple>
                </div>
                <div class="d-flex justify-content-end mw-100 f">
                    <input type="submit" @click.prevent="validarCampo()" value="Enviar" class="btn btn-success mt-2 mb-2 mw-100">
                </div>
            </div>
        </div>
    </div>
    <Loading :display="loading" />
</template>


<script>
import app from './firebase/index'
import ValidarTexto from './validation/validation'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getFirestore, collection, query,updateDoc , where, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from './Loading.vue';
const validação = new ValidarTexto()
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();
const user = auth.currentUser;

    export default{
        name: "JustificarFaltas",
        data(){
            return{
                validarCampos: {
                    dataInicio: 'form-control ',
                    dataFim: 'form-control ',
                    desc: 'form-control mt-2 mb-2 ',
                    anexo: 'form-control '
                },
                dataInicio: '',
                dataFim: '',
                desc: '',
                anexo: 0,
                file: [],
                storageRef: [],
                loading: 'display: none',
                success: 'display: none',
                emailUser: '',
                atestados: []
            }
        },
        components:{
          Loading
        },
        methods: {
           async validarCampo(){
                this.loading = 'display: block'
            if (this.dataInicio.length == 0) this.validarCampos.dataInicio = 'form-control is-invalid'
            if (this.dataFim.length == 0) this.validarCampos.dataFim = 'form-control is-invalid'
            if (this.desc.length < 10) this.validarCampos.desc = 'form-control is-invalid'
            if(this.anexo == 0) this.validarCampos.anexo = 'form-control is-invalid'
            
            if (this.dataInicio.length !=0 && this.dataFim.length != 0 && this.desc.length != 0 && this.anexo != 0){
                this.atestados = []
                for (let i = 0; i < this.file.length ; i++){
                    console.log(this.file)
                    this.atestados.push(this.storageRef[i]+'/'+this.file[i].name)
                    uploadBytes(this.storageRef[i], this.file[i]).then((snapshot) => {
                        this.success = 'display: block'
                        setTimeout(()=>{
                            this.success = 'display: none'
                        },10000)
                    });
                }
                console.log(this.atestados)
                let id;
                const q = query(collection(db, "Usuarios"), where("email", "==", this.email));
                const resultado = await getDocs(q);
                resultado.forEach((doc) => {
                  id = doc.id
                  console.log(id)
                });
                const userRef = doc(db, "Usuarios", id);
                await updateDoc(userRef, {
                    anexos: {descricao: this.desc, dataInicio: this.dataInicio, dataFinal: this.dataFim, anexos: this.atestados}
                });
                'display: none'
            }
            setTimeout(()=>{
                this.loading = 'display: none'
            },900)
            
        },
        limparCampo(){
            if(this.dataInicio.length != 0) this.validarCampos.dataInicio = 'form-control '
            if(this.dataFim.length != 0) this.validarCampos.dataFim = 'form-control '
            if(this.desc.length > 10) this.validarCampos.desc = 'form-control '
            if(this.anexo != 0) this.validarCampos.anexo = 'form-control '
        },
        pegar: function (event) {
            this.storageRef = []
            this.file = []
            const inputTarget = event.target
            const file = inputTarget.files
            let storageRef
            this.anexo = file.length
            if(this.anexo != 0) this.validarCampos.anexo = 'form-control '
            if (file){
                const reader = new FileReader()
                reader.addEventListener('load', function(e) {
                    const readerTarget = e.target
                    // console.log(readerTarget.result)

                })
                for (let i = 0; i < file.length ; i++){
                    storageRef = ref(storage, `anexos/`);
                    this.storageRef.push(storageRef)
                    this.file.push(file[i])
                }
                
            }
        }
        },
        created(){
            onAuthStateChanged(auth, (user) => {
                if (user !== null) {
                    const email = user.email;
                    const uid = user.uid;
                    this.email = email
                } else {
                    this.$router.push({ name: "home" })
                }
                });
        }
    }
</script>


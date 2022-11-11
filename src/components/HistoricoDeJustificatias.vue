<template>
    <div class="bg-white bloco p-3" >
        <div class="d-flex flex-column mb-3">
            <h3>Processos:</h3>
            <div class="mb-4">
                <p>Filtros:</p>
                <div class="d-flex responsive bg-secondary bg-opacity-25 p-4 rounded flex-wrap">
                    <div class="d-flex flex-column mb-3 w-25">
                        <label for="text">Texto:</label>
                        <div class="inputWithIcon">
                            <input class="form-control form-control-L" type="search" @input="filtrar" name="texto">
                            <i class="bi bi-search" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="d-flex responsive flex-column mb-3 w-25">
                        <label for="text">Situação:</label>
                        <select class="form-select form-select-L" @input="situacaoFiltrar" name="selected" id="selected">
                            <option value="Selecione uma situação" selected>Selecione uma situação</option>
                            <option value="Andamento">Andamento</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Arquivado">Arquivado</option>
                        </select> <!-- form-contro-L é um media screen feito para ajustar o input para telas de <=544 -->
                    </div>
                </div>
                <hr>
                <div class="mt-4">
                    <paginate :list="list" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import app from './firebase/index'
    import { doc, getFirestore, collection, query,updateDoc ,arrayUnion, where, getDocs, addDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    const db = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;
import paginate from '@/components/paginate.vue'
    export default {
        name: 'HistoricoDeJustificativas',
        components:{
            paginate
        },
        data(){
            return{
                list:[],
                input: '',
                list1:[],
                situacao: 'Selecione uma situação'
            }
        },
        methods: {
            filtrar(event){
                this.input = event.target.value
                this.list = this.items
            },
            situacaoFiltrar(event){
                this.situacao = event.target.value
                this.list = this.items
            }
            
        },computed: {
            items() {
                let valores = []
                valores = this.list1.filter((item) =>{
                    return (
                        item.responsavel.toLowerCase().indexOf(this.input.toLowerCase()) > - 1 || 
                        item.ID.toLowerCase().indexOf(this.input.toLowerCase()) > - 1 ||
                        item.dataInicio.toLowerCase().indexOf(this.input.toLowerCase()) > - 1
                    )
                })
                
                valores = valores.filter((item) =>{
                    
                    if (this.situacao == 'Selecione uma situação'){ 
                        return item
                    }else{
                        return item.situacao === this.situacao
                    }
                })
                return valores
            }
        },
        created(){
            onAuthStateChanged(auth, async (user) => {
                if (user !== null) {
                    const email = user.email;
                    const uid = user.uid;
                    let email1 = email
                    let id;
                    const q = query(collection(db, "Usuarios"), where("email", "==", email1));
                    const resultado = await getDocs(q);
                    resultado.forEach((doc) => {
                    id = doc.id
                    this.list = doc.data().anexos
                    this.list1 = doc.data().anexos
                    });
                } else {
                    this.$router.push({ name: "login" })
                }
                });
        }
    }
</script>

<style scoped>
    body {
        background: rgba(255, 255, 255, 0.842);
    }
</style>

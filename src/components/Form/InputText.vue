<template>
    <label for="usuario">Matrícula:</label>
    <input :class="`${verificar} mt-2 mb-2`" type="text" :value="modelValue" @input="updateValue" >
</template>

<script>
    export default {
        name:'InputText',
        props:{
            verificar: String,
            modelValue: [String, Number], //fazer meu componente inputSenha  comunicar com o pai e filho  modelValue é uma palavra reservada para pegar o valor value do input
            name: [String]
        },
        data(){
            return{
                olho: true,
                type: 'password',
            }
        },
        methods: {
            trocar: function (event) {
                this.olho = !this.olho // trocando o icone do olho ao clicar em cima para o oposto
                this.type == 'password' ? this.type = 'text' : this.type = 'password' // exibe a senha ou esconde ela mudando o type dela de text para password
            },
            updateValue(event){
                this.$emit("update:modelValue", event.target.value) // está atulizando o value de acordo com o que está sendo digitado
            }

        }
    }
</script>

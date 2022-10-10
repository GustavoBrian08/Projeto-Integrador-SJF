<template>
    <div class="color">
        <h4><span class="fas fa-lock float"></span> Login:</h4>
        <hr>
        <form action="">
            <div><InputText/></div>
            <div><Submit/></div>
        </form>
    </div>
</template>

<script>
    import InputText from './Form/InputText.vue'
    import Submit from './Form/Submit.vue'
    export default{
        name:'Form',
        components:{
            InputText,
            Submit
        }
    }
</script>
<template>
    <div class="container form-group">
        <form
            id="app"
            @submit="checkForm"
            action="https://vuejs.org/"
            method="post"
        >
            <legend>Inscrever loja/artesã(o)</legend>
            <p v-if="errors.length">
                <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </p>
            <fieldset>
            <div class="form-group">
                <label for="name">Nome</label>
                <input
                    class="form-control"
                    id="name"
                    v-model="name"
                    type="text"
                    name="name"
                    placeholder="Nome"
                >
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input
                    class="form-control"
                    id="email"
                    v-model="email"
                    type="text"
                    name="email"
                    placeholder="email@email.com"
                >
            </div>

            <div class="form-group">
                <label for="tel">Telefone</label>
                <input
                    class="form-control"
                    id="tel"
                    v-model="tel"
                    type="text"
                    name="tel"
                    placeholder="(xx)xxxxx-xxxx"
                >
            </div>

            <div class="form-group">
                <label for="precos">Preços</label>
                <input
                    class="form-control"
                    id="precos"
                    v-model="prices"
                    type="text"
                    name="precos"
                    placeholder="Máscara pequena 5 reais e grande 10 reais. Duas pequenas por 8 reais."
                >
            </div>

            <p>
                <input
                type="submit"
                value="Enviar"
                >
            </p>
            </fieldset>
        </form>  
    </div>

</template>

<script>
import ApiService from '../ApiService'
export default {
    data() {
        return {
            errors: [],
            name: null,
            email: null,
            prices: null,
            tel:null,
            enviou: false,
            enviando: false
        }
    },
    methods:{
        checkForm: async function (e) {
            if (this.name && this.age) {
                return true;
            }

            e.preventDefault();

            this.errors = [];

            if (!this.name) {
                this.errors.push('O nome é obrigatório.');
                return;
            }
            if (!this.email) {
                this.errors.push('A email é obrigatória.');
                return;
            }
            if (!this.tel) {
                this.errors.push('A tel é obrigatória.');
                return;
            }
            if (!this.prices) {
                this.errors.push('A prices é obrigatória.');
                return;
            }

            let store = {};
            store.email = this.email;
            store.name = this.name;
            store.tel = this.tel;
            store.prices = this.prices;
            this.enviou = true;
            try {
                await ApiService.sendStore(store);
            } catch (error) {
                this.errors.push('Houve um problema ao enviar! Tente mais tarde! =/');
            }

        }
    } 
}
</script>
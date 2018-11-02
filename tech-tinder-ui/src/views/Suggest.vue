<template>
    <div>
        <h1>Suggest</h1>
        <section>
            <form @submit.prevent="addTechnology">
                <input name="name" v-model="name" placeholder="name"><br>
                <input name="description" v-model="description" placeholder="description"><br>
                <input type="submit" value="submit">
            </form>
        </section>

    </div>
</template>

<script>
    import TechnologyClient from '../clients/technology.js';

    export default {
        data() {
            return {
                name: null,
                description: null
            }
        },

        methods: {
            addTechnology: function() {
                TechnologyClient.add({
                    name: this.name,
                    description: this.description
                }).then(() => {
                    this.name = null;
                    this.description = null;
                });
            }
        }
    }
</script>


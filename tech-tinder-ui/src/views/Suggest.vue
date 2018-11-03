<template>
    <section>
        <div class="hero-body">
        <div class="container">
            <b-field label="Name">
                <b-input v-model="name"></b-input>
            </b-field>
            <b-field label="Description">
                <b-input maxlength="200" type="textarea" v-model="description"></b-input>
            </b-field>
            <p class="control buttons">
                <button class="button is-primary" @click="addTechnology">
                    <b-icon icon="plus-circle"></b-icon>
                    <span>Submit</span>
                </button>
                <button class="button is-light" @click="clear">
                    <b-icon icon="minus-circle"></b-icon>
                    <span>Cancel</span>
                </button>
            </p>
        </div>
        </div>
    </section>
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
                    clear();
                });
            },
            clear: function() {
                this.name = null;
                this.description = null;
            }
        }
    }
</script>


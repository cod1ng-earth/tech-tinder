<template>
    <section>
        <div class="hero-body">
            <div class="container">
                <form @submit.prevent="addTechnology">
                    <b-field label="Name">
                        <b-input v-model="name" required></b-input>
                    </b-field>
                    <b-field label="Description">
                        <b-input maxlength="200" type="textarea" v-model="description" required></b-input>
                    </b-field>
                    <p class="control buttons">
                        <button class="button is-primary" type="submit">
                            <b-icon icon="plus-circle"></b-icon>
                            <span>Submit</span>
                        </button>
                        <button class="button is-light" @click="reset">
                            <b-icon icon="minus-circle"></b-icon>
                            <span>Cancel</span>
                        </button>
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import TechnologyClient from '~/clients/technology.js';

    export default {
        data() {
            return {
                name: null,
                description: null
            }
        },

        methods: {
            addTechnology: function() {
                let loadingComponent = this.$loading.open({
                    container: null
                })

                TechnologyClient.add({
                    name: this.name,
                    description: this.description
                }).then(() => {
                    this.reset();

                    this.$toast.open({
                        message: 'Technology suggestion saved.',
                        type: 'is-success'
                    })
                    loadingComponent.close();
                }).catch((error) => {
                    this.$toast.open({
                        message: 'Save technology failed. ' + error,
                        type: 'is-danger'
                    })
                    loadingComponent.close();
                });
            },
            reset: function() {
                this.name = null;
                this.description = null;
            }
        }
    }
</script>


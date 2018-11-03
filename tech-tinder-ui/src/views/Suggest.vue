<template>
    <section>
        <div class="hero-body">
            <div class="container">
                <b-notification type="is-danger" :closable="false" v-if="!isLoggedIn">
                    Please log in.
                </b-notification>

                <form @submit.prevent="addTechnology" >
                    <b-field label="Name">
                        <b-input v-model="name" required></b-input>
                    </b-field>
                    <b-field label="Category">
                        <b-select required v-model="category">
                            <option value="languages & frameworks">languages & frameworks</option>
                            <option value="platforms">platforms</option>
                            <option value="techniques">techniques</option>
                            <option value="tools">tools</option>
                        </b-select>
                    </b-field>
                    <b-field label="Description">
                        <b-input maxlength="200" type="textarea" v-model="description" required></b-input>
                    </b-field>
                    <p class="control buttons">
                        <button class="button is-primary" type="submit" :disabled="isLoggedIn != true">
                            <b-icon icon="plus-circle"></b-icon>
                            <span>Submit</span>
                        </button>
                        <button class="button is-light" type="button" @click="reset">
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
import TechnologyClient from "~/clients/technology.js";

export default {
  data() {
    return {
      name: null,
      category: null,
      description: null
    };
  },

  computed: {
    username: function() {
      return localStorage.getItem("username");
    },
    isLoggedIn: function() {
      return this.username !== null;
    }
  },

  methods: {
    addTechnology: function() {
      if (!this.isLoggedIn) {
        return;
      }
      let loadingComponent = this.$loading.open({
        container: null
      });

      TechnologyClient.add({
        name: this.name,
        category: this.category,
        description: this.description,
        user: {
          name: this.username
        }
      })
        .then(() => {
          this.reset();

          this.$toast.open({
            message: "Technology suggestion saved.",
            type: "is-success"
          });
          loadingComponent.close();
        })
        .catch(error => {
          this.$toast.open({
            message: "Save technology failed. " + error,
            type: "is-danger"
          });
          loadingComponent.close();
        });
    },
    reset: function() {
      this.name = null;
      this.category = null;
      this.description = null;
    }
  }
};
</script>


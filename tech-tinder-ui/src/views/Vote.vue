<template>
    <section>
        <div class="hero-body">
            <div class="container" v-if="technology">
                <h1 class="title is-1">{{ technology.name }}</h1>
                <p class="title is-5" v-html="technology.description"/>
                <div class="field">
                    <b-radio v-model="opinion"
                        :disabled="!username"
                        @input="submitVote"
                        native-value="using"
                        size="is-large"
                        type="is-info">
                        using
                    </b-radio>
                </div>
                <div class="field">
                    <b-radio v-model="opinion"
                        :disabled="!username"
                        @input="submitVote"
                        native-value="evaluating"
                        size="is-large"
                        type="is-warning">
                        evaluating
                    </b-radio>
                </div>
                <div class="field">
                    <b-radio v-model="opinion"
                        :disabled="!username"
                        @input="submitVote"
                        native-value="interested"
                        size="is-large"
                        type="is-success">
                        interested
                    </b-radio>
                </div>
                <div class="field">
                    <b-radio v-model="opinion"
                        :disabled="!username"
                        @input="submitVote"
                        native-value="discouraged"
                        size="is-large"
                        type="is-danger">
                        discouraged
                    </b-radio>
                </div>
            </div>
        </div>
        <b-loading :active.sync="isLoading"></b-loading>
    </section>
</template>

<script>
import TechnologyClient from "~/clients/technology.js";

export default {
  data() {
    return {
      isLoading: true,
      opinion: "",
      technology: this.nextTechnology()
    };
  },

  computed: {
      username: function() {
          return localStorage.getItem('username');
      }
  },

  methods: {
    nextTechnology: function() {
      this.isLoading = true;

      TechnologyClient.getRandom()
        .then(data => {
          this.technology = data.result.res;
          this.isLoading = false;
        })
        .catch(error => {
          this.$toast.open({
            message: "Could not load random technology. " + error,
            type: "is-danger"
          });

          this.isLoading = false;
        });
    },
    submitVote: function() {
      TechnologyClient.addVote(this.technology._id, this.opinion, this.username).then(() => {
        this.$toast.open({
          message: "Vote saved.",
          type: "is-success"
        });

        this.opinion = "";
        this.nextTechnology();
      });
    }
  }
};
</script>

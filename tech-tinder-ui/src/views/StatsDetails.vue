<template>
    <section>
       <div class="container hero-body">
            <div class="box" v-if="stat">
                <div class="columns">
                    <div class="column is-hidden-tablet">
                        <div class="title is-4">{{ stat.name }}</div>
                        <div v-html="stat.description"></div>
                    </div>
                    <div class="column is-one-quarter">
                        <stats-chart :data-holder="createDataHolder(stat)" :options="barOptions"></stats-chart>
                    </div>
                    <div class="column is-hidden-mobile">
                        <div class="title is-4">{{ stat.name }}</div>
                        <div v-html="stat.description"></div>
                    </div>
                </div>
                <hr class="hr" />
                <div class="columns">
                    <div class="column">
                        <div class="title">using</div>
                        <p class="is-small" v-for="user in stat.users.using" :key="user">{{user}}</p>
                    </div>
                    <div class="column">
                        <div class="title">evaluating</div>
                        <p class="is-small" v-for="user in stat.users.evaluating" :key="user">{{user}}</p>
                    </div>
                    <div class="column">
                        <div class="title">interested</div>
                        <p class="is-small" v-for="user in stat.users.interested" :key="user">{{user}}</p>
                    </div>
                    <div class="column">
                        <div class="title">discouraged</div>
                        <p class="is-small" v-for="user in stat.users.discouraged" :key="user">{{user}}</p>
                    </div>
                </div>
            </div>
        </div>
        <b-loading :active.sync="isLoading"></b-loading>
    </section>
</template>
<script>
import TechnologyClient from "~/clients/technology";
import StatsChart from "@/StatsChart";

export default {
  components: {
    StatsChart
  },
  mounted() {
    this.loadStatsDetails();
  },
  data() {
    return {
      isLoading: true,
      stat: null,
      barOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    };
  },
  methods: {
    loadStatsDetails: function() {
      const techId = this.$route.params.id;

      TechnologyClient.getStatsDetails(techId)
        .then(data => {
          this.isLoading = false;

          let st = data.result;
          let results = st.votes.results;
          st.votes.results = Object.assign(
            { using: 0, evaluating: 0, interested: 0, discouraged: 0 },
            results
          );

          this.stat = st;
          this.isLoading = false;
        })
        .catch(error => {
          this.$toast.open({
            message: "Could not load stats details. " + error,
            type: "is-danger"
          });

          this.isLoading = false;
        });
    },
    createDataHolder: function(stat) {
      return {
        labels: Object.keys(stat.votes.results),
        datasets: [
          {
            label: stat.name,
            backgroundColor: "#f87979",
            data: Object.values(stat.votes.results),
            backgroundColor: [
              "rgba(32, 156, 238, 0.4)",
              "rgba(255, 221, 87, 0.4)",
              "rgba(35, 209, 96, 0.4)",
              "rgba(255, 56, 96, 0.4)"
            ]
          }
        ]
      };
    }
  }
};
</script>
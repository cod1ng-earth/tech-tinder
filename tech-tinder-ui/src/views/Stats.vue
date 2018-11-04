<template>
    <section>
        <div class="container hero-body">
          <div class="tabs is-toggle is-toggle-rounded">
            <ul>
              <li v-for="category in categories" :key="category" v-bind:class="{ 'is-active': currentCategory == category }">
                <a @click="currentCategory = category">
                  <span>{{category}}</span>
                </a>
              </li>
            </ul>
          </div>

            <div class="box" v-for="stat in stats[currentCategory]" :key="stat._id">
                <div class="media">
                    <div class="media-left">
                        <stats-chart :data-holder="createDataHolder(stat)" :options="barOptions"></stats-chart>
                    </div>
                    <div class="media-content">
                        <div class="title is-4"><router-link :to="'/stats/'+stat._id">{{ stat.name }}</router-link></div>
                        <div v-html="stat.description"></div>
                    </div>
                </div>
            </div>
        </div>
      <b-loading :active.sync="isLoading"></b-loading>
    </section>
</template>

<script>
import TechnologyClient from "~/clients/technology.js";
import StatsChart from "@/StatsChart";

const CATEGORIES = [
  "languages & frameworks",
  "tools",
  "platforms",
  "techniques"
];

export default {
  mounted() {
    this.loadStats();
  },
  data() {
    return {
      isLoading: true,
      stats: {},
      currentCategory: "languages & frameworks",
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
  computed: {
    categories: function() {
      return CATEGORIES;
    }
  },
  methods: {
    loadStats: function() {
      TechnologyClient.getStats()
        .then(data => {
          let stats = {};

          data.result.forEach(result => {
            let results = result.votes.results;
            result.votes.results = Object.assign(
              { using: 0, evaluating: 0, interested: 0, discouraged: 0 },
              results
            );
            if (!stats[result.category]) {
              stats[result.category] = [];
            }
            stats[result.category].push(result);
          });
          this.stats = stats;
          this.isLoading = false;
        })
        .catch(error => {
          this.$toast.open({
            message: "Could not load stats. " + error,
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
  },

  components: {
    StatsChart
  }
};
</script>


<template>
    <section>
        <div class="container" v-if="technologies.length > 0">
            
            <span class="tag is-info is-large tag-hint tag-top" :style="{ opacity: opacity.top }">interested</span>
            <span class="tag is-info is-large tag-hint tag-left" :style="{ opacity: opacity.left }">discouraged</span>
            <span class="tag is-info is-large tag-hint tag-right" :style="{ opacity: opacity.right }">using</span>
            <span class="tag is-info is-large tag-hint tag-bottom" :style="{ opacity: opacity.bottom }">evaluating</span>

            <div class="card-viewport">
              <div class="card-stack">
                <vue-swing 
                  v-for="technology in technologies" 
                  :key="technology._id"
                  :config="cardConfig"
                  @throwout="throwout"
                  @throwin="throwin"
                  >
                  <div class="box card-item" :data-key="technology._id" >
                    <h1 class="title is-3">{{ technology.name }}</h1>
                    <p class="is-5" v-html="technology.description"/>
                  </div>
                </vue-swing>
              </div>
            </div>
        </div>
          
        <b-loading :active.sync="isLoading"></b-loading>
    </section>
</template>

<script>
import TechnologyClient from "~/clients/technology.js";
import VueSwing from "vue-swing2";

const DIRECTION_MAP = {
  left: "discouraged",
  right: "using",
  up: "interested",
  down: "evaluating"
};

export default {
  mounted() {
    this.nextTechnology(5);
  },
  data() {
    return {
      isLoading: true,
      opinion: "",
      technologies: [],
      opacity: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      cardConfig: {
        minThrowOutDistance: 500,
        maxThrowOutDistance: 800,
        throwOutConfidence: this.throwOutConfidence,
        allowedDirections: [
          VueSwing.Direction.DOWN,
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT,
          VueSwing.Direction.UP
        ]
      }
    };
  },

  computed: {
    username: function() {
      return localStorage.getItem("username");
    }
  },

  methods: {
    nextTechnology: function(cnt) {
      this.isLoading = true;

      TechnologyClient.getRandom(cnt)
        .then(data => {
          this.technologies = data.result;
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
    opacityNull: function() {
      this.opacity = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      };
    },
    throwout: function(e) {
      const technologyId = e.target.dataset.key;
      this.technologies = this.technologies.filter(t => t._id != technologyId);
      this.opacityNull();

      switch (e.throwDirection) {
        case VueSwing.Direction.LEFT:
          this.submitVote(DIRECTION_MAP.left, technologyId);
          break;
        case VueSwing.Direction.RIGHT:
          this.submitVote(DIRECTION_MAP.right, technologyId);
          break;
        case VueSwing.Direction.UP:
          this.submitVote(DIRECTION_MAP.up, technologyId);
          break;
        case VueSwing.Direction.DOWN:
          this.submitVote(DIRECTION_MAP.down, technologyId);
          break;
      }
    },
    throwin: function() {
      this.opacityNull();
    },
    throwOutConfidence: function(xOffset, yOffset, element) {
      if (!this.username) {
        return 0;
      }
      const xConfidence = Math.min(
        (Math.abs(xOffset) / element.offsetWidth) * 2,
        1
      );
      const yConfidence = Math.min(
        (Math.abs(yOffset) / element.offsetHeight) * 2,
        1
      );
      const xDelta = (xOffset / element.offsetWidth) * 2;
      const yDelta = (yOffset / element.offsetHeight) * 2;
      const confidence = Math.max(xConfidence, yConfidence);
      if (xDelta > 0) {
        this.opacity.right = xDelta;
      } else {
        this.opacity.left = -xDelta;
      }
      if (yDelta > 0) {
        this.opacity.bottom = yDelta;
      } else {
        this.opacity.top = -yDelta;
      }

      return confidence;
    },
    directionMap: function() {
      return DIRECTION_MAP;
    },
    submitVote: function(opinion, technologyId) {
      /*
      console.log(opinion, technologyId);
      return;
      */

      TechnologyClient.addVote(technologyId, opinion, this.username).then(
        () => {
          this.$toast.open({
            message: `Your vote has been casted: ${opinion}`,
            type: "is-success"
          });
          if (this.technologies.length == 0) {
            this.nextTechnology(5);
          }
        }
      );
    }
  },
  components: {
    VueSwing
  }
};
</script>

<style>
.card-viewport {
  width: 98%;
  height: 500px;
  background: white;

  margin: 5px auto 0;
  position: relative;
}

.card-viewport .card-stack {
  width: 100%;
  height: 450px;
  background: white;
  position: absolute;
  top: 5px;
}

.card-viewport .card-item {
  width: 90%;
  height: 550px;
  background: #fff;
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 5%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 1px 1px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  cursor: default;
  overflow: hidden;
  border-bottom: 15px solid white;
}

.card-viewport .card-item.in-deck:nth-child(3) {
  top: 5px;
  transform: translate(5px, 5px) rotate(0.4deg);
}

.card-viewport .card-item.in-deck:nth-child(2) {
  top: 4px;
  transform: translate(-4px, -2px) rotate(-1deg);
}

.tag-hint {
  position: absolute;
  z-index: 1;
  opacity: 0;
}

.tag-top {
  top: 10px;
  left: 38%;
}

.tag-left {
  top: 50%;
  left: 10px;
}

.tag-right {
  top: 50%;
  right: 10px;
}

.tag-bottom {
  bottom: 10px;
  left: 36%;
}

@media only screen and (min-width: 640px) {
  .card-viewport {
    width: 60%;
    margin: 10px auto 0;
  }
  .card-viewport .card-stack {
    margin-top: 30px;
  }
  .card-viewport .card-item {
    width: 90%;
    height: 450px;
    margin-left: 5%;
  }
  .tag-top {
    left: 48%;
  }
  .tag-bottom {
    left: 47%;
  }
}
</style>

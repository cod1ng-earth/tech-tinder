<template>
  <section>
    <div class="hero-body">
      <div class="container">
        <div>
          <h1 class="title">Tech-Tinder</h1>
          <p class="subtitle is-5"><a href="https://tech-tinder.netlify.com">https://tech-tinder.netlify.com</a></p>
          <p class="subtitle is-5"><a href="https://github.com/coding-berlin/tech-tinder" target="_blank">https://github.com/coding-berlin/tech-tinder</a></p>
          <p>Made with 🍕 during <a href="https://www.codecamp-heilbronn.de/" target="_blank">Codecamp Heilbronn 2018</a>.</p>
          <div class="columns">
            <div class="column">
              <img :src="qr" alt="qr code" />
            </div>
            <div class="column">
              <h1 class="title is-size-1">
                https://is.gd/hsnbrg
              </h1>
            </div>
            </div>
        </div>
        <div>
          <h2 class="title">Team Heisenberg</h2>
          <div class="columns">
            <div class="column">
              <div class="card">
                <div class="card-image">
                  <figure class="image">
                      <img class="is-rounded" src="https://pbs.twimg.com/profile_images/1043621879565697027/bbNyS2na_400x400.jpg" alt="@stadolf" />
                  </figure>
                </div>
                <div class="card-content has-text-centered">
                  <p class="title is-5">Stefan Adolf</p>
                  <div class="subtitle is-7">
                    <p><a href="https://twitter.com/stadolf"><i class="fab fa-twitter"></i> @stadolf</a><p>
                    <p><a href="https://github.com/elmariachi111"><i class="fab fa-github"></i> elmariachi111</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="card">
                <div class="card-image">
                  <figure class="image">
                      <img class="is-rounded is-1by1" src="https://pbs.twimg.com/profile_images/1644913323/4997364904_379244b53a_o_small_400x400.jpg" alt="@vollbio_de"/>
                  </figure>
                </div>
                <div class="card-content has-text-centered">
                  <p class="title is-5">Robert Krüger</p>  
                  <div class="subtitle is-7">
                    <p><a href="https://twitter.com/vollbio_de"><i class="fab fa-twitter"></i> @vollbio_de</a><p>
                    <p><a href="https://github.com/vollbio"><i class="fab fa-github"></i> vollbio</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
                <div class="card">
                <div class="card-image">
                  <figure class="image">
                      <img class="is-rounded is-1by1" src="https://avatars3.githubusercontent.com/u/11131751?s=460&v=4" alt="@PranavGulati95" />
                  </figure>
                </div>
                <div class="card-content has-text-centered">                
                  <p class="title is-5">Pranav Gulati</p>  
                  <div class="subtitle is-7">
                    <p><a href="https://twitter.com/PranavGulati95"><i class="fab fa-twitter"></i> @PranavGulati95</a><p>
                    <p><a href="https://github.com/Pranavgulati"><i class="fab fa-github"></i> Pranavgulati</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="card ">
                <div class="card-image">
                  <figure class="image">
                      <img class="is-rounded is-1by1" src="https://rotfuks.de/static/img/assets/profile.jpeg" alt="@PranavGulati95" />
                  </figure>
                </div>
                <div class="card-content has-text-centered">
                  <p class="title is-5">Dominik Kress</p>
                  <div class="subtitle is-7">
                    <p><a href="https://github.com/Rotfuks"><i class="fab fa-github"></i> Rotfuks</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="card">
                <div class="card-image">
                  <figure class="image">
                      <img class="is-rounded is-1by1" src="https://pbs.twimg.com/profile_images/501657315884662784/6PlH-UCl_400x400.jpeg" alt="@PranavGulati95" />
                  </figure>
                </div>
                <div class="card-content has-text-centered">                
                  <p class="title is-5">Jan Esser</p>  
                  <div class="subtitle is-7">
                    <p><a href="https://twitter.com/januszesser"><i class="fab fa-twitter"></i> @januszesser</a><p>
                    <p><a href="https://github.com/janesser"><i class="fab fa-github"></i> janesser</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      qr: require("../assets/qr.png")
    };
  }
};
</script>
<style scoped>
.card-image .is-rounded {
  margin: 0 auto;
  padding: 10px;
}
</style>

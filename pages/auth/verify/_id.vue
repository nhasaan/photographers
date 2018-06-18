<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        photographers
      </h1>
      <h2 class="subtitle">{{message}}</h2>
      <div class="links" v-show="linkShow">
        <nuxt-link to="/auth/signin" class="button--green">Lets go sign in</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";

export default {
  auth: false,
  components: {
    AppLogo
  },
  data () {
    return {
      message: "Your email is being verified. Please wait...",
      linkShow: false
    }
  },
  head() {
    return {
      title: `Verify Email`
    }
  },
  async asyncData({ params }) {
    // console.log("p:" + params.id)
    let response = await fetch(`${process.env.baseUrl}/verify/${params.id}`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" }
    });
    console.log(response);
    if(response.success) {
      this.message = response.message
      this.linkShow = true
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: bold;
  font-size: 20px;
  color: #35495e;
  text-transform: uppercase;
}

.subtitle {
  font-weight: 300;
  font-size: 20px;
  color: #526488;
  word-spacing: 5px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.form-group {
  text-align: left;
}

.form-group input {
  width: 100%;
  padding: 5px;
  margin: 10px 0;
}
</style>

<template>
  <section class="container">
    <div class="container">
      <app-logo/>
      <h1 class="title">
        photographers
      </h1>
      <div class="container links">
        <h2 class="subtitle">Photographers Signin</h2>
      </div>
    </div>
    <hr>
    <div class="container">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input v-model="email" class="input" type="email" name="email" placeholder="Email input">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"/>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"/>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input v-model="password" class="input" type="password" name="password" placeholder="Password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"/>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control">
          <button class="button is-success" @click="login">
            Signin
          </button>
          New User? <nuxt-link to="/auth/signup">Register Now</nuxt-link>
        </p>
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
  asyncData() {
    return {
      formError: null,
      email: "",
      password: ""
    };
  },
  methods: {
    /* --------------Start login-------------- */
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(result => {
          console.log(result);
          this.email = "";
          this.password = "";
          this.formError = null;

          if (this.$store.state.userinfo) {
            this.$router.push("/admin");
          }
          // if (this.$store.state.userinfo.profile_type === 'P') {
          //   this.$router.push('/profile/provider/provider-dashboard')
          // } else {
          //   this.$router.push('/dashboard')
          // }
        })
        .catch(e => {
          this.formError = e.message;
        });
    }
    /* --------------End login-------------- */
  }
};
</script>

<style>
/*.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}*/

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

/*.list {
  width: 100%;
}*/

.list {
  padding: 0;
  margin: 0;
  list-style: none;
  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
}

.row {
  -webkit-flex-direction: row;
  flex-direction: row;
}
</style>

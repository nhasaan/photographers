<template>
  <section class="container">
    <div class="container">
      <app-logo/>
      <h1 class="title">
        photographers
      </h1>
      <div class="container links">
        <h2 class="subtitle">Photographers Signup</h2>
      </div>
    </div>
    <hr>
    <div class="container">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input v-validate="'required'" v-model="name" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Full name">
          <span class="icon is-small is-left">
            <i class="fas fa-man"/>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"/>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"/>
            <i v-show="errors.has('name')" class="fa fa-warning"/>
          </span>
          <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input v-validate="'required|email'" v-model="email" :class="{'input': true, 'is-danger': errors.has('email') }" type="email" placeholder="Email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"/>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"/>
            <i v-show="errors.has('email')" class="fa fa-warning"/>
          </span>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input v-validate="'required'" v-model="password" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"/>
          </span>
          <span class="icon is-small is-right">
            <i v-show="errors.has('password')" class="fa fa-warning"/>
          </span>
          <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input v-validate="'required|confirmed:c_password'" v-model="c_password" :class="{'input': true, 'is-danger': errors.has('c_password') }" type="password" placeholder="confirm password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"/>
          </span>
          <span class="icon is-small">
            <i v-show="errors.has('c_password')" class="fas fa-warning"/>
          </span>
          <span v-show="errors.has('c_password')" class="help is-danger">{{ errors.first('c_password') }}</span>
        </p>
      </div>

      <div class="field">
        <p class="control">
          <button class="button is-success" @click="signup()">
            Sign up
          </button>
          Already have an account? <nuxt-link to="/auth/signin">Sign in</nuxt-link>
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
  head() {
    return {
      title: `Sign up`
    };
  },
  asyncData() {
    return {
      formError: null,
      email: "",
      password: "",
      c_password: "",
      name: ""
    };
  },
  methods: {
    /* --------------Start Signup-------------- */
    async signup() {
      let response = await fetch(`${process.env.baseUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
          c_password: this.c_password
        })
      });
      let result = await response.json();
      console.log(result);
      if (result.success) {
        this.$message({
          showClose: true,
          message: "Congrats, successfuly signup.",
          type: "success"
        });
        this.$router.push("/admin");
      } else {
        if (result.error.code === 11000) {
          this.$message({
            showClose: true,
            message: ` Please filled out all required field`,
            type: "error"
          });
        }
      }
    }
    /* --------------End Signup-------------- */
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

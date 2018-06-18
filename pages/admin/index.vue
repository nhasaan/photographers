<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        photographers
      </h1>
      <div class="links">
        <nuxt-link to="/admin/upload-photo" class="button--green">Upload Photo(s)</nuxt-link>
        <nuxt-link to="/admin/photos" class="button--green">My Photos</nuxt-link>
        <nuxt-link to="/admin/sharephoto" class="button--green">Shared Photos</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";

export default {
  components: {
    AppLogo
  },
  middleware: "auth"
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

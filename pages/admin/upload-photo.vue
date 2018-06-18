<template>
  <section class="container">
    <div class="container">
      <app-logo/>
      <h1 class="title">
        photographers
      </h1>
      <div class="container links">
        <nuxt-link to="/admin/upload-photo" class="button--green">Upload Photo(s)</nuxt-link>
        <nuxt-link to="/admin/photos" class="button--green">My Photos</nuxt-link>
        <nuxt-link to="/admin/sharephoto" class="button--green">Shared Photos</nuxt-link>
      </div>
    </div>
    <hr>
    <div class="container">
      <form id="upload-photo" enctype="multipart/data">
        <div class="columns">
          <div class="column is-one-third">
            <figure class="image is-128x128">
              <img src="https://bulma.io/images/placeholders/128x128.png" align="left">
            </figure>
          </div>
          <div class="column">
            <p class="is-danger form-errors" style="font-weight: bold;">
              <span v-for="(pic, index) in formErrors.picture" v-show="typeof formErrors.picture != 'undefined'" :key="index" class="help is-danger">{{ pic }}</span>
              <span v-for="(ttle, ti) in formErrors.title" v-show="typeof formErrors.title != 'undefined'" :key="`t-${ti}`" class="help is-danger">{{ ttle }}</span>
            </p>
          </div>
        </div>
        <div class="field">
          <label>Choose an image to upload</label>
          <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('picture') }" name="picture" type="file" placeholder="Choose image" @change="onFileChange">
          <!-- <span v-show="errors.has('picture')" class="help is-danger">{{ errors.first('picture') }}</span> -->
        </div>

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-validate="'required'" v-model="title" :class="{'input': true, 'is-danger': errors.has('title') }" type="text" placeholder="Photo title">
            <span class="icon is-small is-left">
              <i class="fa fa-pencil"/>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"/>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <input v-model="description" :class="{'input': true, 'is-danger': errors.has('description') }" type="text" placeholder="Description">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"/>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <label class="checkbox">
              <input v-model="is_visible" :true-value="1" :false-value="0" type="checkbox">
              Is Visible?
            </label>
          </p>
        </div>

        <div class="field">
          <p class="control">
            <button type="button" class="button is-success" @click="uploadImage">
              Upload
            </button>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";

export default {
  components: {
    AppLogo
  },
  middleware: "auth",
  data() {
    return {
      formErrors: [],
      title: "",
      description: "",
      is_visible: 1,
      picture: "",
      headers: { Authorization: `Bearer ${this.$store.state.authUser}` }
    };
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      // console.log(files[0])
    },
    createImage(file) {
      console.log(file);
      let reader = new FileReader();
      let vm = this;
      reader.onload = e => {
        vm.picture = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImage() {
      this.$nuxt.$loading.start();
      var formData = new FormData();
      // console.log(this.picture)
      // Fields in the post
      formData.append("picture", this.picture);
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("is_visible", this.is_visible);
      const url = `${process.env.baseUrl}/upload`;
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.authUser}`
        },
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          this.formErrors = [];
          if (responseJson.errors) {
            this.formErrors = responseJson.errors;
            // console.log(this.formErrors.length)
          }
          if (responseJson.success) {
            this.$router.push("/admin/photos");
          }
        })
        .catch(error => {
          console.log("formError: " + error);
          // this.postSubmit(['Oops, something Went Wrong.'])
        });

      this.$nuxt.$loading.finish();
    }
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

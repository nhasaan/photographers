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
      <h2 class="list-gallery">List Of Photos</h2>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th><abbr title="ID">ID</abbr></th>
            <th>Photo</th>
            <th><abbr title="Title">Title</abbr></th>
            <th><abbr title="Description">Description</abbr></th>
            <th><abbr title="Visible?">Visible</abbr></th>
            <th><abbr title="Created">Created</abbr></th>
            <th><abbr title="Updated">Updated</abbr></th>
            <th>Actions</th>
          </tr>
        </thead>
        <!-- <tfoot>
          <tr>
            <th><abbr title="Position">Pos</abbr></th>
            <th>Team</th>
            <th><abbr title="Played">Pld</abbr></th>
            <th><abbr title="Won">W</abbr></th>
            <th><abbr title="Drawn">D</abbr></th>
            <th><abbr title="Lost">L</abbr></th>
            <th><abbr title="Goals for">GF</abbr></th>
            <th><abbr title="Goals against">GA</abbr></th>
            <th><abbr title="Goal difference">GD</abbr></th>
            <th><abbr title="Points">Pts</abbr></th>
            <th>Qualification or relegation</th>
          </tr>
        </tfoot> -->
        <tbody>
          <tr v-for="(item, index) in photos_mine" :key="index">
            <th>{{ item.id }}</th>
            <td>
              <figure class="image is-128x128">
                <img :src="`http://photographers.test/storage/images/${item.picture}`" width="128" height="128" style="clear: both; max-height: 100px;">
              </figure>
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.is_visible == 1 ? 'Visible' : 'Private' }}</td>
            <td>{{ item.created_at }}</td>
            <td>{{ item.updated_at }}</td>
            <td>
              <a href="javascript:;" class="button is-link is-small" @click="share(item)">Share this photo</a>&nbsp;
              <div class="share-btn-wrap" v-if="item.clicked">
                <label>Email to share with</label>
                <p>
                  <input type="email" required name="with_email" v-model="with_email" placeholder="e.g something@email.com">
                </p>
                <p>
                  <button @click="sharePhoto(item)" class="button is-primary is-small">Share</button>
                  <button @click="closeShare(item)" class="button is-small">Close</button>
                </p>
              </div>
              <!-- <a href="javascript:;" class="button is-small is-danger">Delete</a> -->
            </td>
          </tr>
        </tbody>
      </table>
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
      formData: [],
      with_email: "",
      pathTtoFile: "",
      download_photo: "",
      headers: { Authorization: `Bearer ${this.$store.state.authUser}` }
    };
  },
  async asyncData({ store }) {
    store.commit("SET_HEAD", ["Photo gallery", "Manage your photos here"]);
    let response = await fetch(`${process.env.baseUrl}/photos/mine`, {
      method: "GET",
      headers: { Authorization: `Bearer ${store.state.authUser}` }
    });
    let result = await response.json();
    return {
      photos_mine: result.photos_mine,
      headers: { Authorization: `Bearer ${store.state.authUser}` }
    };
  },
  methods: {
    share(data) {
      console.log(data);
      if (data.hasOwnProperty("clicked")) {
        data.clicked = !data.clicked;
      } else {
        data = this.$set(data, "clicked", true);
      }
    },
    closeShare(data) {
      data = this.$set(data, "clicked", false);
    },
    async sharePhoto(item) {
      console.log(item);
      console.log(this.with_email);
      // return false;
      // this.$nuxt.$loading.start();
      const url = `${process.env.baseUrl}/photos/share`;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.authUser}`,
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({
          photo_id: item.id,
          with_email: this.with_email
        })
      });
      console.log(response);

      // this.$nuxt.$loading.finish();
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

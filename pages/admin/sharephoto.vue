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
          <tr v-for="(item, index) in sharedPhotos" :key="index">
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
              <a :data-path-to-file="`http://photographers.test/storage/images/${item.picture}`" href="javascript:;" @click="downloadPhoto(item, index)">
                  <i class="fa fa-download"/>
                  download
                </a>
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
    let response = await fetch(`${process.env.baseUrl}/photos/shared`, {
      method: "GET",
      headers: { Authorization: `Bearer ${store.state.authUser}` }
    });
    let result = await response.json();
    return {
      sharedPhotos: result.data,
      headers: { Authorization: `Bearer ${store.state.authUser}` }
    };
  },
  methods: {
    downloadPhoto(item, index) {
      // console.log(index);
      // var formData = new FormData();
      // formData.append("pathToFile", `${process.env.baseImgUrl}${item.picture}`);
      // this.$nuxt.$loading.start();
      const url = `${process.env.baseUrl}/photos/download`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.$store.state.authUser}`,
          ResponseType: "arraybuffer"
        }
      })
        .then(response => {
          // console.log(response);
          // window.open(response);
          this.downloadFile(response, "test");
          // let blob = new Blob([response.data]);
          // let link = document.createElement("a");
          // link.href = window.URL.createObjectURL(blob);
          // link.download = "test.jpg";
          // link.click();
          // The actual download
          // let blob = new Blob([response.blob()], {
          //     type: response.headers["content-type"]
          //   }),
          //   filename = (response.headers["Content-Disposition"] || "").split(
          //     "filename="
          //   )[1];
          // var link = document.createElement("a");
          // link.href = window.URL.createObjectURL(blob);
          // link.download = filename;
          // link.click();
          // document.body.removeChild(link);
          // var pom = document.createElement('a');
          // pom.setAttribute('href', 'data:application/octet-stream,' + response);
          // pom.setAttribute('download', 'nice-name.jpeg');
          // pom.style.display = 'none';
          // document.body.appendChild(pom);
          // pom.click();
          // document.body.removeChild(pom);
          // this.formErrors = [];
          // window.location = `${process.env.baseImgUrl}${response}`
          // if (responseJson.errors) {
          //   // this.formErrors = responseJson.errors
          //   // console.log(this.formErrors.length)
          // }
          // if (responseJson.success) {
          //   this.$router.push("/admin/photos");
          // }
        })
        .catch(error => {
          console.log(error);
          // this.postSubmit(['Oops, something Went Wrong.'])
        });

      // this.$nuxt.$loading.finish();
    },
    downloadFile(response, filename) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([response.body], { type: "image" });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement("a");
      link.href = data;
      link.download = filename + ".jpg";
      link.click();
      setTimeout(function() {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
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

<template>
  <div class="container-fluid ps-0 pe-1">
    <div class="row g-2">
      <div
        class="col-2 col-md-3 col-lg-2 pe-0 bg-dark"
        style="min-height: 100vh"
      >
        <AdminNavbarComp :detectWidth="detectWidth" />
      </div>
      <div class="col-10 col-md-9 col-lg-10 bg-light" style="min-height: 100vh">
        <div class="container my-3">
          <div class="row">
            <RouterView v-if="checkSuccess" :detectWidth="detectWidth" />
          </div>
        </div>
      </div>
    </div>
    <ToastComp />
  </div>
</template>

<script>
import AdminNavbarComp from "@/components/admin/AdminNavbarComp.vue";
import emitter from "@/utility/emitter.js";
import ToastComp from "@/components/ToastComp.vue";

export default {
  data() {
    return {
      checkSuccess: false,
      detectWidth: null,
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  components: {
    AdminNavbarComp,
    ToastComp,
  },
  methods: {
    checkAdmin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)edomaezushitoken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        this.$http
          .post(`${process.env.VUE_APP_API}/api/user/check`, {
            api_token: this.token,
          })
          .then(() => {
            this.checkSuccess = true;
          })
          .catch((err) => {
            alert(err.response.data.message);
            this.$router.push("/login");
          });
      } else {
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.checkAdmin();

    this.detectWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      this.detectWidth = window.innerWidth;
    });
  },
};
</script>

<style lang="scss">
@media (max-width: 991.98px) {
  .customer-card {
    border: 1px solid var(--bs-dark) !important;
    padding: 1rem;
  }
}
</style>

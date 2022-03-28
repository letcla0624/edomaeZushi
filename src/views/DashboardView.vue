<template>
  <div class="container-fluid ps-0 pe-1">
    <div class="row g-2">
      <div
        class="col-2 col-md-3 col-lg-2 pe-0 bg-dark"
        style="min-height: 100vh"
      >
        <AdminNavbarComp :detectWidth="detectWidth"></AdminNavbarComp>
      </div>
      <div class="col-10 col-md-9 col-lg-10 bg-light" style="min-height: 100vh">
        <div class="container my-3">
          <div class="row">
            <!-- <div class="d-flex align-items-center justify-content-end my-3">
              <div class="search ms-2">
                <div class="input-group">
                  <span class="input-group-text" id="search">
                    <i class="bi bi-search text-secondary"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="搜尋"
                    aria-label="search"
                    aria-describedby="search"
                  />
                </div>
              </div>
            </div> -->
            <router-view
              v-if="checkSuccess"
              :detectWidth="detectWidth"
            ></router-view>
          </div>
        </div>
      </div>
    </div>
    <ToastComp></ToastComp>
  </div>
</template>

<script>
import AdminNavbarComp from "@/components/AdminNavbarComp.vue";
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
    //  檢查登入
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
            // console.log(res.data);
            // if (res.data.success === true) {
            //   alert("登入成功");
            // }
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

    // 初判斷一進入的螢幕寬度
    this.detectWidth = window.innerWidth;
    // 螢幕寬度縮放
    window.addEventListener("resize", () => {
      this.detectWidth = window.innerWidth;
    });
  },
};
</script>

<style lang="scss">
// 手機版列表
@media (max-width: 992px) {
  .customer-card {
    border: 1px solid var(--bs-dark) !important;
    padding: 1rem;
  }
}
</style>

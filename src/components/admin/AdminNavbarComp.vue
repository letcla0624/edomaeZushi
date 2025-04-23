<template>
  <nav
    class="nav flex-column align-items-start justify-content-between sticky-top"
    style="min-height: 100vh"
  >
    <div class="admin-nav w-100">
      <h1
        class="text-center my-3 my-md-5 pb-md-5"
        :class="{ 'text-center': detectWidth < 768 }"
      >
        <RouterLink to="/">
          <LogoWhiteComp v-if="detectWidth >= 768" />
          <LogoWhiteCubeComp v-else style="max-width: 80px; width: 80%" />
        </RouterLink>
      </h1>
      <ul class="navbar-nav list-unstyled">
        <li class="nav-item ms-1 ms-md-3 py-3">
          <RouterLink
            to="/admin"
            class="nav-link py-3"
            :class="{ 'text-center': detectWidth < 768 }"
          >
            <i class="bi bi-list-check mx-md-3"></i>
            <span v-if="detectWidth >= 768">產品列表</span>
          </RouterLink>
        </li>
        <li class="nav-item ms-1 ms-md-3 py-3">
          <RouterLink
            to="/admin-orders"
            class="nav-link py-3"
            :class="{ 'text-center': detectWidth < 768 }"
          >
            <i class="bi bi-file-text mx-md-3"></i>
            <span v-if="detectWidth >= 768">顧客訂單</span>
          </RouterLink>
        </li>
        <li class="nav-item ms-1 ms-md-3 py-3">
          <RouterLink
            to="/admin-coupons"
            class="nav-link py-3"
            :class="{ 'text-center': detectWidth < 768 }"
          >
            <i class="bi bi-percent mx-md-3"></i>
            <span v-if="detectWidth >= 768">折扣碼列表</span>
          </RouterLink>
        </li>
      </ul>
    </div>
    <a
      href="#"
      class="nav-link ms-1 ms-md-3 py-5 w-100"
      :class="{ 'text-center': detectWidth < 768 }"
      @click.prevent="logOut"
    >
      <i class="bi bi-box-arrow-right mx-md-3"></i>
      <span v-if="detectWidth >= 768">登出</span>
    </a>
  </nav>
</template>

<script>
import LogoWhiteComp from "../logo/LogoWhiteComp.vue";
import LogoWhiteCubeComp from "../logo/LogoWhiteCubeComp.vue";

export default {
  props: ["detectWidth"],
  components: {
    LogoWhiteComp,
    LogoWhiteCubeComp,
  },
  methods: {
    logOut() {
      let loader = this.$loading.show();
      this.$http
        .post(`${process.env.VUE_APP_API}/logout`)
        .then((res) => {
          loader.hide();
          alert(res.data.message);
          this.$router.push("/login");
        })
        .catch((err) => {
          loader.hide();
          alert(err.response.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-nav {
  .nav-link {
    color: #fff;
  }
  .nav-link.active {
    position: relative;
    height: 100%;
    background-color: var(--bs-light);
    border-radius: 50px 0 0 50px;
    color: var(--bs-dark) !important;
    &::after {
      position: absolute;
      content: url("@/assets/images/bottom.png");
      width: 50px;
      height: 50px;
      right: 0px;
      bottom: -50px;
    }
    &::before {
      position: absolute;
      content: url("@/assets/images/top.png");
      width: 50px;
      height: 50px;
      right: 0px;
      top: -50px;
    }
  }
}
</style>

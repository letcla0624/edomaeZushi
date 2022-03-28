<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 bg-light shop-bg">
        <div class="container pt-3 pb-4 py-lg-5 px-0 px-md-3">
          <router-view name="left" :detectWidth="detectWidth"></router-view>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="container mt-3 py-5 px-0 px-md-3 user-form">
          <router-view name="right"></router-view>
        </div>
      </div>
    </div>
  </div>
  <ToastComp></ToastComp>
</template>

<script>
import emitter from "@/utility/emitter.js";
import ToastComp from "@/components/ToastComp.vue";

export default {
  data() {
    return {
      detectWidth: null,
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  components: {
    ToastComp,
  },
  mounted() {
    // 初判斷一進入的螢幕寬度
    this.detectWidth = window.innerWidth;
    // 螢幕寬度縮放
    window.addEventListener("resize", () => {
      this.detectWidth = window.innerWidth;
    });
  },
};
</script>

<style lang="scss" scoped>
.shop-bg {
  min-height: 100vh;
}
@media (max-width: 991.98px) {
  .shop-bg {
    min-height: auto;
  }
}
.user-form {
  position: sticky;
  top: 25px;
}
@media (max-width: 991.98px) {
  .user-form {
    position: static;
  }
}
</style>

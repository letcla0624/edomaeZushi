<template>
  <div
    class="container-fluid d-grid align-items-center paper"
    style="min-height: 100vh"
  >
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
        <div class="text-center">
          <div
            class="card bg-white border-0 shadow-lg mx-auto p-4"
            style="max-width: 440px"
          >
            <div class="card-header py-5">
              <LogoComp></LogoComp>
              <h2 class="card-title mb-0 mt-n3">スタッフログイン</h2>
            </div>
            <div class="card-body">
              <VForm v-slot="{ errors }" ref="form" @submit="login">
                <div class="form-floating mb-3">
                  <VField
                    type="email"
                    name="電子メールアドレス"
                    class="form-control border-0 border-bottom rounded-0"
                    :class="{ 'is-invalid': errors['電子メールアドレス'] }"
                    id="username"
                    placeholder="name@example.com"
                    rules="email|required"
                    v-model="user.username"
                  ></VField>
                  <ErrorMessage
                    name="電子メールアドレス"
                    class="invalid-feedback text-start"
                  ></ErrorMessage>
                  <label for="username">電子メールアドレス</label>
                </div>
                <div class="position-relative">
                  <div class="form-floating">
                    <VField
                      :type="pwd ? 'password' : 'text'"
                      name="パスワード"
                      class="form-control border-0 border-bottom rounded-0"
                      :class="{ 'is-invalid': errors['パスワード'] }"
                      id="password"
                      ref="password"
                      placeholder="password"
                      rules="required"
                      v-model="user.password"
                      @keyup.enter="login"
                    ></VField>
                    <ErrorMessage
                      name="パスワード"
                      class="invalid-feedback text-start"
                    ></ErrorMessage>
                    <label for="password">パスワード</label>
                  </div>
                  <span class="card__showPwd" @click="showPwd">
                    <i class="bi bi-eye-slash" v-if="pwd"></i>
                    <i class="bi bi-eye" v-else></i>
                  </span>
                </div>
                <button class="btn btn-dark w-100 mt-5" type="submit">
                  登入<i class="bi bi-box-arrow-in-right ms-2"></i>
                </button>
              </VForm>
              <router-link to="/" class="btn btn-link mt-3"
                >フロントページに戻る</router-link
              >
            </div>
          </div>
          <p class="fs-7 my-3 text-muted">
            &copy; {{ year }} <strong>edomaezushi.</strong> All Rights Reserved.
            Designed by Will Wu.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoComp from "@/components/LogoComp.vue";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      year: null,
      pwd: 1,
    };
  },
  components: {
    LogoComp,
  },
  methods: {
    login() {
      let loader = this.$loading.show();
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          loader.hide();
          const { token, expired } = res.data;
          document.cookie = `edomaezushitoken=${token}; expires=${new Date(
            expired
          )}`;
          this.$router.push("/admin");
        })
        .catch((err) => {
          loader.hide();
          alert(err.response.data.message);
        });
    },
    getDate() {
      let date = new Date();
      this.year = date.getFullYear();
    },
    // 顯示 or 隱藏密碼
    showPwd() {
      this.pwd = !this.pwd;
    },
  },
  mounted() {
    this.getDate();
  },
};
</script>

<style lang="scss" scoped>
.card__showPwd {
  position: absolute;
  top: 20%;
  right: 40px;
  cursor: pointer;
}
</style>

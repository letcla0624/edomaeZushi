<template>
  <div class="text-start">
    <ul class="list-unstyled d-inline-block lh-lg gap-2 mb-5 check-flow">
      <li class="fs-7 fw-bold d-inline">
        <RouterLink to="/cart">
          <span class="badge rounded-pill bg-dark me-2"> 1 </span>
          カート
        </RouterLink>
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li class="fs-7 fw-bold d-inline">
        <span class="badge rounded-pill bg-dark me-2"> 2 </span>
        注文を作成する
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li class="fs-7 fw-bold d-inline opacity-25">
        <span class="badge rounded-pill bg-dark me-2"> 3 </span>
        支払い
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li class="fs-7 fw-bold d-inline opacity-25">
        <span class="badge rounded-pill bg-dark me-2"> 4 </span>
        終了した
      </li>
    </ul>
  </div>
  <div class="row">
    <div class="col-lg-10 col-xl-8">
      <div class="mb-5">
        <h2 class="h5 fw-bold">聯繫信息</h2>
        <p>
          私書箱への発送はできません。
          私書箱に入ると、注文はキャンセルされますのでご注意ください。
        </p>
      </div>
      <VForm v-slot="{ errors }" class="row g-3" ref="form" @submit="sentOrder">
        <div class="col-12">
          <label for="email" class="form-label fw-bold">
            <span class="text-deep-red">*</span>
            購入者の電子メールアドレス</label
          >
          <VField
            id="email"
            name="電子メールアドレス"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['電子メールアドレス'] }"
            placeholder="service@edomaezushi.co.jp"
            rules="required|email"
            v-model="form.user.email"
          ></VField>
          <ErrorMessage
            name="電子メールアドレス"
            class="invalid-feedback"
          ></ErrorMessage>
        </div>
        <div class="col-12">
          <label for="name" class="form-label fw-bold">
            <span class="text-deep-red">*</span>
            荷受人の名前</label
          >
          <VField
            id="name"
            name="荷受人の名前"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['荷受人の名前'] }"
            placeholder="彩乃山屋"
            rules="required"
            v-model="form.user.name"
          ></VField>
          <ErrorMessage
            name="荷受人の名前"
            class="invalid-feedback"
          ></ErrorMessage>
        </div>
        <div class="col-12">
          <label for="tel" class="form-label fw-bold">
            <span class="text-deep-red">*</span>
            荷受人の携帯電話番号</label
          >
          <VField
            id="tel"
            name="荷受人の携帯電話番号"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['荷受人の携帯電話番号'] }"
            placeholder="09012345678"
            oninput="value=value.replace(/[^\d]/g,'')"
            :rules="isPhone"
            v-model="form.user.tel"
          ></VField>
          <ErrorMessage
            name="荷受人の携帯電話番号"
            class="invalid-feedback"
          ></ErrorMessage>
        </div>
        <div class="col-12 mb-3">
          <label for="address" class="form-label fw-bold">
            <span class="text-deep-red">*</span>
            荷受人の住所</label
          >
          <VField
            id="address"
            name="荷受人の住所"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['荷受人の住所'] }"
            placeholder="东京江东区有明3丁目21-1"
            rules="required"
            v-model="form.user.address"
          ></VField>
          <ErrorMessage
            name="荷受人の住所"
            class="invalid-feedback"
          ></ErrorMessage>
        </div>
        <div class="mt-4 pt-4 border-top">
          <div class="col-12">
            <label for="message" class="form-label fw-bold">メッセージ</label>
            <textarea
              id="message"
              class="form-control"
              placeholder="気をつけるべきことを言いたいですか？"
              cols="30"
              rows="6"
              v-model="form.message"
            ></textarea>
          </div>
        </div>
        <div class="col-12">
          <div
            class="d-grid gap-3 d-md-flex justify-content-md-between align-items-center mt-4 mt-md-3"
          >
            <button
              type="submit"
              class="btn hvr-btn-dark w-100 d-flex justify-content-center align-items-center my-1 order-md-1"
            >
              チェックアウト
            </button>
            <RouterLink
              to="/cart"
              class="btn btn-link ps-0 w-100 d-flex justify-content-center justify-content-md-start align-items-center my-1 order-md-6"
            >
              <i class="bi bi-chevron-left me-1"></i>
              購入を続ける
            </RouterLink>
          </div>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    sentOrder() {
      let loader = this.$loading.show();
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
          { data: this.form }
        )
        .then((res) => {
          loader.hide();

          this.$refs.form.resetForm();
          this.form.message = "";
          this.$router.push(`/checkout/pay/${res.data.orderId}`);
          localStorage.removeItem("code");
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    isPhone(value) {
      const phoneNumber = /0?[789](?:\d{8}|\d{9})$/;
      return phoneNumber.test(value) ? true : "正しい携帯電話番号が必要";
    },
  },
};
</script>

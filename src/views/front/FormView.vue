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
        ご注文内容の確認
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li class="fs-7 fw-bold d-inline opacity-25">
        <span class="badge rounded-pill bg-dark me-2"> 3 </span>
        お支払い
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li class="fs-7 fw-bold d-inline opacity-25">
        <span class="badge rounded-pill bg-dark me-2"> 4 </span>
        ご注文完了
      </li>
    </ul>
  </div>
  <div class="row">
    <div class="col-lg-10 col-xl-8">
      <div class="mb-5">
        <h2 class="h5 fw-bold">ご注文情報</h2>
        <p>
          私書箱への配送は承っておりません。お届け先に私書箱が指定されている場合、ご注文はキャンセルとなりますのでご注意ください。
        </p>
      </div>
      <VForm v-slot="{ errors }" class="row g-3" ref="form" @submit="sentOrder">
        <div class="col-12">
          <label for="email" class="form-label fw-bold">
            <span class="text-deep-red">*</span>
            荷受人のメールアドレス
          </label>
          <VField
            id="email"
            name="荷受人のメールアドレス"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['荷受人のメールアドレス'] }"
            placeholder="service@edomaezushi.co.jp"
            rules="required|email"
            v-model="form.user.email"
          />
          <ErrorMessage
            name="荷受人のメールアドレス"
            class="invalid-feedback"
          />
        </div>
        <div class="col-12">
          <label for="name" class="form-label fw-bold">
            <span class="text-deep-red">*</span>
            受取人氏名
          </label>
          <VField
            id="name"
            name="受取人氏名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['受取人氏名'] }"
            placeholder="彩乃山屋"
            rules="required"
            v-model="form.user.name"
          />
          <ErrorMessage name="受取人氏名" class="invalid-feedback" />
        </div>
        <div class="col-12">
          <label for="tel" class="form-label fw-bold">
            <span class="text-deep-red">*</span>
            受取人の携帯電話番号
          </label>
          <VField
            id="tel"
            name="受取人の携帯電話番号"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['受取人の携帯電話番号'] }"
            placeholder="09012345678"
            oninput="value=value.replace(/[^\d]/g,'')"
            :rules="isPhone"
            v-model="form.user.tel"
          />
          <ErrorMessage name="受取人のお届け先住所" class="invalid-feedback" />
        </div>
        <div class="col-12 mb-3">
          <label for="address" class="form-label fw-bold">
            <span class="text-deep-red">*</span>
            受取人のお届け先住所
          </label>
          <VField
            id="address"
            name="受取人のお届け先住所"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['受取人のお届け先住所'] }"
            placeholder="东京江东区有明3丁目21-1"
            rules="required"
            v-model="form.user.address"
          />
          <ErrorMessage name="受取人のお届け先住所" class="invalid-feedback" />
        </div>
        <div class="mt-4 pt-4 border-top">
          <div class="col-12">
            <label for="message" class="form-label fw-bold">備考欄</label>
            <textarea
              id="message"
              class="form-control"
              placeholder="気をつけるべきことを言いたいですか？"
              cols="30"
              rows="6"
              v-model="form.message"
            />
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
              ご購入手続きへ進む
            </button>
            <RouterLink
              to="/cart"
              class="btn btn-link ps-0 w-100 d-flex justify-content-center justify-content-md-start align-items-center my-1 order-md-6"
            >
              <i class="bi bi-chevron-left me-1"></i>
              買い物を続ける
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
          address: ""
        },
        message: ""
      }
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
    }
  }
};
</script>

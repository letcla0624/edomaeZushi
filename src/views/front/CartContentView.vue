<template>
  <div class="row">
    <div class="col-lg-10 offset-lg-2 col-xl-8 offset-xl-4">
      <!-- logo -->
      <LogoComp></LogoComp>
      <!-- 折疊購物車 -->
      <div class="accordion">
        <div class="accordion-item border-0 bg-transparent">
          <h2 class="accordion-header d-lg-none" id="headingOne">
            <button
              class="accordion-button bg-dark text-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              :class="{ collapsed: detectWidth < 992 }"
              @click="collapseHasOpen"
            >
              <span>
                <i class="bi bi-basket me-1"></i>
                <span v-if="collapseOpen">クローズリスト</span>
                <span v-else>オープンリスト</span>
              </span>
              <span
                class="fw-bold mb-0 fs-5d5 position-absolute"
                style="right: 1rem"
              >
                {{ $filters.currencyJPY(cart.final_total) }}
              </span>
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
            ref="collapseOne"
            :class="{
              collapse: detectWidth < 992,
              show: detectWidth > 992,
            }"
          >
            <div class="accordion-body pt-4">
              <!-- 購物車商品 -->
              <div class="border-bottom pt-4">
                <div
                  class="row align-items-center mb-4"
                  v-for="item in cart.carts"
                  :key="item.id"
                >
                  <div class="col-3 px-0 px-sm-3 px-lg-0 px-xxl-3">
                    <div class="position-relative">
                      <img
                        :src="item.product.imageUrl"
                        :alt="item.product.title"
                        class="w-100"
                      />
                      <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light-green"
                      >
                        {{ item.qty }}
                      </span>
                    </div>
                  </div>
                  <div class="col-6">
                    <p class="fs-7 fw-bold mb-0">
                      {{ item.product.title }}
                    </p>
                  </div>
                  <div class="col-3">
                    <div class="text-end text-nowrap">
                      <p class="fs-7 fw-bold mb-0">
                        {{ $filters.currencyJPY(item.total) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 折扣碼 -->
              <div class="border-top border-bottom py-4">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ディスカウントコード"
                    aria-label="ディスカウントコード"
                    aria-describedby="button-addon"
                    v-model.trim="code"
                  />
                  <button
                    class="btn btn-dark"
                    type="button"
                    id="button-addon"
                    @click="useCoupon"
                    :disabled="code === ''"
                  >
                    <div
                      v-if="isLoading !== ''"
                      class="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    申し込み
                  </button>
                </div>
                <small
                  v-if="cart.final_total !== cart.total"
                  class="fw-bold text-dark"
                >
                  使用した割引コード「
                  <b class="text-light-green">{{ copyCode.code }}</b>
                  」
                </small>
              </div>
              <!-- 小記金額 -->
              <div class="border-bottom py-3">
                <div class="d-flex justify-content-between mb-3">
                  <h6 class="fs-7 mb-0">小計</h6>
                  <p class="fs-7 fw-bold mb-0">
                    + {{ $filters.currencyJPY(cart.total) }}
                  </p>
                </div>
                <div class="d-flex justify-content-between">
                  <h6 class="fs-7 mb-0">割引額</h6>
                  <p class="fs-7 fw-bold mb-0">
                    - {{ $filters.currencyJPY(discount) }}
                  </p>
                </div>
              </div>
              <!-- 總計金額 -->
              <div
                class="d-flex justify-content-between align-items-center py-4"
              >
                <h6 class="fw-bold mb-0">商品合計</h6>
                <div class="d-flex align-items-center">
                  <small class="fs-8 text-secondary me-1">JPY</small>
                  <p class="fw-bold mb-0 fs-5">
                    {{ $filters.currencyJPY(cart.final_total) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoComp from "@/components/logo/LogoComp";

export default {
  data() {
    return {
      cart: {
        carts: [],
      },
      code: "",
      copyCode: {
        code: localStorage.getItem("code"),
      },
      isLoading: "",
      discount: 0,
      collapseOpen: false,
    };
  },
  props: ["detectWidth"],
  components: {
    LogoComp,
  },
  watch: {
    // 監聽折扣碼改變就寫入 localStorage
    copyCode: {
      handler() {
        localStorage.setItem("code", this.copyCode.code);
      },
      deep: false,
    },
  },
  methods: {
    getCart() {
      let loader = this.$loading.show();
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          loader.hide();
          this.cart = res.data.data;

          // 折扣金額
          this.discount = -(this.cart.final_total - this.cart.total);
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    // 使用折扣碼
    useCoupon() {
      this.isLoading = "0";
      const data = {
        code: this.code,
      };
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon/`,
          { data }
        )
        .then(() => {
          this.isLoading = "";

          // 淺拷貝折扣碼
          this.copyCode = { ...data };
          this.code = "";
          this.getCart();
        })
        .catch((err) => {
          this.isLoading = "";
          alert(err.response.data.message);
          this.code = "";
        });
    },
    // 展開變更文字
    collapseHasOpen() {
      this.collapseOpen = this.$refs.collapseOne.classList.toggle("open");
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style scoped>
.accordion-button::after {
  margin-left: 0.25rem;
}
</style>

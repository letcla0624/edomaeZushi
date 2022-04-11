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
                class="fw-bold mb-0 fs-5d5 position-absolute text-nowrap"
                style="right: 1rem"
              >
                {{ $filters.currencyJPY(order.total) }}
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
              show: detectWidth >= 992,
            }"
          >
            <div class="accordion-body pt-4">
              <!-- 購物車商品 -->
              <div class="border-bottom pt-4">
                <div
                  class="row align-items-center pb-2"
                  v-for="item in order.products"
                  :key="item.id"
                >
                  <div class="col-3">
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
                    <div class="text-end">
                      <div v-if="item.total !== item.final_total">
                        <del class="fs-8 mb-0 text-nowrap text-secondary">
                          {{ $filters.currencyJPY(item.total) }}
                        </del>
                        <p class="fs-7 fw-bold mb-0 text-nowrap">
                          {{ $filters.currencyJPY(item.final_total) }}
                        </p>
                      </div>
                      <p v-else class="fs-7 fw-bold mb-0 text-nowrap">
                        {{ $filters.currencyJPY(item.final_total) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 總計金額 -->
              <div
                class="d-flex justify-content-between align-items-center py-4"
              >
                <h6 class="fw-bold mb-0">商品合計</h6>
                <div class="d-flex align-items-center">
                  <small class="fs-8 text-secondary me-1">JPY</small>
                  <p class="fw-bold mb-0 fs-5 text-nowrap">
                    {{ $filters.currencyJPY(order.total) }}
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
      order: {
        user: {},
      },
      collapseOpen: false,
      orderId: this.$route.params,
    };
  },
  props: ["detectWidth"],
  components: {
    LogoComp,
  },
  methods: {
    // 取得訂單
    getOrder() {
      let loader = this.$loading.show();

      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId.id}`
        )
        .then((res) => {
          loader.hide();
          this.order = res.data.order;
        })
        .catch((err) => {
          loader.hide();
          alert(err.response.data.message);
        });
    },
    // 展開變更文字
    collapseHasOpen() {
      this.collapseOpen = this.$refs.collapseOne.classList.toggle("open");
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>

<style scoped>
.accordion-button::after {
  margin-left: 0.25rem;
}
</style>

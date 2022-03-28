<template>
  <div class="main">
    <div class="container py-3 pt-lg-5">
      <div class="row">
        <div class="col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
          <div class="text-center py-5">
            <h2 class="display-6">私の注文</h2>
            <p>
              過去の取引からの注文がここに表示されます。3
              時間以上チェックアウトしない場合、注文はキャンセルされます。
            </p>
          </div>
        </div>
      </div>
      <div v-if="orders.length === 0" class="row">
        <div
          class="text-center my-5"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <i class="bi bi-file-text-fill text-secondary fs-2"></i>
          <h3 class="h5 mt-2 mb-5">注文がありません。</h3>
          <router-link to="/products" class="btn hvr-btn-dark">
            買い物に行く
          </router-link>
        </div>
      </div>
      <div
        v-else
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 gx-3 gy-5 mb-5"
      >
        <div class="col" v-for="item in orders" :key="item.id">
          <div class="card p-3 order-card shadow">
            <div class="img-cover text-center py-3 border-bottom">
              <div v-if="item.is_paid">
                <img
                  src="@/assets/images/pay.png"
                  class="card-img-top object-fit-cover mb-2 w-25"
                />
                <h3
                  v-if="item.is_paid"
                  class="h5 fw-bold text-light-green text-truncate"
                >
                  既に支払いました
                </h3>
              </div>
              <div v-else>
                <img
                  src="@/assets/images/unpay.png"
                  class="card-img-top object-fit-cover mb-2 w-25"
                />
                <h3 class="h5 fw-bold text-deep-red text-truncate">
                  注文は未払い
                </h3>
              </div>
            </div>
            <div class="card-body text-center fs-7">
              <p class="text-truncate">
                {{ item.id }}
              </p>
              <p class="text-truncate">
                {{ new Date(item.create_at * 1000).toLocaleString("ja-JP") }}
              </p>
              <p class="text-truncate fw-bold fs-5d5">
                {{ $filters.currencyJPY(item.total) }}
              </p>
            </div>

            <div class="card-footer border-top-0 pb-3">
              <div class="d-flex justify-content-center align-items-center">
                <router-link
                  :to="`/checkout/pay/${item.id}`"
                  class="btn hvr-btn-outline-dark"
                >
                  詳しくはこちら
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageComp
        v-if="orders.length !== 0"
        :pages="pagination"
        @emit-page="getOrders"
      ></PageComp>
    </div>
  </div>
</template>

<script>
import PageComp from "@/components/PageComp";

export default {
  data() {
    return {
      orders: [],
      pagination: {},
    };
  },
  components: {
    PageComp,
  },
  methods: {
    getOrders(page = 1) {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders?page=${page}`
        )
        .then((res) => {
          loader.hide();
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          loader.hide();
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style lang="scss" scoped>
.order-card {
  background-color: var(--bs-gray-100);
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 15px;
    background: linear-gradient(
        45deg,
        transparent 33.333%,
        var(--bs-gray-100) 33.333%,
        var(--bs-gray-100) 66.667%,
        transparent 66.667%
      ),
      linear-gradient(
        -45deg,
        transparent 33.333%,
        var(--bs-gray-100) 33.333%,
        var(--bs-gray-100) 66.667%,
        transparent 66.667%
      );
    background-size: 20px 40px;
    left: 0;
  }
  &::before {
    background: linear-gradient(
        45deg,
        transparent 33.333%,
        var(--bs-gray-900) 33.333%,
        var(--bs-gray-900) 66.667%,
        transparent 66.667%
      ),
      linear-gradient(
        -45deg,
        transparent 33.333%,
        var(--bs-gray-900) 33.333%,
        var(--bs-gray-900) 66.667%,
        transparent 66.667%
      );
    background-size: 20px 40px;
    transform: rotate(180deg);
    opacity: 0.035;
    bottom: -20px;
    // left: 100%;
    // width: 30%;
  }
  &::after {
    bottom: -10px;
    transform: rotate(180deg);
  }
}
</style>

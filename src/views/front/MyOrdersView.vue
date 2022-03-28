<template>
  <div class="main">
    <div class="container py-3 pt-lg-5">
      <div class="row">
        <div class="col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
          <div class="text-center py-5">
            <h2 class="display-6">私の注文</h2>
            <p class="text-secondary">
              過去の取引からの注文がここに表示されます。3
              時間以上チェックアウトしない場合、注文はキャンセルされます。
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4">
            <div class="search mb-5">
              <div class="input-group position-relative">
                <input
                  type="text"
                  class="form-control border-left ps-3"
                  placeholder="注文番号を入力してください"
                  aria-label="search"
                  aria-describedby="search"
                  v-model.trim="searchItem"
                />
                <button
                  v-if="searchItem !== ''"
                  type="reset"
                  class="btn btn-link position-absolute"
                  style="right: 6rem; z-index: 3"
                  @click="cleanText"
                >
                  <i class="bi bi-x-circle"></i>
                </button>
                <button
                  class="btn btn-dark ps-3 pe-4 d-flex align-items-center"
                  type="button"
                  style="border-radius: 0 50px 50px 0"
                  @click="filterSearch"
                >
                  <i class="bi bi-search me-1"></i>
                  検索
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="copyOrders.length !== 0">
          <div class="row mb-4">
            <div class="col" v-for="item in copyOrders" :key="item.id">
              <div
                class="card p-3 order-card shadow mx-auto mb-3"
                style="width: 18rem"
              >
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
                    {{
                      new Date(item.create_at * 1000).toLocaleString("ja-JP")
                    }}
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
        </div>
        <div v-else>
          <div class="text-center mt-5">
            <p>注文はありません。注文が正しいか確認してください。</p>
          </div>
        </div>
      </div>
      <!-- <PageComp
        v-if="orders.length !== 0"
        :pages="pagination"
        @emit-page="getOrders"
      ></PageComp> -->
    </div>
  </div>
</template>

<script>
// import PageComp from "@/components/PageComp";

export default {
  data() {
    return {
      orders: {},
      copyOrders: {},
      pagination: {},
      searchItem: "",
    };
  },
  // components: {
  //   PageComp,
  // },
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
          // this.copyOrders = this.orders;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          loader.hide();
          alert(err.response.data.message);
        });
    },
    // 搜尋訂單
    filterSearch() {
      const newList = JSON.parse(JSON.stringify(this.orders));
      const newArr = [];

      if (this.searchItem === "") {
        newArr.length = 0;
      } else {
        newList.filter((item) => {
          if (item.id === this.searchItem) {
            newArr.push(item);
          }
        });
      }
      this.copyOrders = newArr;
    },
    cleanText() {
      this.searchItem = "";
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

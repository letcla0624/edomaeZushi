<template>
  <div class="main">
    <div class="container py-5">
      <div class="text-center py-5">
        <h2 class="display-6">＼お気に入りアイテム／</h2>
        <div v-if="products.length !== 0">
          <button
            type="button"
            class="btn btn-link"
            @click="deleteFavorite"
            :disabled="favoriteProdId.length === 0"
          >
            <i class="bi bi-trash3 me-1"></i>すべて削除する
          </button>
        </div>
      </div>
      <div v-if="products.length === 0" class="row">
        <div
          class="text-center my-5"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <i class="bi bi-balloon-heart-fill text-danger fs-2"></i>
          <h3 class="h5 mb-5">
            お気に入りとして追加すると、この画面に保存されます。
          </h3>
          <RouterLink to="/products" class="btn hvr-btn-dark">
            今人気のアイテムを見る
          </RouterLink>
        </div>
      </div>
      <div
        v-else
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-3 mb-5"
      >
        <div class="col" v-for="item in products" :key="item.id">
          <div class="card sushi-card">
            <RouterLink :to="`/prod/${item.id}`">
              <div class="img-cover text-center">
                <img
                  :src="item.imageUrl"
                  :alt="item.title"
                  class="card-img-top object-fit-cover w-75"
                />
                <span
                  v-if="item.origin_price !== item.price"
                  class="badge rounded-pill bg-deep-red px-1 py-2 position-absolute vrl-text ls-xl"
                  style="height: auto; left: 1rem; top: 1rem"
                >
                  特別価格
                </span>
              </div>
              <div class="card-body">
                <h4 class="h5 card-title text-truncate">
                  {{ item.title }}
                </h4>
                <p class="card-text text-truncate">
                  {{ item.description }}
                </p>
              </div>
            </RouterLink>
            <div class="card-footer border-top-0 pb-3">
              <div class="d-flex justify-content-between align-items-center">
                <p v-if="item.price === item.origin_price" class="mb-0">
                  <span class="align-top">¥ </span>
                  <b class="fs-4">{{ $filters.thousandths(item.price) }}</b>
                </p>
                <div v-else class="lh-sm text-end">
                  <del class="text-secondary fs-7">
                    {{ $filters.currencyJPY(item.origin_price) }}
                  </del>
                  <p class="mb-0">
                    <span class="fw-bold text-danger">
                      <span class="align-top">¥ </span>
                      <b class="fs-4">
                        {{ $filters.thousandths(item.price) }}
                      </b>
                    </span>
                  </p>
                </div>
                <div class="d-flex align-items-center">
                  <button
                    type="button"
                    class="btn py-0 favorite-btn border-0"
                    :ref="item.id"
                    :title="
                      favoriteProdId.includes(item.id)
                        ? '私のお気に入りの解除する'
                        : '私のお気に入りに追加'
                    "
                    @click="toggleFavorite(item.id)"
                  >
                    <i
                      v-if="favoriteProdId.includes(item.id)"
                      class="bi bi-balloon-heart-fill text-danger fs-2"
                    ></i>
                    <i v-else class="bi bi-balloon-heart fs-2"></i>
                  </button>
                  <div
                    class="addToCart btn btn-dark rounded-circle text-white d-flex justify-content-center align-items-center"
                    style="width: 45px; height: 45px"
                    @click="addCart(item.id)"
                    :disabled="isLoading === item.id"
                  >
                    <div
                      v-if="isLoading === item.id"
                      class="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <i v-else class="bi bi-plus-lg fs-5"></i>
                  </div>
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
import emitter from "@/utility/emitter.js";

export default {
  data() {
    return {
      products: [],
      isLoading: "",
      favoriteProdId: JSON.parse(localStorage.getItem("itemId")) || [],
    };
  },
  inject: ["emitter"],
  methods: {
    getProducts() {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          loader.hide();
          this.products = res.data.products;

          // 全部產品和 localStorage 裡的 id 比對
          this.products = this.products.filter((item) => {
            return this.favoriteProdId.indexOf(item.id) !== -1;
          });
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    toggleFavorite(id) {
      const itemIdx = this.favoriteProdId.findIndex((item) => item === id);

      if (itemIdx === -1) {
        this.favoriteProdId.push(id);
      } else {
        this.favoriteProdId.splice(itemIdx, 1);
      }
      // 加入彈跳動畫
      this.$refs[`${id}`][0].classList.add("active");

      localStorage.setItem("itemId", JSON.stringify(this.favoriteProdId));
      this.getProducts();
    },
    addCart(id, qty = 1) {
      this.isLoading = id;
      const data = {
        product_id: id,
        qty,
      };
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then((res) => {
          this.isLoading = "";
          emitter.emit("get-cart");

          // 全域的 emitter
          this.emitter.emit("toast-message", {
            style: "success",
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = "";
          this.emitter.emit("toast-message", {
            style: "error",
            content: err.response.data.message,
          });
        });
    },
    deleteFavorite() {
      this.favoriteProdId = localStorage.removeItem("itemId") || [];
      this.getProducts();
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<template>
  <div class="main">
    <div class="container">
      <BreadComp :prod-title="prod.title" class="pt-5"></BreadComp>
      <div class="row py-3 py-lg-5">
        <div class="col-xl-10 offset-xl-1">
          <div class="row g-3">
            <div class="col-lg-7 col-xl-8">
              <div class="text-center">
                <img :src="prod.imageUrl" :alt="prod.title" class="w-75" />
              </div>
            </div>
            <div class="col-lg-5 col-xl-4">
              <div class="border-bottom pb-3">
                <span class="badge rounded-pill bg-dark mb-2">
                  {{ prod.category }}
                </span>
                <h2 class="h2 mb-2">{{ prod.title }}</h2>
                <p v-if="prod.price === prod.origin_price" class="mb-0">
                  <span class="align-top">¥ </span>
                  <b class="fs-4">
                    {{ $filters.thousandths(prod.price) }}
                  </b>
                </p>
                <p v-else class="mb-0">
                  <span class="fw-bold me-2 text-danger">
                    <span class="align-top">¥ </span>
                    <b class="fs-4">
                      {{ $filters.thousandths(prod.price) }}
                    </b>
                  </span>
                  <del class="text-secondary fs-7">
                    {{ $filters.currencyJPY(prod.origin_price) }}
                  </del>
                </p>
              </div>
              <div class="py-3">
                <p>{{ prod.description }}</p>
                <p class="fs-7 mt-3 mb-1">食材：{{ prod.ingredients }}</p>
                <p class="fs-7">{{ prod.content }}／1 {{ prod.unit }}</p>
                <div
                  class="d-flex justify-content-between align-items-center mt-5"
                >
                  <div class="d-inline-flex border">
                    <button type="button" class="btn" @click="minus">
                      <i class="bi bi-dash-lg"></i>
                    </button>
                    <input
                      type="number"
                      class="form-control text-center border-0"
                      min="1"
                      v-model="qty"
                      style="width: 50px"
                      readonly
                    />
                    <button type="button" class="btn" @click="add">
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                  <FavoriteComp :item="prod"></FavoriteComp>
                </div>
                <div class="d-flex mt-3">
                  <button
                    type="button"
                    class="btn btn-dark w-100 d-flex justify-content-center align-items-center"
                    @click="addCart(prod.id, qty)"
                    :disabled="isLoading === prod.id"
                  >
                    <div
                      v-if="isLoading === prod.id"
                      class="spinner-border spinner-border-sm me-1"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <i v-else class="bi bi-basket me-1"></i>
                    カートに入れる
                  </button>
                </div>
                <p class="fs-8 text-secondary mt-2">
                  * 写真はカルテからのもので、作品としてのみ使用されています
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Swiper -->
      <div class="row py-5 border-top">
        <h3 class="h4">他の人は食べる</h3>
        <SwiperComp @emit-id="getProdIdFromComp"></SwiperComp>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/utility/emitter.js";
import BreadComp from "@/components/BreadComp";
import SwiperComp from "@/components/SwiperComp";
import FavoriteComp from "@/components/FavoriteComp";

export default {
  data() {
    return {
      prod: [],
      qty: 1,
      isLoading: "",
      favoriteProdId: JSON.parse(localStorage.getItem("favoriteProdId")) || [],
    };
  },
  inject: ["emitter"],
  components: {
    BreadComp,
    SwiperComp,
    FavoriteComp,
  },
  methods: {
    getProd() {
      let loader = this.$loading.show();
      // 取得單一產品的路由 id
      const { id } = this.$route.params;
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((res) => {
          loader.hide();
          this.prod = res.data.product;
          // 將 imageUrl 增加到 imagesUrl 陣列的第一張
          // this.prod.imagesUrl.unshift(this.prod.imageUrl);
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    // 點擊 Swiper 切換頁面
    getProdIdFromComp(id) {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((res) => {
          loader.hide();
          this.prod = res.data.product;
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    // 增加數量
    add() {
      this.qty++;
    },
    // 減少數量
    minus() {
      this.qty--;
      if (this.qty <= 1) {
        this.qty = 1;
      }
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
          // console.dir(err);
          this.emitter.emit("toast-message", {
            style: "error",
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getProd();
  },
};
</script>

<template>
  <div class="main">
    <div class="container py-3 py-lg-5">
      <div class="text-center py-5">
        <h2 class="display-6">ショッピングカート</h2>
        <button
          v-if="cart.carts.length !== 0"
          type="button"
          class="btn btn-link"
          @click="openDelAllModal('cart')"
          :disabled="cart.carts.length === 0"
        >
          <i class="bi bi-trash3 me-1"></i>カートを削除する
        </button>
      </div>
      <div v-if="cart.carts.length === 0" class="row">
        <div
          class="text-center my-5"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <i class="bi bi-basket-fill text-light-green fs-2"></i>
          <h3 class="h5 mt-2 mb-5">カートに商品は入っていません。</h3>
          <RouterLink to="/products" class="btn hvr-btn-dark">
            ショッピングを続ける
          </RouterLink>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-xl-10 offset-xl-1 pb-5">
          <!-- 桌機版 header -->
          <div class="row border-bottom py-3 d-none d-md-flex">
            <div class="col-md-1">
              <h6 class="text-center"></h6>
            </div>
            <div class="col-md-6">
              <h6 class="ps-md-4 ps-lg-5">寿司</h6>
            </div>
            <div class="col-md-3">
              <h6 class="text-center">数量</h6>
            </div>
            <div class="col-md-2">
              <h6 class="text-end">価格</h6>
            </div>
          </div>
          <!-- 商品 content -->
          <div
            class="row align-items-center"
            v-for="item in cart.carts"
            :key="item.id"
          >
            <!-- 桌機版單一商品刪除 -->
            <div class="col-1 text-center d-none d-md-block">
              <button type="button" class="btn" @click="openDelModal(item)">
                <i class="bi bi-trash3 fs-5d5"></i>
              </button>
            </div>
            <!-- 商品 -->
            <div class="col-12 col-md-6">
              <div class="cart">
                <div class="row g-0 align-items-center">
                  <div class="col-4 col-sm-3">
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.title"
                      class="img-fluid rounded-start w-100"
                    />
                  </div>
                  <div class="col-8 col-sm-9">
                    <div class="cart-body ps-2 pe-0">
                      <div class="d-flex justify-content-between d-md-block">
                        <!-- 單一商品名稱 -->
                        <RouterLink :to="`/prod/${item.product.id}`">
                          <h5 class="cart-title h6 fw-bold me-4">
                            {{ item.product.title }}
                          </h5>
                        </RouterLink>
                        <!-- 桌機版單價 -->
                        <p class="text-secondary fs-7 mb-0 d-none d-md-block">
                          単価：{{ $filters.currencyJPY(item.product.price) }}
                        </p>
                        <!-- 手機版單一商品總價 -->
                        <div class="d-md-none text-center">
                          <div
                            v-if="isLoading === item.id"
                            style="width: 45px; height: 21px"
                          >
                            <div
                              class="spinner-border spinner-border-sm align-middle"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          <p v-else class="fw-bold fs-7 text-nowrap mb-0">
                            {{ $filters.currencyJPY(item.total) }}
                          </p>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-between my-3 d-md-none"
                      >
                        <!-- 手機版單一商品數量 -->
                        <div class="d-inline-flex border">
                          <button
                            type="button"
                            class="btn btn-sm"
                            @click="minusItem(item)"
                            :disabled="isLoading === item.id"
                          >
                            <i class="bi bi-dash-lg"></i>
                          </button>
                          <input
                            type="number"
                            class="form-control text-center border-0"
                            min="1"
                            v-model.number="item.qty"
                            style="width: 40px"
                            readonly
                          />
                          <button
                            type="button"
                            class="btn btn-sm"
                            @click="add(item)"
                            :disabled="isLoading === item.id"
                          >
                            <i class="bi bi-plus-lg"></i>
                          </button>
                        </div>
                        <!-- 手機版單一商品刪除 -->
                        <button
                          type="button"
                          class="btn"
                          style="width: 45px"
                          @click="openDelModal(item)"
                          :disabled="isLoading === item.id"
                        >
                          <i class="bi bi-trash3 fs-5d5"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 桌機版單一商品數量 -->
            <div class="col-3 text-center d-none d-md-block">
              <div class="d-inline-flex border">
                <button
                  type="button"
                  class="btn"
                  @click="minusItem(item)"
                  :disabled="isLoading === item.id"
                >
                  <i class="bi bi-dash-lg"></i>
                </button>
                <input
                  type="number"
                  class="form-control text-center border-0"
                  min="1"
                  v-model="item.qty"
                  style="width: 50px"
                  readonly
                />
                <button
                  type="button"
                  class="btn"
                  @click="addItem(item)"
                  :disabled="isLoading === item.id"
                >
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
            <!-- 桌機版單一商品總價 -->
            <div class="col-2 text-end d-none d-md-block">
              <div class="">
                <div
                  v-if="isLoading === item.id"
                  class="ms-auto text-center"
                  style="width: 45px; height: 24px"
                >
                  <div
                    class="spinner-border spinner-border-sm align-middle"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <p v-else class="fw-bold mb-0">
                  {{ $filters.currencyJPY(item.total) }}
                </p>
              </div>
            </div>
          </div>
          <div class="row border-top border-dark py-3">
            <div class="text-end">
              <h5 class="fs-5d5 fw-bold">
                総費用：<strong>{{ $filters.currencyJPY(cart.total) }}</strong>
              </h5>
              <p class="fs-8 text-secondary">
                チェックアウト時に計算された送料と税金
              </p>
            </div>
          </div>
          <div class="row mb-5">
            <div
              class="d-grid gap-3 col-md-12 col-lg-6 d-md-flex align-items-center ms-auto mt-4 mt-md-3"
            >
              <RouterLink
                to="/products"
                class="w-100 d-flex justify-content-center justify-content-md-start align-items-center"
              >
                <i class="bi bi-chevron-left me-1"></i>
                ショッピングを続ける
              </RouterLink>
              <RouterLink
                to="/checkout"
                class="btn hvr-btn-dark w-100 d-flex justify-content-center align-items-center"
                :class="{ disabled: cart.carts.length === 0 }"
              >
                チェックアウト
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <DelModalComp :del-item="tempCart" @get-item="getCart"></DelModalComp>
      <DelAllModalComp :page="page" @get-item="getCart"></DelAllModalComp>
    </div>
  </div>
</template>

<script>
import emitter from "@/utility/emitter";
import DelModalComp, { delModal } from "@/components/front/DelModalComp.vue";
import DelAllModalComp, { delAllModal } from "@/components/DelAllModalComp.vue";

export default {
  data() {
    return {
      cart: {
        carts: [],
      },
      isLoading: "",
      cartData: {},
      tempCart: {
        product: {},
      },
      length: 0,
      page: "",
    };
  },
  components: {
    DelModalComp,
    DelAllModalComp,
  },
  methods: {
    getCart() {
      let loader = this.$loading.show();
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          loader.hide();
          this.cart = res.data.data;
          // 給 navigation 選單用的
          emitter.emit("get-cart");
          // 當購物車清空時就移除之前填入的折扣碼
          if (this.cart.carts.length === 0) {
            localStorage.removeItem("code");
          }
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    // 增加數量
    addItem(item) {
      this.isLoading = item.id;
      item.qty++;
      this.cartData = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.updateCart(item);
    },
    // 減少數量
    minusItem(item) {
      item.qty--;
      if (item.qty < 1) {
        item.qty = 1;
        return;
      }
      this.cartData = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.updateCart(item);
    },
    // 更新購物車
    updateCart(item) {
      this.isLoading = item.id;
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data: this.cartData }
        )
        .then(() => {
          this.isLoading = "";
          this.getCart();
        })
        .catch((err) => {
          this.isLoading = "";
          console.dir(err);
          alert(err.response.data.message);
        });
    },
    openDelModal(item) {
      this.tempCart = { ...item };
      delModal.show();
    },
    openDelAllModal(page) {
      this.page = page;
      delAllModal.show();
    },
    // 回頂部
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.getCart();
    this.toTop();
  },
};
</script>

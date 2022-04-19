<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light py-2 py-lg-0"
    :class="{ 'sticky-top': fixed }"
  >
    <div class="container">
      <LogoComp />
      <div class="d-flex d-lg-none">
        <RouterLink to="/cart" class="btn me-2">
          <i class="bi bi-basket text-dark position-relative fs-5">
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style="font-size: x-small"
              >{{ cartsTotal }}
            </span>
          </i>
        </RouterLink>
        <button
          class="navbar-toggler border-0 py-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          ref="offcanvas"
        >
          <IonIcon :icon="appsSharp" class="fs-4 mt-1 text-dark" />
        </button>
      </div>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        :class="{ 'bg-dark': detectWidth < 992 }"
      >
        <div
          class="offcanvas-header"
          style="border-bottom: 1px solid var(--bs-gray-800)"
        >
          <div
            class="offcanvas-title"
            id="offcanvasNavbarLabel"
            :class="{ 'text-white': detectWidth < 992 }"
          >
            <LogoWhiteComp />
          </div>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            :class="{ 'btn-close-white': detectWidth < 992 }"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav ms-lg-auto mb-2 mb-lg-0">
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <RouterLink
                to="/"
                class="nav-link px-3 py-4"
                :class="{ 'text-white': detectWidth < 992 }"
              >
                ホームページ
              </RouterLink>
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <RouterLink
                to="/products"
                class="nav-link px-3 py-4"
                :class="{ 'text-white': detectWidth < 992 }"
                >寿司の種類
              </RouterLink>
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <RouterLink
                to="/favorite"
                class="nav-link px-3 py-4"
                :class="{ 'text-white': detectWidth < 992 }"
              >
                私のお気に入り
              </RouterLink>
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <RouterLink
                to="/myOrders"
                class="nav-link px-3 py-4"
                :class="{ 'text-white': detectWidth < 992 }"
              >
                私の注文
              </RouterLink>
            </li>
            <li
              class="nav-item d-flex justify-content-center align-items-center"
              data-bs-dismiss="offcanvas"
            >
              <RouterLink
                to="/cart"
                class="nav-link px-3 py-4"
                :class="{ 'text-white': detectWidth < 992 }"
              >
                ショッピングカート
                <i class="bi bi-basket position-relative">
                  <span
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >{{ cartsTotal }}
                  </span>
                </i>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from "@/utility/emitter.js";
import LogoComp from "@/components/logo/LogoComp";
import LogoWhiteComp from "@/components/logo/LogoWhiteComp";
import { IonIcon } from "@ionic/vue";
import { appsSharp } from "ionicons/icons";

export default {
  props: ["fixed", "detectWidth"],
  data() {
    return {
      cart: {
        carts: [],
      },
      cartsTotal: 0,
      appsSharp,
    };
  },
  components: {
    LogoComp,
    LogoWhiteComp,
    IonIcon,
  },
  methods: {
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data;
          this.cartsTotal = this.sumCartsTotal(this.cart.carts);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    sumCartsTotal(arr) {
      let sum = 0;
      arr.forEach(function (item) {
        sum += item.qty;
      });
      return sum;
    },
  },
  mounted() {
    this.getCart();
    emitter.on("get-cart", () => {
      this.getCart();
    });
  },
  unmounted() {
    emitter.off("get-cart");
  },
};
</script>

<style lang="scss" scoped>
.nav-link {
  &.active {
    border-bottom: 2px solid;
    font-weight: bold;
  }
}
@media (max-width: 991.98px) {
  .nav-link {
    font-size: medium;
    text-align: center;
    &.active {
      font-size: 28px;
      font-weight: bold;
      border-bottom: none;
      .badge {
        font-size: small;
      }
    }
  }
}
</style>

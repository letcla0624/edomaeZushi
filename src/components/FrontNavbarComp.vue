<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light py-2 py-lg-0"
    :class="{ 'fixed-top': fixed }"
  >
    <div class="container">
      <LogoComp></LogoComp>
      <div class="d-flex d-lg-none">
        <router-link to="/cart" class="btn me-2">
          <i class="bi bi-basket text-dark position-relative fs-5">
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style="font-size: x-small"
              >{{ cart.carts.length }}
            </span>
          </i>
        </router-link>
        <button
          class="navbar-toggler border-0 py-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          ref="offcanvas"
        >
          <ion-icon :icon="appsSharp" class="fs-4 mt-1 text-dark"></ion-icon>
          <!-- <ion-icon
            name="apps-sharp"
            class="ion-grid fs-2 text-dark"
          ></ion-icon> -->
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
            <LogoWhiteComp></LogoWhiteComp>
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
              <router-link
                to="/"
                class="nav-link p-4"
                :class="{ 'text-white': detectWidth < 992 }"
              >
                ホームページ
              </router-link>
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                to="/products"
                class="nav-link p-4"
                :class="{ 'text-white': detectWidth < 992 }"
                >寿司の種類
              </router-link>
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                to="/favorite"
                class="nav-link p-4"
                :class="{ 'text-white': detectWidth < 992 }"
              >
                私のお気に入り
              </router-link>
            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <router-link
                to="/myOrders"
                class="nav-link p-4"
                :class="{ 'text-white': detectWidth < 992 }"
              >
                私の注文
              </router-link>
            </li>
            <li
              class="nav-item d-flex justify-content-center align-items-center"
              data-bs-dismiss="offcanvas"
            >
              <router-link
                to="/cart"
                class="nav-link p-4"
                :class="{ 'text-white': detectWidth < 992 }"
              >
                ショッピングカート
                <i class="bi bi-basket position-relative">
                  <span
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >{{ cart.carts.length }}
                  </span>
                </i>
              </router-link>
            </li>
          </ul>
          <div class="offcanvas-social mt-5 d-lg-none">
            <ul
              class="list-unstyled d-flex justify-content-center justify-content-lg-end mb-lg-0 gap-5"
            >
              <li class="">
                <a href="#"><i class="bi bi-facebook text-light"></i></a>
              </li>
              <li class="">
                <a href="#"><i class="bi bi-instagram text-light"></i></a>
              </li>
              <li class="">
                <a href="#"><i class="bi bi-line text-light"></i></a>
              </li>
              <li class="">
                <a href="#"><i class="bi bi-twitter text-light"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from "@/utility/emitter.js";
import LogoComp from "@/components/LogoComp";
import LogoWhiteComp from "@/components/LogoWhiteComp";
import { IonIcon } from "@ionic/vue";
import { appsSharp } from "ionicons/icons";

export default {
  props: ["fixed", "detectWidth"],
  data() {
    return {
      cart: {
        carts: [],
      },
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
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mounted() {
    this.getCart();
    emitter.on("get-cart", () => {
      this.getCart();
    });
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
  .offcanvas-social {
    .bi {
      font-size: 32px;
    }
  }
}
</style>

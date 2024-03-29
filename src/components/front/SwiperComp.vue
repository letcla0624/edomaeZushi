<template>
  <swiper
    :slidesPerView="'auto'"
    :breakpoints="{
      '@0.00': { slidesPerView: 1, spaceBetween: 10, slidesPerGroup: 1 },
      '@0.25': { slidesPerView: 2, spaceBetween: 15, slidesPerGroup: 2 },
      '@0.50': { slidesPerView: 3, spaceBetween: 20, slidesPerGroup: 3 },
      '@0.75': { slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4 },
      '@1.00': { slidesPerView: 5, spaceBetween: 30, slidesPerGroup: 5 },
    }"
    :freeMode="false"
    :pagination="{
      type: 'fraction',
    }"
    :navigation="true"
    :modules="modules"
    class="swiper"
  >
    <swiper-slide v-for="item in tempProducts" :key="item.id">
      <div class="text-center">
        <RouterLink
          :to="`/prod/${item.id}`"
          class="sushiBtn btn my-5"
          style="width: -webkit-fill-available"
          @click.prevent="emitProdId(item.id)"
        >
          <img
            :src="item.imageUrl"
            :alt="item.title"
            class="w-75 object-fit-cover"
          />
          <h6 class="sushiTitle text-truncate w-75 mx-auto">
            {{ item.title }}
          </h6>
          <p v-if="item.price === item.origin_price">
            {{ $filters.currencyJPY(item.origin_price) }}
          </p>
          <p v-else class="text-nowrap">
            <b class="fw-bold text-danger me-2">
              {{ $filters.currencyJPY(item.price) }}
            </b>
            <del class="fs-8 text-secondary">
              {{ $filters.currencyJPY(item.origin_price) }}
            </del>
          </p>
        </RouterLink>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export default {
  data() {
    return {
      tempProducts: {},
      modules: [FreeMode, Pagination, Navigation],
      itemId: this.$route.params.id,
    };
  },
  watch: {
    $route() {
      this.itemId = this.$route.params.id;
      this.getProducts();
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getProducts() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          let toRemoveId = this.itemId;
          // 移除相同產品
          this.tempProducts = res.data.products.filter(function (item) {
            return item.id !== toRemoveId;
          });

          // 隨機亂數排列
          this.tempProducts.sort(() => {
            return 0.5 - Math.random();
          });
          this.tempProducts = this.tempProducts.slice(0, 5);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    emitProdId(id) {
      this.$emit("emit-id", id);
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style lang="scss">
.sushiBtn {
  img {
    transition: 0.4s;
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
    .sushiTitle {
      color: var(--bs-deep-red);
    }
  }
}
.swiper-pagination {
  z-index: 0 !important;
}
.swiper-button-next,
.swiper-button-prev {
  top: 92% !important;
  border: 1px solid var(--bs-dark);
  width: fit-content !important;
  transition: 0.3s;
  &::after {
    font-family: "bootstrap-icons" !important;
    color: var(--bs-dark);
  }
  &:hover {
    background-color: var(--bs-dark);
    &::after {
      color: var(--bs-light);
    }
  }
}
.swiper-button-next {
  right: 1.75rem;
  &::after {
    content: "\F135" !important;
  }
}
.swiper-button-prev {
  left: auto !important;
  right: 4.6rem !important;
  &::after {
    content: "\F12C" !important;
  }
}
@media (max-width: 414.98px) {
  .swiper-button-next,
  .swiper-button-prev {
    display: none !important;
  }
}
</style>

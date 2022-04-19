<template>
  <FrontNavbarComp :fixed="fixed" :detectWidth="detectWidth" />
  <RouterView :detectWidth="detectWidth" />
  <FooterComp />
  <ToastComp />
</template>

<script>
import FrontNavbarComp from "@/components/front/FrontNavbarComp.vue";
import FooterComp from "@/components/front/FooterComp.vue";
import emitter from "@/utility/emitter.js";
import ToastComp from "@/components/ToastComp.vue";

export default {
  data() {
    return {
      fixed: true,
      detectWidth: null,
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  components: {
    FrontNavbarComp,
    FooterComp,
    ToastComp,
  },
  mounted() {
    this.detectWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      this.detectWidth = window.innerWidth;
    });
  },
};
</script>

<style lang="scss">
.sushi-card {
  transition: all 0.4s;
  z-index: 2;
  .addToCart {
    transition: all 0.4s;
  }
  .img-cover {
    overflow: hidden;
    img.card-img-top {
      transition: all 1s;
    }
  }
  &::after {
    content: "";
    position: absolute;
    width: 101%;
    height: 100%;
    border: 1px solid var(--bs-gray-500);
    top: 0.5rem;
    bottom: 0;
    left: 0.5rem;
    right: 0;
    z-index: -1;
    display: none;
  }
  &:hover {
    border: 1px solid var(--bs-gray-500);
    a {
      color: var(--bs-dark);
    }
    .addToCart {
      background-color: var(--bs-deep-red);
      border: none;
      transform: scale(1.2);
    }
    img.card-img-top {
      transform: scale(1.1);
    }
    .card-footer {
      color: var(--bs-dark);
    }
    &::after {
      display: block;
    }
  }
}

.favorite-btn.active {
  animation: jump 0.6s ease-in-out forwards;
}
@keyframes jump {
  0% {
    transform: translateY(0) scale(1);
  }
  10% {
    transform: translateY(20%) scaleY(0.7);
  }
  50% {
    transform: translateY(-20%) scaleX(0.7);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}
</style>

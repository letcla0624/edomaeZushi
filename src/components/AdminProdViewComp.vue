<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="adminProdModalLabel"
    aria-hidden="true"
    ref="showAdminProdModal"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="adminProdModalLabel">商品預覽</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5 col-lg-4">
              <div class="mainPic">
                <img :src="showProd.imageUrl" :alt="showProd.category" />
              </div>
              <div class="otherPics">
                <template v-for="(pics, idx) in showProd.imagesUrl" :key="idx">
                  <img
                    v-if="pics !== ''"
                    :src="pics"
                    :alt="showProd.title"
                    class="rounded cursor-pointer me-2 mt-2"
                    :class="{
                      border: pics == showProd.imageUrl,
                      'border-danger': pics == showProd.imageUrl,
                      'border-2': pics == showProd.imageUrl,
                    }"
                  />
                </template>
              </div>
            </div>
            <div class="col-md-7 col-lg-8">
              <div class="card border-0 bg-transparent">
                <div class="card-body px-0">
                  <div class="">
                    <span
                      class="badge rounded-pill bg-dark text-white px-3 mb-2"
                    >
                      {{ showProd.category }}
                    </span>
                    <h2 class="h2 mb-2">{{ showProd.title }}</h2>
                  </div>
                  <p class="fs-5d5">{{ showProd.description }}</p>
                  <div class="row align-items-lg-end mt-lg-5">
                    <div class="col-lg-7">
                      <p
                        v-if="showProd.price === showProd.origin_price"
                        class="mb-0"
                      >
                        售價：
                        <strong class="fs-4">
                          {{ $filters.currencyJPY(showProd.price) }}
                        </strong>
                        {{ showProd.unit }} / 元
                      </p>
                      <p v-else class="mb-0">
                        優惠價：
                        <strong class="fs-4 text-danger">
                          {{ $filters.currencyJPY(showProd.price) }}
                        </strong>
                        <del class="text-secondary ms-2">
                          {{ $filters.currencyJPY(showProd.origin_price) }}
                        </del>
                        {{ showProd.unit }} / 元
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
            關閉商品
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global bootstrap */

export let showAdminProdModal = null;
export default {
  props: ["showProd"],
  mounted() {
    showAdminProdModal = new bootstrap.Modal(this.$refs.showAdminProdModal, {
      keyboard: false,
    });
  },
};
</script>

<style lang="scss" scoped>
.mainPic img {
  height: 308px;
  width: 100%;
  object-fit: cover;
}
.otherPics img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>

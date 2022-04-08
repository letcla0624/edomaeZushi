<template>
  <div class="modal fade" tabindex="-1" ref="delAllModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-0 border border-dark border-2 paper">
        <div class="modal-header justify-content-center border-0">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            style="z-index: 2"
          ></button>
        </div>
        <div class="modal-body px-4 px-lg-5">
          <div
            class="text-center mb-2 position-absolute"
            style="top: -113px; left: 0"
          >
            <img
              src="@/assets/images/omg.png"
              alt="delete"
              style="width: 90px; transform: scaleX(-1)"
            />
          </div>
          <h5 class="modal-title text-center">
            <span class="text-danger fw-bold mx-1">
              すべて削除してもよろしいですか？
            </span>
          </h5>
        </div>
        <div class="modal-footer border-top-0 justify-content-center mb-4">
          <button
            type="button"
            class="btn btn-link"
            data-bs-dismiss="modal"
            @click="$emit('del-item')"
          >
            キャンセル
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="deleteCarts"
            :disabled="isLoading === 'cart'"
          >
            <div
              v-if="isLoading === 'cart'"
              class="spinner-border spinner-border-sm align-middle"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <i v-else class="bi bi-trash-fill me-1"></i>
            削除を確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global bootstrap */

export let delAllModal = null;
export default {
  data() {
    return {
      isLoading: "",
    };
  },
  props: ["page"],
  methods: {
    deleteCarts() {
      this.isLoading = "cart";
      let url = "";

      if (this.page === "cart") {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      } else if (this.page === "adminOrders") {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      }

      this.$http
        .delete(url)
        .then(() => {
          this.isLoading = "";
          this.$emit("get-item");
          delAllModal.hide();
        })
        .catch((err) => {
          this.isLoading = "";
          delAllModal.hide();
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    delAllModal = new bootstrap.Modal(this.$refs.delAllModal, {
      keyboard: false,
    });
  },
};
</script>

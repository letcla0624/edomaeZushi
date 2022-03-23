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
        <div class="modal-footer border-top-0 justify-content-center">
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
          >
            <i class="bi bi-trash-fill me-1"></i>
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
  methods: {
    deleteCarts() {
      let loader = this.$loading.show();
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
        )
        .then(() => {
          loader.hide();
          this.$emit("get-item");
          delAllModal.hide();
          // setTimeout(() => {
          //   alert(res.data.message);
          // }, 600);
        })
        .catch((err) => {
          loader.hide();
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

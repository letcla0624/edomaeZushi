<template>
  <div class="modal fade" tabindex="-1" ref="delModal">
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
          <h5 class="modal-title">
            <span class="text-danger fw-bold mx-1">
              {{ delItem.product.title }}
            </span>
            を削除してもよろしいですか？食べない心はありますか？
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
            @click="deleteItem(delItem.id)"
            :disabled="isLoading === delItem.id"
          >
            <div
              v-if="isLoading === delItem.id"
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

export let delModal = null;
export default {
  data() {
    return {
      isLoading: "",
      message: "",
    };
  },
  props: ["delItem"],
  methods: {
    deleteItem(id) {
      this.isLoading = id;
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((res) => {
          this.isLoading = "";
          this.$emit("get-item");
          delModal.hide();
          this.message = res.data.message;
        })
        .catch((err) => {
          this.isLoading = "";
          delModal.hide();
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    delModal = new bootstrap.Modal(this.$refs.delModal, {
      keyboard: false,
    });
  },
};
</script>

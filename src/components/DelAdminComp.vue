<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
    ref="delModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="delModalLabel">
            <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>
            熊孩子，您確定要刪除
            <span v-if="delItem.title" class="text-danger mx-1"
              >{{ delItem.title }}
            </span>
            <span v-else class="text-danger mx-1">{{ delItem.id }} </span>
            嗎？
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">刪除之後資料不可逆，不可反悔喔！</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-link text-decoration-none text-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="delProdBtn(delItem.id)"
          >
            <i class="bi bi-trash-fill me-1"></i>確定刪除
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
  props: ["delItem", "pageName"],
  methods: {
    // 刪除單一項目
    delProdBtn(id) {
      let url = "";

      if (this.pageName === "prodsList") {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      } else if (this.pageName === "orders") {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      } else if (this.pageName === "coupons") {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
      }

      this.$http
        .delete(url)
        .then((res) => {
          this.$emit("get-item");
          delModal.hide();
          setTimeout(() => {
            alert(res.data.message);
          }, 1000);
        })
        .catch((err) => {
          console.dir(err.response);
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

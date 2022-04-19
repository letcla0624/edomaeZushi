<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
    ref="couponModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="couponModalLabel">
            {{ isNew ? "新增優惠券" : "編輯優惠券" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control border-0 border-bottom rounded-0"
              id="floatingTitle"
              placeholder="請輸入標題"
              v-model="tempCoupon.title"
            />
            <label for="floatingTitle">標題</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control border-0 border-bottom rounded-0"
              id="floatingCode"
              placeholder="請輸入折扣碼"
              v-model="tempCoupon.code"
            />
            <label for="floatingCode">折扣碼</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control border-0 border-bottom rounded-0"
              id="floatingDate"
              v-model="due_date"
            />
            <label for="floatingDate">到期日 (點選 icon)</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control border-0 border-bottom rounded-0"
              id="floatingPrice"
              min="0"
              max="100"
              oninput="if(value>100)value=100"
              placeholder="請輸入打折數"
              v-model.number="tempCoupon.percent"
            />
            <label for="floatingPrice">折扣率（打八折請輸入80）</label>
          </div>
          <div class="mb-3 ms-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="is_enabled"
                v-model="tempCoupon.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label class="form-check-label" for="is_enabled"> 啟用 </label>
            </div>
          </div>
        </div>
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
            class="btn"
            :class="[{ 'btn-dark': isNew }, { 'btn-light-green': !isNew }]"
            @click="updateCouponBtn"
          >
            <i
              class="bi me-2"
              :class="[{ 'bi-check-lg': isNew }, { 'bi-check-all': !isNew }]"
            ></i
            >{{ isNew ? "確定新增" : "確定修改" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global bootstrap */

export let couponModal = null;
export default {
  data() {
    return {
      tempCoupon: {},
      due_date: "",
    };
  },
  props: ["coupon", "isNew"],
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      // 將時間戳改為 YYYY-MM-DD
      [this.due_date] = new Date(this.tempCoupon.due_date * 1000)
        .toISOString()
        .split("T");
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  methods: {
    updateCouponBtn() {
      let loader = this.$loading.show();
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = "post";

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.coupon.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: this.coupon })
        .then((res) => {
          loader.hide();
          this.$emit("update-coupons");
          couponModal.hide();
          setTimeout(() => {
            alert(res.data.message);
          }, 1000);
        })
        .catch((err) => {
          loader.hide();
          console.dir(err.response);
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    couponModal = new bootstrap.Modal(this.$refs.couponModal, {
      keyboard: false,
    });
  },
};
</script>

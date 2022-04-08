<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
    ref="orderModal"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="orderModalLabel">訂單內容</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="">
              <h5>訂購人資料</h5>
              <ul class="list-unstyled">
                <li>訂購人：{{ tempOrder.user?.name }}</li>
                <li>訂單 Email：{{ tempOrder.user?.email }}</li>
                <li>電話：{{ tempOrder.user?.tel }}</li>
                <li>運送地址：{{ tempOrder.user?.address }}</li>
                <li>留言：{{ tempOrder.message }}</li>
              </ul>
            </div>
            <div class="">
              <h5>訂單資訊</h5>
              <ul class="list-unstyled">
                <li>
                  付款狀態：
                  <b v-if="tempOrder.is_paid" class="text-success">已付款</b>
                  <b v-else class="text-danger">尚未付款</b>
                </li>
                <li>訂單編號：{{ tempOrder.id }}</li>
                <li>
                  訂購日期：{{
                    new Date(tempOrder.create_at * 1000).toLocaleString()
                  }}
                </li>
                <li>
                  訂購項目：
                  <table class="table table-responsive">
                    <thead>
                      <tr>
                        <th>商品</th>
                        <th width="70">數量</th>
                        <th width="70" class="text-end">價格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in tempOrder.products" :key="item.id">
                        <td>{{ item?.product?.title }}</td>
                        <td>{{ item?.qty }}／{{ item?.product?.unit }}</td>
                        <td class="text-end">
                          {{ $filters.currencyJPY(item?.final_total) }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" class="text-end">
                          總金額：
                          <b>{{ $filters.currencyJPY(tempOrder.total) }}</b>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </li>
              </ul>
              <div class="form-check my-5">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_pay"
                  v-model="tempOrder.is_paid"
                />
                <label class="form-check-label" for="is_pay"> 已付款 </label>
              </div>
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
            class="btn btn-light-green"
            @click="updatePay(tempOrder)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global bootstrap */

export let orderModal = null;
export default {
  props: ["order"],
  data() {
    return {
      tempOrder: {
        products: {},
        user: {},
      },
    };
  },
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
  methods: {
    // 修改訂單付款
    updatePay(order) {
      let loader = this.$loading.show();
      const data = {
        is_paid: order.is_paid,
      };
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`,
          { data: data }
        )
        .then((res) => {
          // console.log(res.data);
          loader.hide();
          orderModal.hide();
          setTimeout(() => {
            alert(res.data.message);
          }, 1000);
          this.$emit("update-pay", order);
        })
        .catch((err) => {
          console.dir(err.response);
          loader.hide();
          orderModal.hide();
          setTimeout(() => {
            alert(err.response.data.message);
          }, 1000);
        });
    },
  },
  mounted() {
    orderModal = new bootstrap.Modal(this.$refs.orderModal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>

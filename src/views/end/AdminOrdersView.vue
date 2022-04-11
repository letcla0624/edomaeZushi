<template>
  <div class="container">
    <div class="text-center my-3">
      <div class="mb-3">
        <h2>顧客訂單</h2>
      </div>
      <button
        type="button"
        class="btn btn-outline-danger"
        @click="openDelAllModal('adminOrders')"
      >
        <i class="bi bi-trash-fill me-1"></i>
        <span>全部刪除</span>
      </button>
    </div>
    <div v-if="orders.length === 0">
      <div class="text-center">
        <p>尚無訂單，需多加努力！</p>
      </div>
    </div>
    <div v-else>
      <!-- 搜尋 -->
      <div class="row my-4 mb-lg-5">
        <div class="col-lg-4 col-xl-3 offset-lg-8 offset-xl-9">
          <div class="search">
            <div class="input-group">
              <span class="input-group-text" id="search">
                <i class="bi bi-search text-secondary"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="搜尋訂單編號或訂購人姓名"
                aria-label="search"
                aria-describedby="search"
                v-model.trim="searchItem"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 標頭 -->
      <div
        class="row g-3 mx-1 d-none d-lg-flex pb-2 border-bottom border-2 border-dark"
      >
        <div class="col-lg-4">
          <h3 class="h6 fw-bold">訂單</h3>
        </div>
        <div class="col-lg-4">
          <h3 class="h6 fw-bold">購買項目</h3>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold">應收帳款</h3>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold">編輯／刪除</h3>
        </div>
      </div>
      <div
        class="row g-3 mx-1 my-3 border-bottom py-3 py-lg-0 customer-card"
        v-for="order in copyOrders"
        :key="order.id"
      >
        <div class="col-lg-4">
          <div class="">
            <h3 class="h6 fw-bold d-lg-none">訂單編號</h3>
            <p
              class="border border-dashed fw-bold p-2"
              :class="[
                { 'text-danger': order.is_paid !== true },
                { 'border-danger': order.is_paid !== true },
                { 'text-light-green': order.is_paid === true },
                { 'border-light-green': order.is_paid === true },
              ]"
              style="word-break: break-all; width: fit-content"
            >
              {{ order.id }}
            </p>
          </div>
          <div class="mt-4 mt-lg-0">
            <h3 class="h6 fw-bold d-lg-none">訂購日期</h3>
            <p>
              <span class="d-none d-lg-inline">訂購日期：</span>
              {{ new Date(order.create_at * 1000).toLocaleString() }}
            </p>
          </div>
          <div class="mt-4 mt-lg-0">
            <h3 class="h6 fw-bold d-lg-none">收件人姓名</h3>
            <p class="">
              <span class="d-none d-lg-inline">收件人姓名：</span>
              {{ order.user.name }}
            </p>
          </div>
          <div class="mt-4 mt-lg-0">
            <h3 class="h6 fw-bold d-lg-none">聯絡電話</h3>
            <p class="">
              <span class="d-none d-lg-inline">聯絡電話：</span>
              {{ order.user.tel }}
            </p>
          </div>
          <div class="mt-4 mt-lg-0">
            <h3 class="h6 fw-bold d-lg-none">寄送地址</h3>
            <p class="">
              <span class="d-none d-lg-inline">寄送地址：</span>
              {{ order.user.address }}
            </p>
          </div>
          <div class="mt-4 mt-lg-0">
            <h3 class="h6 fw-bold d-lg-none">留言</h3>
            <p class="">
              <span class="d-none d-lg-inline">留言：</span>
              {{ order.message }}
            </p>
          </div>
        </div>
        <div class="col-lg-4">
          <h3 class="h6 fw-bold d-lg-none">購買項目</h3>
          <ol class="px-3">
            <li
              v-for="product in order.products"
              :key="product.id"
              class="mb-3"
            >
              <p class="d-inline">
                {{ product.product.title }}
              </p>
              <span class="mx-1 text-secondary">x</span>
              <span class="fs-7 text-light-green fw-bold"
                >(
                {{ product.qty }}
                {{ product.product.unit }}
                )
              </span>
            </li>
          </ol>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold d-lg-none">應收帳款</h3>
          <p :class="{ 'text-danger': order.is_paid !== true }">
            {{ $filters.currencyJPY(order.total) }}
          </p>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              :id="order.id"
              v-model="order.is_paid"
              @change="updatePay(order)"
            />
            <label class="form-check-label cursor-pointer mb-3" :for="order.id">
              <span class="text-light-green fw-bold" v-if="order.is_paid">
                已付款
              </span>
              <span v-else class="text-danger">未付款</span>
            </label>
          </div>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold d-lg-none">編輯／刪除</h3>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-outline-light-green"
              @click="openModal('edit', order)"
            >
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="openModal('delete', order)"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
      <PageComp :pages="pagination" @emit-page="getOrders"></PageComp>
    </div>

    <EditOrderComp :order="tempOrder" @update-order="getOrders"></EditOrderComp>
    <DelAdminComp
      :del-item="tempOrder"
      :page-name="pageName"
      @get-item="getOrders"
    ></DelAdminComp>
    <DelAllModalComp :page="page" @get-item="getOrders"></DelAllModalComp>
  </div>
</template>

<script>
import PageComp from "@/components/PageComp.vue";
import EditOrderComp, {
  orderModal,
} from "@/components/admin/EditOrderComp.vue";
import DelAdminComp, { delModal } from "@/components/admin/DelAdminComp.vue";
import DelAllModalComp, { delAllModal } from "@/components/DelAllModalComp.vue";

export default {
  data() {
    return {
      orders: {},
      copyOrders: {},
      pagination: {},
      tempOrder: {},
      pageName: "orders",
      searchItem: "",
      page: "",
    };
  },
  watch: {
    searchItem() {
      this.filterSearch();
    },
  },
  components: {
    PageComp,
    EditOrderComp,
    DelAdminComp,
    DelAllModalComp,
  },
  methods: {
    getOrders(page = 1) {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
        )
        .then((res) => {
          loader.hide();
          this.orders = res.data.orders;
          this.copyOrders = this.orders;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.dir(err.response);
          loader.hide();
        });
    },
    updatePay(order) {
      let loader = this.$loading.show();
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`,
          { data: order }
        )
        .then((res) => {
          loader.hide();
          orderModal.hide();
          setTimeout(() => {
            alert(res.data.message);
          }, 600);
          this.getOrders(this.page);
        })
        .catch((err) => {
          console.dir(err.response);
          loader.hide();
          orderModal.hide();
          alert(err.response.data.message);
        });
    },
    openModal(txt, order) {
      if (txt === "edit") {
        this.tempOrder = { ...order };
        orderModal.show();
      } else if (txt === "delete") {
        this.tempOrder = { ...order };
        delModal.show();
      }
    },
    openDelAllModal(page) {
      this.page = page;
      delAllModal.show();
    },
    // 搜尋訂單
    filterSearch() {
      const newList = JSON.parse(JSON.stringify(this.orders));
      const newArr = [];

      newList.filter((item) => {
        if (
          item.id.includes(this.searchItem) ||
          item.user.name.includes(this.searchItem)
        ) {
          newArr.push(item);
        } else if (this.searchItem === "") {
          newArr.push(this.orders);
        }
      });
      this.copyOrders = newArr;
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

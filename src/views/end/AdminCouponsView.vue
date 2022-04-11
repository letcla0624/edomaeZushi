<template>
  <div class="container">
    <div class="text-center my-3">
      <div class="mb-3">
        <h2>折扣碼列表</h2>
      </div>
      <button type="button" class="btn btn-dark" @click="openModal('new')">
        <i class="bi bi-pencil-square me-1"></i>
        <span>新增折扣碼</span>
      </button>
    </div>
    <div v-if="coupons.length === 0">
      <div class="text-center">
        <p>尚無建立折扣碼，您的鐵粉在哭哭！</p>
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
                placeholder="搜尋折扣碼"
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
        <div class="col-lg-3">
          <h3 class="h6 fw-bold">折扣碼</h3>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold">折扣數</h3>
        </div>
        <div class="col-lg-3">
          <h3 class="h6 fw-bold">到期日</h3>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold">是否啟用</h3>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold">編輯／刪除</h3>
        </div>
      </div>
      <div
        class="row g-3 mx-1 my-3 border-bottom py-3 py-lg-0 customer-card"
        v-for="coupon in copyCoupons"
        :key="coupon.id"
      >
        <div class="col-lg-3">
          <div class="">
            <h3 class="h6 fw-bold d-lg-none">折扣碼</h3>
            <p
              class="border border-dashed fw-bold p-2"
              style="width: fit-content"
              :class="[
                {
                  'border-light-green':
                    new Date().getTime() <=
                    new Date(coupon.due_date * 1000).getTime(),
                  'text-light-green':
                    new Date().getTime() <=
                    new Date(coupon.due_date * 1000).getTime(),
                  'border-danger':
                    new Date().getTime() >
                    new Date(coupon.due_date * 1000).getTime(),
                  'text-danger':
                    new Date().getTime() >
                    new Date(coupon.due_date * 1000).getTime(),
                },
              ]"
            >
              {{ coupon.code }}
            </p>
          </div>
          <div class="mt-4 mt-lg-0">
            <h3 class="h6 fw-bold d-lg-none">折扣標題</h3>
            <p>
              <b class="d-none d-lg-inline">標題：</b>
              {{ coupon.title }}
            </p>
          </div>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold d-lg-none">折扣數</h3>
          <p>打 {{ coupon.percent / 10 }} 折</p>
        </div>
        <div class="col-lg-3">
          <h3 class="h6 fw-bold d-lg-none">到期日</h3>
          <p>{{ new Date(coupon.due_date * 1000).toLocaleDateString() }}</p>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold d-lg-none">是否啟用</h3>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              :id="coupon.id"
              v-model="coupon.is_enabled"
              :true-value="1"
              :false-value="0"
              @change="updateEnabled(coupon)"
            />
            <label
              class="form-check-label cursor-pointer mb-3"
              :for="coupon.id"
            >
              <span v-if="coupon.is_enabled" class="text-light-green fw-bold">
                啟用
              </span>
              <span v-else class="text-danger">未啟用</span>
            </label>
          </div>
        </div>
        <div class="col-lg-2">
          <h3 class="h6 fw-bold d-lg-none">編輯／刪除</h3>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-outline-light-green"
              @click="openModal('edit', coupon)"
            >
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="openModal('delete', coupon)"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
      <PageComp :pages="pagination" @emit-page="getCoupons"></PageComp>
    </div>

    <CreateCouponComp
      :coupon="tempCoupon"
      :is-new="isNew"
      @update-coupons="getCoupons"
    ></CreateCouponComp>

    <DelAdminComp
      :del-item="tempCoupon"
      :page-name="pageName"
      @get-item="getCoupons"
    ></DelAdminComp>
  </div>
</template>

<script>
import PageComp from "@/components/PageComp.vue";
import CreateCouponComp, {
  couponModal,
} from "@/components/admin/CreateCouponComp.vue";
import DelAdminComp, { delModal } from "@/components/admin/DelAdminComp.vue";
export default {
  data() {
    return {
      coupons: {},
      copyCoupons: {},
      tempCoupon: {
        is_enabled: 0,
      },
      pageName: "coupons",
      pagination: {},
      isNew: true,
      searchItem: "",
    };
  },
  watch: {
    searchItem() {
      this.filterSearch();
    },
  },
  components: {
    PageComp,
    CreateCouponComp,
    DelAdminComp,
  },
  methods: {
    getCoupons(page = 1) {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
        )
        .then((res) => {
          loader.hide();
          this.coupons = res.data.coupons;
          this.copyCoupons = this.coupons;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.dir(err.response);
          loader.hide();
        });
    },
    updateEnabled(coupon) {
      let loader = this.$loading.show();
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`,
          { data: coupon }
        )
        .then((res) => {
          loader.hide();
          setTimeout(() => {
            alert(res.data.message);
          }, 600);
        })
        .catch((err) => {
          loader.hide();
          // console.dir(err.response);
          alert(err.response.data.message);
        });
    },
    openModal(txt, coupon) {
      if (txt === "new") {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
        this.isNew = true;
        couponModal.show();
      } else if (txt === "edit") {
        this.tempCoupon = { ...coupon };
        this.isNew = false;
        couponModal.show();
      } else if (txt === "delete") {
        this.tempCoupon = { ...coupon };
        this.isNew = false;
        delModal.show();
      }
    },
    // 搜尋折扣碼
    filterSearch() {
      const newList = JSON.parse(JSON.stringify(this.coupons));
      const newArr = [];

      newList.filter((item) => {
        if (item.code.includes(this.searchItem)) {
          newArr.push(item);
        } else if (this.searchItem === "") {
          newArr.push(this.coupons);
        }
      });
      this.copyCoupons = newArr;
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>

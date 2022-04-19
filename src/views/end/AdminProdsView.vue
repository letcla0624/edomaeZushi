<template>
  <div class="text-center my-3">
    <div class="mb-3">
      <h2>產品列表</h2>
      <span class="fs-7 text-secondary">
        【目前共有 {{ Object.keys(adminProds).length }} 項產品】
      </span>
    </div>
    <button type="button" class="btn btn-dark" @click="openModal('new')">
      <i class="bi bi-pencil-square me-1"></i>
      <span>新增商品</span>
    </button>
  </div>
  <div v-if="adminProds.length === 0">
    <div class="text-center">
      <p>尚無建立產品，您的鐵粉在哭哭！</p>
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
              placeholder="搜尋壽司名稱"
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
      <div class="col-lg-1">
        <h3 class="h6 fw-bold">#</h3>
      </div>
      <div class="col-lg-2">
        <h3 class="h6 fw-bold">分類</h3>
      </div>
      <div class="col-lg-5">
        <h3 class="h6 fw-bold">名稱</h3>
      </div>
      <div class="col-lg-2">
        <h3 class="h6 fw-bold">是否啟用</h3>
      </div>
      <div class="col-lg-2">
        <h3 class="h6 fw-bold">編輯／刪除</h3>
      </div>
    </div>
    <div
      class="row g-3 mx-1 my-3 my-lg-0 border-bottom py-3 py-lg-0 customer-card"
      v-for="(adminProd, idx) in copyProds"
      :key="adminProd.id"
      :class="{ 'text-gray-500': adminProd.is_enabled !== 1 }"
    >
      <div class="col-lg-1">
        <p class="mb-0 fw-bold">
          <span class="fw-bold d-lg-none me-1">#</span>{{ idx + 1 }}
        </p>
      </div>
      <div class="col-lg-2">
        <h3 class="h6 fw-bold d-lg-none">分類</h3>
        <p class="mb-0">{{ adminProd.category }}</p>
      </div>
      <div class="col-lg-5">
        <div class="">
          <h3 class="h6 fw-bold d-lg-none">名稱</h3>
          <p
            class="fw-bold text-decoration-underline cursor-pointer"
            :class="[
              {
                'text-danger':
                  adminProd.origin_price !== adminProd.price &&
                  adminProd.is_enabled === 1,
              },
              {
                'text-gray-500': adminProd.is_enabled !== 1,
              },
            ]"
            @click="openModal('detail', adminProd)"
          >
            {{ adminProd.title }}
          </p>
        </div>
        <div>
          <h3 class="h6 fw-bold d-lg-none">價格</h3>
          <div v-if="adminProd.origin_price !== adminProd.price" class="fs-7">
            <del>
              原價：{{ $filters.currencyJPY(adminProd.origin_price) }}
            </del>
            <p
              class="fw-bold mb-3"
              :class="[
                {
                  'text-danger': adminProd.is_enabled === 1,
                },
                {
                  'text-gray-500': adminProd.is_enabled !== 1,
                },
              ]"
            >
              售價：{{ $filters.currencyJPY(adminProd.price) }}
            </p>
          </div>
          <div v-else class="fs-7">
            <p
              class="fw-bold mb-3"
              :class="[
                {
                  'text-light-green': adminProd.is_enabled === 1,
                },
                {
                  'text-gray-500': adminProd.is_enabled !== 1,
                },
              ]"
            >
              售價：{{ $filters.currencyJPY(adminProd.price) }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-2">
        <h3 class="h6 fw-bold d-lg-none">是否啟用</h3>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="adminProd.id"
            v-model="adminProd.is_enabled"
            :true-value="1"
            :false-value="0"
            @change="updateEnabled(adminProd)"
          />
          <label
            class="form-check-label cursor-pointer fw-bold mb-3"
            :for="adminProd.id"
            ><span class="text-light-green fw-bold" v-if="adminProd.is_enabled"
              >啟用</span
            >
            <span v-else class="text-danger">未啟用</span></label
          >
        </div>
      </div>
      <div class="col-lg-2">
        <h3 class="h6 fw-bold d-lg-none">編輯／刪除</h3>
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn btn-outline-light-green"
            @click="openModal('edit', adminProd)"
          >
            <i class="bi bi-pencil-fill"></i>
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="openModal('delete', adminProd)"
          >
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <AdminProdViewComp :show-prod="createProdTemp" />
  <CreateProdComp
    :admin-prod="createProdTemp"
    :is-new="isNew"
    @get-adminprods="getAdminProds"
  />
  <DelAdminComp
    :del-item="createProdTemp"
    :page-name="pageName"
    @get-item="getAdminProds"
  />
</template>

<script>
import CreateProdComp, {
  prodModal,
} from "@/components/admin/CreateProdComp.vue";
import DelAdminComp, { delModal } from "@/components/admin/DelAdminComp.vue";
import AdminProdViewComp, {
  showAdminProdModal,
} from "@/components/admin/AdminProdViewComp.vue";

export default {
  data() {
    return {
      adminProds: {},
      copyProds: [],
      pagination: "",
      isLoading: "",
      isNew: true,
      pageName: "prodsList",
      createProdTemp: {
        imagesUrl: [],
      },
      searchItem: "",
    };
  },
  props: ["detectWidth"],
  watch: {
    searchItem() {
      this.filterSearch();
    },
  },
  components: {
    CreateProdComp,
    DelAdminComp,
    AdminProdViewComp,
  },
  methods: {
    getAdminProds() {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`
        )
        .then((res) => {
          loader.hide();
          // 物件轉陣列 這樣才能反轉讓新增的商品排在最前面
          this.adminProds = Object.keys(res.data.products)
            .map((key) => res.data.products[key])
            .reverse();
          this.copyProds = this.adminProds;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          loader.hide();
          console.dir(err);
        });
    },
    updateEnabled(adminProd) {
      let loader = this.$loading.show();
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${adminProd.id}`,
          { data: adminProd }
        )
        .then((res) => {
          loader.hide();
          this.createProdTemp = JSON.parse(JSON.stringify(adminProd));
          setTimeout(() => {
            alert(res.data.message);
          }, 600);
          this.getAdminProds();
        })
        .catch((err) => {
          loader.hide();
          alert(err.response.data.message);
        });
    },
    openModal(txt, adminProd) {
      if (txt === "new") {
        this.isNew = true;
        this.createProdTemp = {
          imagesUrl: [],
        };
        prodModal.show();
      } else if (txt === "edit") {
        this.isNew = false;
        this.createProdTemp = JSON.parse(JSON.stringify(adminProd));
        prodModal.show();
      } else if (txt === "delete") {
        this.isNew = false;
        this.createProdTemp = { ...adminProd };
        delModal.show();
      } else if (txt === "detail") {
        this.isNew = false;
        this.createProdTemp = adminProd;
        showAdminProdModal.show();
      }
    },
    filterSearch() {
      const newList = JSON.parse(JSON.stringify(this.adminProds));
      const newArr = [];

      newList.filter((item) => {
        if (item.title.includes(this.searchItem)) {
          newArr.push(item);
        } else if (this.searchItem === "") {
          newArr.push(this.adminProds);
        }
      });
      this.copyProds = newArr;
    },
  },
  mounted() {
    this.getAdminProds();
  },
};
</script>

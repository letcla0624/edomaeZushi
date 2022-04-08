<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="prodModalLabel"
    aria-hidden="true"
    ref="prodModal"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="prodModalLabel">
            {{ isNew ? "新增商品" : "編輯商品" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-secondary">
            <span class="text-danger me-1">*</span>為必填欄位
          </p>
          <div class="row">
            <div class="col-lg-7">
              <h5 class="h5">商品內容</h5>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control border-0 border-bottom rounded-0"
                  id="title"
                  placeholder="商品名稱"
                  v-model="tempProd.title"
                />
                <label for="title">
                  <span class="text-danger me-1">*</span>商品名稱(title)
                </label>
              </div>
              <div class="row g-3">
                <div class="col-sm">
                  <div class="form-floating mb-3">
                    <select
                      class="form-select border-0 border-bottom rounded-0"
                      id="categories"
                      aria-label="Floating label select"
                      v-model="tempProd.category"
                    >
                      <option disabled>請選擇</option>
                      <option
                        v-for="category in categories"
                        :key="category"
                        :value="category"
                      >
                        {{ category }}
                      </option>
                    </select>
                    <label for="categories"
                      ><span class="text-danger me-1">*</span
                      >分類(category)</label
                    >
                  </div>
                </div>
                <div class="col-sm">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom rounded-0"
                      id="unit"
                      placeholder="單位"
                      v-model="tempProd.unit"
                    />
                    <label for="unit"
                      ><span class="text-danger me-1">*</span>單位(unit)</label
                    >
                  </div>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-sm">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom rounded-0"
                      id="origin_price"
                      placeholder="原價"
                      min="0"
                      v-model="tempProd.origin_price"
                    />
                    <label for="origin_price"
                      ><span class="text-danger me-1">*</span>原價(origin
                      price)</label
                    >
                  </div>
                </div>
                <div class="col-sm">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control border-0 border-bottom rounded-0"
                      id="price"
                      placeholder="售價"
                      min="0"
                      v-model="tempProd.price"
                    />
                    <label for="price"
                      ><span class="text-danger me-1">*</span>售價(price)</label
                    >
                  </div>
                </div>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control border-0 border-bottom rounded-0"
                  placeholder="Leave a comment here"
                  id="description"
                  style="height: 100px"
                  v-model="tempProd.description"
                ></textarea>
                <label for="description">商品描述(description)</label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control border-0 border-bottom rounded-0"
                  placeholder="Leave a comment here"
                  id="ingredients"
                  style="height: 100px"
                  v-model="tempProd.ingredients"
                ></textarea>
                <label for="ingredients">材料內容(ingredients)</label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control border-0 border-bottom rounded-0"
                  placeholder="Leave a comment here"
                  id="content"
                  style="height: 100px"
                  v-model="tempProd.content"
                ></textarea>
                <label for="content">商品規格(content)</label>
              </div>
              <div class="form-check my-5">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  v-model="tempProd.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled"> 啟用 </label>
              </div>
            </div>
            <div class="col-lg-5">
              <h5 class="h5">商品圖片</h5>
              <div class="row g-0 align-items-center">
                <div class="col-11">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control border-0 border-bottom rounded-0"
                      id="imageUrl"
                      placeholder="主要圖片網址"
                      v-model="tempProd.imageUrl"
                    />
                    <label for="imageUrl"
                      ><span class="text-danger me-1">*</span
                      >主要圖片網址</label
                    >
                  </div>
                </div>
                <div class="col-1">
                  <button
                    class="btn btn-outline-danger border-0"
                    @click="clear"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>

                <img
                  :src="tempProd.imageUrl"
                  :alt="tempProd.title"
                  class="w-100"
                />
              </div>
              <h5 class="h5 mt-4">其餘圖片</h5>
              <!-- 如果有按下新增圖片或原本就有圖片的話 -->
              <div v-if="Array.isArray(tempProd.imagesUrl)">
                <div
                  v-for="(otherPic, key) in tempProd.imagesUrl"
                  :key="otherPic"
                >
                  <div class="row g-0 align-items-center">
                    <div class="col-11">
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control border-0 border-bottom rounded-0"
                          :id="`imagesUrl${Number.parseInt(key)}`"
                          placeholder="圖片網址"
                          v-model="tempProd.imagesUrl[key]"
                        />
                        <label :for="`imagesUrl${Number.parseInt(key)}`"
                          >圖片網址</label
                        >
                      </div>
                    </div>
                    <div class="col-1">
                      <button
                        class="btn btn-outline-danger border-0"
                        @click="delPics(key, otherPic)"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </div>
                  <img
                    :src="otherPic"
                    :alt="tempProd.title_key"
                    class="w-100"
                  />
                </div>
                <div
                  v-if="
                    !tempProd.imagesUrl.length ||
                    tempProd.imagesUrl[tempProd.imagesUrl.length - 1]
                  "
                >
                  <div class="d-grid mt-3">
                    <button class="btn btn-outline-dark" @click="addPics">
                      新增其餘圖片
                    </button>
                  </div>
                </div>
              </div>
              <!-- 如果沒有圖片的話 -->
              <div v-else>
                <div class="d-grid mt-3">
                  <button
                    class="btn btn-outline-dark"
                    @click="(this.tempProd.imagesUrl = []), addPics()"
                  >
                    新增其餘圖片
                  </button>
                </div>
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
            class="btn"
            :class="[{ 'btn-dark': isNew }, { 'btn-light-green': !isNew }]"
            @click="upProdBtn"
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

export let prodModal = null;
export default {
  data() {
    return {
      tempProd: {},
      categories: ["握り寿司", "裏巻き", "海苔巻き", "刺身"],
    };
  },
  props: ["adminProd", "isNew"],
  watch: {
    adminProd() {
      this.tempProd = this.adminProd;
    },
  },
  methods: {
    // 新增／更新按鈕
    upProdBtn() {
      let loader = this.$loading.show();
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = "post";

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.adminProd.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: this.adminProd })
        .then((res) => {
          loader.hide();
          this.$emit("get-adminprods");
          prodModal.hide();
          setTimeout(() => {
            alert(res.data.message);
          }, 1000);
        })
        .catch((err) => {
          loader.hide();
          alert(err.response.data.message);
        });
    },
    // modal 裡新增其餘圖片
    addPics() {
      this.tempProd.imagesUrl.push("");
    },
    // modal 裡刪除其餘圖片
    delPics(key) {
      this.tempProd.imagesUrl.splice(key, 1);
    },
    clear() {
      this.tempProd.imageUrl = "";
    },
  },
  mounted() {
    prodModal = new bootstrap.Modal(this.$refs.prodModal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>

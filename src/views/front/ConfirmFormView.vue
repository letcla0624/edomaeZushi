<template>
  <div class="text-start">
    <ul class="list-unstyled d-inline-block lh-lg gap-2 mb-5 check-flow">
      <li class="fs-7 fw-bold d-inline">
        <span class="badge rounded-pill bg-dark me-2"> 1 </span>
        カート
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li class="fs-7 fw-bold d-inline">
        <span class="badge rounded-pill bg-dark me-2"> 2 </span>
        注文を作成する
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li class="fs-7 fw-bold d-inline">
        <span class="badge rounded-pill bg-dark me-2"> 3 </span>
        支払い
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li
        class="fs-7 fw-bold d-inline"
        :class="{ 'opacity-25': order.is_paid !== true }"
      >
        <span class="badge rounded-pill bg-dark me-2"> 4 </span>
        終了した
      </li>
    </ul>
  </div>
  <div class="row">
    <div class="col-lg-11 col-xl-10 col-xxl-8">
      <div class="mb-5">
        <h2 class="h5 fw-bold">購入情報</h2>
        <ol class="ps-3">
          <li>
            <p class="fw-bold">
              * [私の注文]
              ページで検索または支払いを行うために、注文番号をコピーするか覚えておいてください。
            </p>
          </li>
          <li>
            <p>未払いの注文は、後で [私の注文] で確認できます。</p>
          </li>

          <li>
            <p>
              現在の出来事による当社の運送業者からの制約により、出荷が遅れたり、在庫が制限されたりする場合があります。
            </p>
          </li>
        </ol>
      </div>
      <div class="mb-5">
        <div class="row g-2 my-3">
          <div class="col">
            <p
              v-if="order.is_paid === true"
              class="text-light-green fw-bold fs-4 mb-0"
            >
              既に支払いました
            </p>
            <p v-else class="text-deep-red fw-bold fs-3 mb-0">注文は未払い</p>
          </div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>注文番号：</b></div>
          <div class="col-sm-8">
            <a
              href="#"
              @click.prevent="copyTxt"
              class="px-3 py-2 border border-dark border-dashed"
              title="クリックしてコピー"
            >
              <strong ref="copyText">{{ order.id }}</strong>
              <i class="bi bi-files ms-1"></i>
            </a>
          </div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>注文時間：</b></div>
          <div class="col-sm-8">
            {{ new Date(order.create_at * 1000).toLocaleString("ja-JP") }}
          </div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>メールアドレス：</b></div>
          <div class="col-sm-8">{{ order.user.email }}</div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>荷受人の名前：</b></div>
          <div class="col-sm-8">{{ order.user.name }}</div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>連絡先番号：</b></div>
          <div class="col-sm-8">{{ order.user.tel }}</div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>お届け先の住所：</b></div>
          <div class="col-sm-8">{{ order.user.address }}</div>
        </div>
        <div v-if="order.message" class="row g-2 my-3">
          <div class="col-sm-4"><b>言いたいです：</b></div>
          <div class="col-sm-8">{{ order.message }}</div>
        </div>
      </div>
      <div class="col-12">
        <div class="d-grid gap-3 mt-4 mt-md-3">
          <div
            v-if="order.is_paid !== true"
            class="d-md-flex justify-content-md-between align-items-center"
          >
            <router-link
              to="/myOrders"
              class="btn btn-link w-100 mb-3 d-flex justify-content-center justify-content-md-start align-items-center"
            >
              <i class="bi bi-chevron-left me-1"></i>
              支払うのを待つ
            </router-link>
            <router-link
              :to="`/finished/${order.id}`"
              class="btn hvr-btn-dark w-100 mb-3 d-flex justify-content-center align-items-center"
              @click="toPay"
            >
              支払いを確認する
            </router-link>
          </div>
          <router-link
            v-else
            to="/myOrders"
            class="btn hvr-btn-dark mb-3 w-100 d-flex justify-content-center align-items-center"
          >
            注文に戻る
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import copyText from "@/utility/copyText";

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: this.$route.params,
    };
  },
  inject: ["emitter"],
  methods: {
    // 取得訂單
    getOrder() {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId.id}`
        )
        .then((res) => {
          loader.hide();
          this.order = res.data.order;
        })
        .catch((err) => {
          loader.hide();
          alert(err.response.data.message);
        });
    },
    // 付款
    toPay() {
      let loader = this.$loading.show();

      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId.id}`
        )
        .then((res) => {
          loader.hide();
          this.order = res.data.order;
          // alert(res.data.message);
        })
        .catch((err) => {
          loader.hide();
          alert(err.response.data.message);
        });
    },
    // 複製文字
    copyTxt() {
      const txt = this.$refs.copyText.innerText;
      copyText(txt);
      // 全域的 emitter
      this.emitter.emit("toast-message", {
        style: "success",
        content: "コピーされた注文番号",
      });
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>

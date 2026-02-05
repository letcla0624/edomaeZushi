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
        ご注文内容の確認
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li class="fs-7 fw-bold d-inline">
        <span class="badge rounded-pill bg-dark me-2"> 3 </span>
        お支払い
        <i class="bi bi-arrow-right ms-1 me-2 mx-md-3"></i>
      </li>
      <li
        class="fs-7 fw-bold d-inline"
        :class="{ 'opacity-25': order.is_paid !== true }"
      >
        <span class="badge rounded-pill bg-dark me-2"> 4 </span>
        ご注文完了
      </li>
    </ul>
  </div>
  <div class="row">
    <div class="col-lg-11 col-xl-10 col-xxl-8">
      <div class="mb-5">
        <h2 class="h5 fw-bold">ご購入情報</h2>
        <ol class="ps-3">
          <li>
            <p class="fw-bold">
              *
              注文番号を控えるか、コピーして保存してください。「注文履歴」ページでの照会やお支払いに必要となります。
            </p>
          </li>
          <li>
            <p>未払いのご注文は、後ほど「注文履歴」よりご確認いただけます。</p>
          </li>

          <li>
            <p>
              物流の混雑や情勢の影響により、配送の遅延や在庫の制限が発生する場合がございます。あらかじめご了承ください。
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
              支払い済み
            </p>
            <p v-else class="text-deep-red fw-bold fs-3 mb-0">支払い待ち</p>
          </div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>注文番号：</b></div>
          <div class="col-sm-8 mt-4 mb-3 my-sm-2">
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
          <div class="col-sm-4"><b>注文日時：</b></div>
          <div class="col-sm-8">
            {{ new Date(order.create_at * 1000).toLocaleString("ja-JP") }}
          </div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>メールアドレス：</b></div>
          <div class="col-sm-8">{{ order.user.email }}</div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>受取人氏名：</b></div>
          <div class="col-sm-8">{{ order.user.name }}</div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>電話番号：</b></div>
          <div class="col-sm-8">{{ order.user.tel }}</div>
        </div>
        <div class="row g-2 my-3">
          <div class="col-sm-4"><b>お届け先住所：</b></div>
          <div class="col-sm-8">{{ order.user.address }}</div>
        </div>
        <div v-if="order.message" class="row g-2 my-3">
          <div class="col-sm-4"><b>備考事項：</b></div>
          <div class="col-sm-8">{{ order.message }}</div>
        </div>
      </div>
      <div class="col-12">
        <div class="d-grid gap-3 mt-4 mt-md-3">
          <div
            v-if="order.is_paid !== true"
            class="d-md-flex justify-content-md-between align-items-center"
          >
            <RouterLink
              :to="`/finished/${order.id}`"
              class="btn hvr-btn-dark w-100 mb-3 d-flex justify-content-center align-items-center order-1"
              @click="toPay"
            >
              お支払いへ進む
            </RouterLink>
            <RouterLink
              to="/myOrders"
              class="btn btn-link ps-0 w-100 mb-3 d-flex justify-content-center justify-content-md-start align-items-center order-6"
            >
              <i class="bi bi-chevron-left me-1"></i>
              戻る
            </RouterLink>
          </div>
          <RouterLink
            v-else
            to="/myOrders"
            class="btn hvr-btn-dark mb-3 w-100 d-flex justify-content-center align-items-center"
          >
            注文履歴に戻る
          </RouterLink>
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
        user: {}
      },
      orderId: this.$route.params
    };
  },
  inject: ["emitter"],
  methods: {
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
    toPay() {
      let loader = this.$loading.show();

      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId.id}`
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
    copyTxt() {
      const txt = this.$refs.copyText.innerText;
      copyText(txt);
      // 全域的 emitter
      this.emitter.emit("toast-message", {
        style: "success",
        content: "コピーされた注文番号"
      });
    }
  },
  mounted() {
    this.getOrder();
  }
};
</script>

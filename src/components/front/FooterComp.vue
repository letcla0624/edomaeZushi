<template>
  <div id="footer">
    <div class="container-fluid paper bg-light py-5">
      <div class="container py-5">
        <div class="row g-3">
          <div class="col-lg-4">
            <h5 class="my-4">お問い合わせ</h5>
            <ul class="list-unstyled fs-7">
              <li class="mb-3">
                <a href="tel:+815052636014">
                  <i class="bi bi-telephone me-2"></i>
                  +81 50-5263-6014
                </a>
              </li>
              <li class="mb-3">
                <a
                  href="https://www.google.com/maps/place/%E9%AE%A8%E5%87%A6%E3%81%86%E3%81%88%E3%81%AE/@43.054456,141.354884,15z/data=!4m5!3m4!1s0x0:0xbc51a124cdfeff35!8m2!3d43.0537975!4d141.355099?hl=zh-TW"
                  target="_blank"
                >
                  <div class="d-flex align-items-start">
                    <i class="bi bi-pin-map me-2"></i>
                    <span>
                      北海道札幌市中央区南６条西３丁目 ジョイフルサッポロ 1F
                    </span>
                  </div>
                </a>
              </li>
              <li class="mb-3">
                <div class="d-flex align-items-start">
                  <i class="bi bi-alarm me-2"></i>
                  <span>月曜日～土曜日 15：00〜22：00、日曜日定休</span>
                </div>
              </li>
              <li class="mb-3">
                <div class="d-flex align-items-start">
                  <i class="bi bi-percent me-2"></i>
                  <span>今月の割引コード：</span>
                  <a
                    href="#"
                    @click.prevent="copyTxt"
                    title="クリックしてコピー"
                  >
                    <strong ref="copyText">EDOMAE10ALL</strong>
                    <i class="bi bi-files ms-1"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg-4">
            <div>
              <h5 class="my-4">メンバーシップサービス</h5>
              <ul class="list-unstyled fs-7">
                <li class="mb-3">
                  <RouterLink to="/privacy">
                    <i class="bi bi-arrow-right-short me-2"></i>
                    プライバシーポリシー
                  </RouterLink>
                </li>
                <li class="mb-3">
                  <RouterLink to="/service">
                    <i class="bi bi-arrow-right-short me-2"></i>
                    利用規約
                  </RouterLink>
                </li>
                <li class="mb-3">
                  <RouterLink to="/questions">
                    <i class="bi bi-arrow-right-short me-2"></i>
                    一般的な問題
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div>
              <h5 class="my-4">スタッフエリア</h5>
              <ul class="list-unstyled fs-7">
                <li>
                  <RouterLink to="/admin" class="btn hvr-btn-outline-dark">
                    バックグラウンドログイン
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4">
            <h5 class="my-4">地図</h5>
            <div id="map"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid paper bg-light pb-5 py-lg-3">
      <div class="container">
        <div class="row align-items-center text-center">
          <div class="col-lg-4 order-lg-1">
            <ul
              class="list-unstyled d-flex justify-content-center justify-content-lg-end mb-lg-0"
            >
              <li class="px-3">
                <a
                  href="#"
                  class="d-flex align-items-center"
                  @click.prevent="BackToTop"
                >
                  <span class="fs-8">Back to Top</span>
                  <i class="bi bi-arrow-up-circle-fill ms-2 fs-4"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-8 order-lg-6">
            <p class="mb-0 fs-8 text-lg-start">
              &copy; {{ year }} <strong>edomaezushi.</strong> All Rights
              Reserved. Designed by Will Wu.
              このウェブサイトは個人的な使用のみを目的としており、商用目的ではありません。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import copyText from "@/utility/copyText";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "@/assets/images/sushi.png";
// 保留 leaflet 預設 icon 寫法
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

export default {
  data() {
    return {
      year: null,
    };
  },
  inject: ["emitter"],
  methods: {
    getDate() {
      let date = new Date();
      this.year = date.getFullYear();
    },
    copyTxt() {
      const txt = this.$refs.copyText.innerText;
      copyText(txt);
      // 全域的 emitter
      this.emitter.emit("toast-message", {
        style: "success",
        content: "割引コードがコピーされました",
      });
    },
    BackToTop() {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    },
  },
  mounted() {
    this.getDate();

    var map = L.map("map").setView([43.054456, 141.354884], 17);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 21,
        id: "mapbox/light-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: `${process.env.VUE_APP_ACCESSTOKEN}`,
      }
    ).addTo(map);

    // 保留 leaflet 預設 icon 寫法
    // let DefaultIcon = L.icon({
    //   iconUrl: icon,
    //   shadowUrl: iconShadow,
    // });
    // L.Marker.prototype.options.icon = DefaultIcon;

    const customerIcon = L.icon({
      iconUrl: icon,
      iconSize: [36, 36],
    });

    L.marker([43.054456, 141.354884], { icon: customerIcon })
      .addTo(map)
      .bindPopup("<strong class='fs-7'>江戸前寿司</strong>")
      .openPopup();
  },
};
</script>

<style>
#map {
  height: 250px;
}
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  background: white;
  color: #333;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  border-radius: 0;
}
.leaflet-bar {
  border: 1px solid var(--bs-gray-300) !important;
  border-radius: 0;
}
</style>

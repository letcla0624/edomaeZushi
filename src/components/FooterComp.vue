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
                  <span>月曜日～土曜日 15：00〜22：00 日曜日定休</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg-4">
            <div>
              <h5 class="my-4">メンバーシップサービス</h5>
              <ul class="list-unstyled fs-7">
                <li class="mb-3">
                  <a href="#">
                    <i class="bi bi-arrow-right-short me-2"></i>
                    プライバシーポリシー
                  </a>
                </li>
                <li class="mb-3">
                  <a href="#">
                    <i class="bi bi-arrow-right-short me-2"></i>
                    利用規約
                  </a>
                </li>
                <li class="mb-3">
                  <a href="#"
                    ><i class="bi bi-arrow-right-short me-2"></i>
                    一般的な問題
                  </a>
                </li>
                <li class="mb-3">
                  <a href="#">
                    <i class="bi bi-arrow-right-short me-2"></i>
                    返品情報
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 class="my-4">スタッフエリア</h5>
              <ul class="list-unstyled fs-7">
                <li class="">
                  <router-link to="/admin" class="btn btn-outline-dark">
                    バックグラウンドログイン
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4">
            <h5 class="my-4">地図</h5>
            <!-- <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.4120143281566!2d141.3529103162209!3d43.05380139899852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b29868bfe21d5%3A0xbc51a124cdfeff35!2z6a6o5Yem44GG44GI44Gu!5e0!3m2!1szh-TW!2stw!4v1646748937964!5m2!1szh-TW!2stw"
              height="250"
              style="border: 0; filter: grayscale(1)"
              allowfullscreen="true"
              loading="lazy"
              class="w-100"
            ></iframe> -->
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
              <li class="pe-3">
                <a href="#"><i class="bi bi-facebook fs-4"></i></a>
              </li>
              <li class="px-3">
                <a href="#"><i class="bi bi-instagram fs-4"></i></a>
              </li>
              <li class="px-3">
                <a href="#"><i class="bi bi-line fs-4"></i></a>
              </li>
              <li class="px-3">
                <a href="#"><i class="bi bi-twitter fs-4"></i></a>
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
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "@/assets/images/sushi.png";
// leaflet 預設 icon
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

export default {
  data() {
    return {
      year: null,
    };
  },
  methods: {
    getDate() {
      let date = new Date();
      this.year = date.getFullYear();
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
        accessToken:
          "pk.eyJ1IjoibGV0Y2xhIiwiYSI6ImNsMTZqdDB3MTBxcjgzanA4aXh1dDlpbGwifQ.-dZJhjOm2AFoOFL6JHyLVA",
      }
    ).addTo(map);

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

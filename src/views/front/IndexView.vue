<template>
  <div
    class="banner"
    id="banner1"
    :class="{ sticky: fixClass }"
    :style="{ '--scale': progress }"
  >
    <div
      class="bg-black w-100 bg-opacity-25 d-flex justify-content-center align-items-center"
      style="height: 100vh; z-index: 1"
    ></div>
    <div class="bannerBg">
      <img
        :src="
          detectWidth >= 992
            ? 'https://storage.googleapis.com/vue-course-api.appspot.com/letcla/1649229907785.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ELCp8vMIdmfZ%2BQe41jRlEdr%2Br09abtRf1Ba8zBLuXcRrVd5IiqLlku9g%2FbQcZNstfZkNupj3pwqLcx8TAAeFYgcU8%2BLpGYJ8PcmuDhLjXs2QPh%2BED4bvxAZJFgmLhMXVCB2VIjw2Ns%2F%2FL37aQQk2wkhFqGJyr5v4KyPaRITRbZPDXbAJIjM6Y2yi%2B9qGBej1YOxiSBDuakUlpyHWrBCCjkvRiOkCQGFlTf0KKgB0sN9k3w%2FImqtyK5PkFZvBcvcy6q6otQH08ZGkjD27hxvv8g4wYLFXUu2HUe2qMlSAXHzFycEluAdAK4OBGsNaGQNvXrsLLtB%2BSw8D%2Bcorz9Ebzw%3D%3D'
            : 'https://storage.googleapis.com/vue-course-api.appspot.com/letcla/1649229601399.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SF6%2B2zElrCr0y1Ir5XBc%2BZb%2FlX9Njym5jZPVwCx9W2voJRZQFX6T4EDXesHQIXrktf6FxnX%2B8J2OuzC%2Bj85WzlPjrrAa%2FkBj6F4DAP1UZnRbLUXdl1XmbGLDHSDsfp4DTm0Zhq%2BjipXignSqCYXqojnaOwXJzeV7KErMyHQPOhjJ3nhxuPbs3hNwSZ0PdVdyBbvBd9gFjfNUDmKAQxkPU5EPhAhWkx6LzY5l2wWjcXdtpwr%2F7xFK1XsRiSegkBUA%2BLkPiZt8Lt%2FccbT5UHOS6mxIvh4Cc72V3KntFh1jG6sqPwhcL2jMhl8q1aP1wFCoUvB9ijTCjRJ2WUWzHI7CYA%3D%3D'
        "
        alt="江戸前寿司"
      />
    </div>
    <div
      class="box p-3 mx-auto"
      style="width: 90%"
      :style="{ opacity: bannerTextOpacity }"
    >
      <div class="border border-dark p-4">
        <div class="mt-3 mb-5">
          <h2>没入型の寿司</h2>
          <p class="lh-base py-3">
            日本の大正時代には、美学、色彩芸術、そしてシェフの精神が守られていました。伝統的な日本料理を食べても、スタイリッシュに食べる必要があります。
          </p>
        </div>
        <div class="scrolling text-center">
          <div class="mouse border border-dark">
            <div class="dot"></div>
          </div>
          <p class="fw-bold mt-1 fs-8">Scroll Down</p>
        </div>
      </div>
    </div>
  </div>
  <div class="banner" id="banner2" :class="{ static: fixClass }">
    <div
      class="bg-black w-100 bg-opacity-25 d-flex justify-content-center align-items-center"
      style="height: 100vh; z-index: 1"
    ></div>
    <div class="bannerBg">
      <img
        :src="
          detectWidth >= 992
            ? 'https://storage.googleapis.com/vue-course-api.appspot.com/letcla/1649229907785.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ELCp8vMIdmfZ%2BQe41jRlEdr%2Br09abtRf1Ba8zBLuXcRrVd5IiqLlku9g%2FbQcZNstfZkNupj3pwqLcx8TAAeFYgcU8%2BLpGYJ8PcmuDhLjXs2QPh%2BED4bvxAZJFgmLhMXVCB2VIjw2Ns%2F%2FL37aQQk2wkhFqGJyr5v4KyPaRITRbZPDXbAJIjM6Y2yi%2B9qGBej1YOxiSBDuakUlpyHWrBCCjkvRiOkCQGFlTf0KKgB0sN9k3w%2FImqtyK5PkFZvBcvcy6q6otQH08ZGkjD27hxvv8g4wYLFXUu2HUe2qMlSAXHzFycEluAdAK4OBGsNaGQNvXrsLLtB%2BSw8D%2Bcorz9Ebzw%3D%3D'
            : 'https://storage.googleapis.com/vue-course-api.appspot.com/letcla/1649229601399.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SF6%2B2zElrCr0y1Ir5XBc%2BZb%2FlX9Njym5jZPVwCx9W2voJRZQFX6T4EDXesHQIXrktf6FxnX%2B8J2OuzC%2Bj85WzlPjrrAa%2FkBj6F4DAP1UZnRbLUXdl1XmbGLDHSDsfp4DTm0Zhq%2BjipXignSqCYXqojnaOwXJzeV7KErMyHQPOhjJ3nhxuPbs3hNwSZ0PdVdyBbvBd9gFjfNUDmKAQxkPU5EPhAhWkx6LzY5l2wWjcXdtpwr%2F7xFK1XsRiSegkBUA%2BLkPiZt8Lt%2FccbT5UHOS6mxIvh4Cc72V3KntFh1jG6sqPwhcL2jMhl8q1aP1wFCoUvB9ijTCjRJ2WUWzHI7CYA%3D%3D'
        "
        alt="江戸前寿司"
      />
    </div>
    <div class="box bg-transparent m-3 p-3" :style="{ opacity: logoOpacity }">
      <div class="logo">
        <LogoWhiteCubeComp />
      </div>
    </div>
  </div>
  <div class="paper">
    <FrontNavbarComp
      :fixed="fixed"
      :detectWidth="detectWidth"
    ></FrontNavbarComp>

    <!-- 關於 -->
    <div class="container-fluid paper">
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-12 col-xl-6 offset-xl-3">
            <article
              class="py-4 py-lg-5 mx-auto"
              :class="[
                { 'vrl-text': detectWidth >= 992 },
                { 'lh-xl': detectWidth >= 992 },
                { 'lh-lg': detectWidth < 992 },
              ]"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <h3 class="h2 text-center mb-3">江戸前寿司について</h3>
              <p>
                2021 年、28
                歳のウィル氏は、伝統的な握りスタイルで新鮮な寿司を提供する寿司レストランを開くことを夢見ていました。
                同年 12
                月、江戸前寿司の設立に成功し、夢を実現し、日本の伝統文化を新しい時代へと導きました。
              </p>
              <p>
                ウィル氏のリーダーシップのもと、2022
                年に江戸前寿司が正式に設立され、一瞬にして高品質な寿司のシンボルとなった新鮮な寿司のブランド名が付けられました。
                3
                年後、台湾、日本、香港、中国、オーストラリアなどの海外に事業を拡大しました。
              </p>
              <p>
                江戸前寿司は、日本の伝統的な寿司文化を継承し、国境を越え、世界に日本の伝統的な握り寿司を食べさせてきました。
                江戸前寿司は常に革新を続けており、伝統的な味わいの下で世界中のお客様の絶え間なく変化する味に応えています。
              </p>
            </article>
          </div>
        </div>
        <div class="row g-3 pt-5">
          <div class="col-md-6">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/letcla/1649227120236.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=WYdk6JtWKLl3%2FO34ZkZAsL89TidVbfdX9DHcZlESBOS7uYqRpK7RVV%2BE%2Blwzy5hEPX9dcKKymPqARNvBWjfhoL8hVmZMvoMJ24%2FZp%2BSoYc8SuRk92XIm8G%2FPe%2BvsmYq8bGyZIS4e1cbrV78frrZFiYLMYQ3DrotcVeT8n5bgCqhs0aquYoQPhaUDb1YdGGWL9YfVVwweHU2Q9e3Pyq6%2BbOVh7Q7EYrOpYHCXJhf32BtbrIV31ALPeFONVIyBxhCi63GtLe%2BLwLr1b%2Bs5jw5LBGpF6joem1FO%2BumONaKdo8QpPEf5RFPYjbJGiJkmZwjuKir5DXaBKHup2MiiHZTYbQ%3D%3D"
              alt="江戸前寿司"
              class="w-100"
              data-aos="fade-down"
              data-aos-duration="1000"
            />
          </div>
          <div class="col-md-6">
            <div class="row g-3">
              <div class="col-12">
                <div class="position-relative">
                  <img
                    src="https://storage.googleapis.com/vue-course-api.appspot.com/letcla/1649689962907.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=RJaHps7Jg5nuSqt%2FszeNBVOIfCA%2BkoqNjHbDnssR2oToGDyHrgwQEMyEo6GLJTdZm%2BdLzliYlYI9kkiMNKeM68g8fce8Xim9%2FKmVDpQeOD6fyDq1wxrsfrw%2BjP2Qm1FcwM%2FISiKyTAgLfmwBumu3LuzBG7XUsJl3f1ZTOWcEnrENb8RJxrcyjv8TAYUBQNofJNckriREmLq%2BwfRVAZBI6zArhpW%2FI2oITmNo9KY6KFB3Lwcrh%2Bpk6TJ07%2FR%2BqrGb0DzYE89tZflpK1kishBENEtYrhitVokQ1xB1UoSCI%2Fs5K0bLdqzrRzAiUoY1Oh%2BPnfHnysdL0Z61WN%2BYMeZIag%3D%3D"
                    alt="江戸前寿司"
                    class="w-100"
                    data-aos="fade-down"
                    data-aos-delay="300"
                    data-aos-duration="1000"
                  />
                  <div class="about-icon">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6993/6993057.png"
                      alt="sushi-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品 -->
    <div class="container pb-5 pt-lg-5">
      <div class="row pb-5 pt-lg-5">
        <div class="col-lg-6 offset-lg-3">
          <h3 class="h2 text-center">人気が高い</h3>
          <p class="lh-lg mb-5">
            「江戸前寿司」で変わっていないのは、酢漬け、蒸し、茹で、広げなどの塩漬けや酢など、酢飯にかけられた具材が今でも手間がかかることです。これが最大の違いです今日の握り寿司と江戸前寿司の間。
          </p>
        </div>
      </div>
      <div class="row py-lg-5">
        <div class="col-lg-8 offset-lg-2">
          <div class="row align-items-center g-4 pb-5 mb-5">
            <div class="col-md-6 order-md-1">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/letcla/1649228209978.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=WVqeh2gfKgWOmuEjLEa6lfzXj9EAwkcW07Fum7uqytnGtr7F2vQh9syzNESjbVWI%2BYS2YuxcLXf8wVjAkzrBOF0xjrCQD8dfofM%2FiDYSxdy5vH09VGKnNgJ9J%2BTF6tkauF8muFqJHGVefVKNDUZ4sFfwGZ6OjW%2FEP3xlpWIHKQR46rkR7ST6j9SUnN5IS5NGEZZnG4DS65FHmT%2BO6RNVvaJKXSAAxDhVc%2Fayv3c3IPWfj0irOBABmM01uySdidMTRpgrAQ46xRkBZDZUumdu%2BgflVeHXjr2j2aVeWOGBo8mZQilrc2ncvCfgoxfXOv%2FKcce3ICDEKJf52fgeQwTviw%3D%3D"
                alt="トリュフとフォアグラのビーフ握り寿司"
                class="w-100"
                style="max-height: 636px; object-fit: cover"
                data-aos="fade-down"
                data-aos-duration="1000"
              />
            </div>
            <div class="col-md-6 order-md-6">
              <div
                class="hot-text mx-auto"
                :class="{ 'vrl-text': detectWidth >= 992 }"
              >
                <h4>トリュフとフォアグラのビーフ握り寿司</h4>
                <p class="lh-lg mb-4">
                  灼熱のフォアグラの香り、アンガスビーフの美味しさ、トリュフの装飾の3つの贅沢な食材を組み合わせた繊細なフォアグラは、一口でとても柔らかく滑らかな厚みのある滑らかな食感に変わります。
                </p>
              </div>
              <RouterLink
                :to="`/prod/-MxrMaWm-dDFXbAZI7Cz`"
                class="btn hvr-btn-outline-dark w-100 d-flex justify-content-center align-items-center"
              >
                詳しくはこちら
              </RouterLink>
            </div>
          </div>
          <div class="row align-items-center g-4 pb-5 mb-5">
            <div class="col-md-6">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/letcla/1649228244331.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ddXIvreM60Zfc%2FePPs3va%2F0zSlMO0uxY5PTQyCq9%2FqrHjwu04jXMiWDcauDVxxySfwCpynohrsuTTlkjztizyY4OlLWzAtMAoMrVhlzDBu2e6qQyWjbESouJA9CssYgH0ws4yT7SKQ1fto%2BaFoix3rl0%2FFzWagLd%2FJb5E7PtsCUK3PVwEXE0rhkPWnjgsjX9DOndj%2FsE0IOVNPt4rkCh7Er0MrkB35qXG8KbyZTmYe2NpdoTfQetn2R7A7Mlr3cYNaJKIiWUSODce5TB2iWXcDyaM3hL%2Ftm%2FYcuIALELdVGCyBp7wV%2Bqd7Jc8bofKp3l2NJ4D2M3YBKXhcIK6%2BliBQ%3D%3D"
                alt="黒マグロ握り寿司"
                class="w-100"
                style="max-height: 636px; object-fit: cover"
                data-aos="fade-down"
                data-aos-delay="300"
                data-aos-duration="1000"
              />
            </div>
            <div class="col-md-6">
              <div
                class="hot-text mx-auto"
                :class="{ 'vrl-text': detectWidth >= 992 }"
              >
                <span
                  class="badge rounded-pill bg-deep-red mb-3 px-lg-1 py-lg-2"
                  >シーズン限定</span
                >
                <h4 class="me-lg-2">黒マグロ握り寿司</h4>
                <p class="lh-lg mb-4">
                  肉は繊細で濃厚で、お腹のしっぽのさわやかな味わいにサクサク感があります。細かく刻んだ野菜、完璧な協奏曲が口の中に残ります。
                </p>
              </div>
              <RouterLink
                :to="`/prod/-MxrMxWZoPzUjz0al_K1`"
                class="btn hvr-btn-outline-dark w-100 d-flex justify-content-center align-items-center"
              >
                詳しくはこちら
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Swiper -->
      <div class="row py-5">
        <div class="col-lg-6 offset-lg-3">
          <h3 class="h2 text-center">ランダムな推奨</h3>
          <p class="lh-lg mb-3">
            ミシュラン賞を受賞した江戸前寿司の作り方の細部は、すべてのシェフが真剣に取り組み、何年もの努力を要し、「1回のセッション、1回のセッション」でしか成功できないことを示しています。
          </p>
        </div>
        <div class="d-flex justify-content-end align-items-center fs-7">
          <RouterLink
            to="/products"
            class="btn btn-link d-flex align-items-center"
          >
            もっと見る
            <i class="bi bi-chevron-right ms-1"></i>
          </RouterLink>
        </div>
        <SwiperComp />
      </div>
    </div>
  </div>

  <!-- chief -->
  <div class="container-fluid bg-dark px-0 bg-size-cover chief">
    <div
      class="bg-black w-100 h-100 bg-opacity-25 d-flex justify-content-center align-items-center"
    >
      <div
        class="text-white text-center p-3"
        data-aos="fade-down"
        data-aos-delay="300"
        data-aos-duration="1000"
      >
        <div class="mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 384 384"
            style="enable-background: new 0 0 384 384"
            xml:space="preserve"
            width="48"
          >
            <path
              d="M208.5,180.5c-3.2-21.7-1-42.8,9-62.6c10.2-20.1,26.2-34.3,45.4-45.3c2.3-1.3,4.6-2.6,7.5-4.3c-4.7-1.5-8.6-2.9-12.5-4
	c-29.5-8.7-59.6-10.1-90-6.4c-18.6,2.3-37,5.8-54.1,13.7c-25.5,11.7-47.2,28.8-66.4,49c-21.8,22.9-37.3,49.5-44,80.7
	c-1.5,6.9-2.3,14-3.4,21v20.2c1.1,6.9,1.9,13.8,3.4,20.6c5.7,26.6,18.8,49.4,36.2,70c15.4,18.2,33.2,33.8,53,47
	c2,1.4,4.2,2.6,6.3,3.9h8.2c0.6-0.2,1.1-0.6,1.7-0.7c21.5-3.8,34.9-16.4,40.4-37.5c3.5-13.6,2.4-27.2-0.1-40.8
	c-1.5-8.1-8-11.5-15.9-9.2c-9.2,2.7-18.5,5.5-27.9,6.6c-32.4,3.7-57.7-8.3-75.6-35.7c-1.3-1.9-1.6-3.4-0.1-5.3
	c5.1-6.6,9.6-13.7,15.2-19.8c23.2-25.1,50.8-33.1,83.3-20.7c29.8,11.3,60.4,19.5,91.6,25.8c4.7,0.9,9.4,1.6,14.5,2.5
	c-0.5-1-0.7-1.5-1-1.9C220.7,226.7,212,204.5,208.5,180.5z M383.2,226.3c-4.5-28.2-12.3-55.4-25.9-80.7
	c-14.2-26.2-33.3-47.7-58.8-63.5c-2.1-1.3-3.6-1.4-5.7-0.2c-6.4,3.7-12.9,7-19.3,10.7c-17.1,9.8-31,22.6-38.4,41.4
	c-7.2,18.1-6.4,36.6-2.1,55.2c5.3,22.9,16.4,43.2,29.6,62.4c0.6,0.9,2.2,1.5,3.4,1.6c9,0.6,17.9,1.1,30.2,1.8
	c10.3-1,23.8-1.8,37.3-3.6c14.7-2,29-6.2,42.5-12.5C381.6,236.3,384.1,232,383.2,226.3z M299.8,167.7c-6.3,0.1-11.5-4.9-11.5-11.2
	c0-6.1,5.1-11.2,11.2-11.2c6.1-0.1,11.2,4.9,11.3,11.1C310.8,162.5,306,167.5,299.8,167.7z M99.9,31.3c9.2,2.2,17.8,5.4,25.8,10.5
	c1.2,0.8,3.3,0.8,4.9,0.4c21.7-5.6,43.8-8.4,66.2-8.5c8.3,0,16.7,0,25.1,0C210.5,21,196.8,11.4,180.4,6C152.4-3.2,125,0.4,98,10
	c-4.8,1.7-7.4,6.1-7.1,10.8C91.2,26,94.4,30,99.9,31.3z"
              style="fill: #fff"
            />
          </svg>
        </div>
        <h3 class="h2">最もオーソドックスな方法</h3>
        <p class="mb-0">インスタントで新鮮で速い寿司</p>
      </div>
    </div>
  </div>

  <FooterComp />
  <ToastComp />
</template>

<script>
import FrontNavbarComp from "@/components/front/FrontNavbarComp.vue";
import LogoWhiteCubeComp from "@/components/logo/LogoWhiteCubeComp.vue";
import FooterComp from "@/components/front/FooterComp.vue";
import SwiperComp from "@/components/front/SwiperComp.vue";
import emitter from "@/utility/emitter.js";
import ToastComp from "@/components/ToastComp.vue";

export default {
  data() {
    return {
      progress: 2,
      logoOpacity: 0,
      bannerTextOpacity: 1,
      fixed: false,
      propsDetectWidth: 0,
      detectWidth: null,
      loader: null,
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  components: {
    FrontNavbarComp,
    LogoWhiteCubeComp,
    FooterComp,
    SwiperComp,
    ToastComp,
  },
  computed: {
    fixClass() {
      return this.progress > 1;
    },
  },
  methods: {
    getProducts(page = 1) {
      let loader = this.$loading.show();
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
        )
        .then(() => {
          loader.hide();
        })
        .catch(() => {
          loader.hide();
        });
    },
  },
  mounted() {
    this.getProducts();

    // 初判斷一進入的螢幕寬度
    this.detectWidth = window.innerWidth;
    // 螢幕寬度縮放
    window.addEventListener("resize", () => {
      this.detectWidth = window.innerWidth;
    });

    // 視窗捲動時
    document.addEventListener("scroll", () => {
      // 首頁 Banner 開頭文字慢慢消失
      this.bannerTextOpacity =
        -(document.scrollingElement.scrollTop - window.innerHeight) /
        window.innerHeight;

      // 首頁 Logo 出現
      this.logoOpacity =
        0.8 +
        (document.scrollingElement.scrollTop - window.innerHeight) /
          window.innerHeight;

      // 首頁 Banner 捲動縮放
      if (document.scrollingElement.scrollTop === 0) {
        this.progress = 2;
      } else if (document.scrollingElement.scrollTop > window.innerHeight) {
        this.progress = 1;
      } else {
        this.progress =
          1 -
          (document.scrollingElement.scrollTop - window.innerHeight) /
            window.innerHeight;
      }

      // 判斷首頁 Navbar 要不要置頂
      if (document.scrollingElement.scrollTop > window.innerHeight * 2) {
        return (this.fixed = true);
      } else {
        return (this.fixed = false);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.sticky {
  position: sticky !important;
  top: 0;
}
.static {
  position: static !important;
}
.bannerBg {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(var(--scale));
  overflow: hidden;
  * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #060b07;
  }
  @media (max-width: 991.98px) {
    img {
      object-fit: cover;
    }
  }
}
#banner1 {
  --scale: 2;
}
#banner2 {
  --scale: 1;
}
.box {
  background-color: rgba(255, 255, 255, 0.7);
  color: var(--bs-dark);
  text-align: center;
  max-width: 600px;
  position: absolute;
  z-index: 1;
}
// 滑鼠動畫
.scrolling {
  z-index: 1;
  bottom: 1rem;
  .mouse {
    position: relative;
    width: 28px;
    height: 44px;
    border-radius: 50px;
    margin: auto;
    .dot {
      position: absolute;
      contain: "";
      width: 2px;
      height: 10px;
      top: -1rem;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      background-color: var(--bs-dark);
      border-radius: 2px;
      animation: roller 0.5s infinite alternate ease-in-out;
    }
  }
}
@keyframes roller {
  from {
    top: -20px;
  }
  to {
    top: -6px;
  }
}
.about-icon {
  position: static;
  text-align: end;
  margin-top: 70%;
  img {
    width: 100px;
  }
}
@media (max-width: 767.98px) {
  .about-icon {
    margin-top: 15%;
    img {
      width: 20%;
    }
  }
}
.hot-text.vrl-text {
  height: 300px;
}
.chief {
  background: url("https://storage.googleapis.com/vue-course-api.appspot.com/letcla/1649344065919.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pxbRWKYByjOp8LgggbrlreBa8MJfobj8G%2BuyDkN3Gxu4NlgtWi6L5gdATLSVcECPOqTA4oqfaRldoFOUixUaG5TV83um51qjbqQqlIV%2FOf6fkK9he%2BZ5lAmQ9Rkm6Kwbhiti33r6gTOxYaPDDAla2nkuNjYDKJVVcdlKdn2r3seTFYr%2Bx7d4D%2BYIv%2B0MjSxDjMAINLYiuZtbepuO8zsCO4DCuz6x1Ke%2BVeIdjivgfF2SxKUt2ULEmim0RJpuuj8U6FkdHob7rR9TIS76Cc36oKlElSjobIhwDylXHCUJrZqkPrt%2B9c9SxYYkH%2B%2BavRug2nJRX%2F8l9EnWgUghwwELng%3D%3D")
    center center no-repeat;
  height: 440px;
}
</style>

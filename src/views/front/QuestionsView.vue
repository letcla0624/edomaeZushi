<template>
  <div class="main">
    <div class="container">
      <BreadComp class="pt-5"></BreadComp>
      <div class="row py-3 pb-lg-5">
        <div class="col-lg-8 offset-lg-2">
          <h2 class="py-3">一般的な問題</h2>
          <div
            class="accordion accordion-flush border border-dark"
            id="accordionQnA"
          >
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i class="bi bi-patch-question-fill me-2"></i>
                  あなたの魚はどこから来たのですか？
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionQnA"
              >
                <div class="accordion-body py-lg-5">
                  <article>
                    <p>
                      私たちの鮭と鮭は農場から来ており（私たちの鮭はノルウェー、フェロー諸島、またはスコットランドからのものであり、鮭は地中海からのものです）、寿司レストランで調理される前に、新鮮で丸ごと店に届けられます。
                    </p>
                    <p>
                      野生のマグロ、ビンナガ、メバチ（原産地：日本太平洋）は、サプライヤーによってカットおよび冷凍された後、現在の規制に従って店舗に出荷されます。
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i class="bi bi-patch-question-fill me-2"></i>
                  私の寿司飯はぬるいですが、これは正常ですか？
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionQnA"
              >
                <div class="accordion-body py-lg-5">
                  <article>
                    <p>
                      はい、心配はいりません。伝統的な寿司屋は、官能的な品質を維持し、扱いやすくするために、ご飯を室温に保ちます。
                    </p>
                    <p>
                      伝統とお客様に質の高い体験を提供したいという願望に沿って、寿司屋も室温でご飯を使用しています。
                      お米を常温に保つために、寿司屋は米酢を使ってご飯を酸性化しています。
                    </p>
                    <p>
                      もちろん、私たちの健康部門はあなたの製品の健康と安全を保証することができます。
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <i class="bi bi-patch-question-fill me-2"></i>
                  妊娠中ですが、お寿司は食べられますか？
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionQnA"
              >
                <div class="accordion-body py-lg-5">
                  <article>
                    <p>この幸せなイベントおめでとうございます！</p>
                    <p>
                      私たちの将来の寿司中毒者を苛立たせる危険を冒して、私たちは妊娠中に生の魚、新鮮または冷凍の甲殻類および軟体動物を食べないという医学界のアドバイスに同意することしかできません。
                    </p>
                    <p>それならもう少し辛抱してください ... (,,・ω・,,)</p>
                  </article>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingFour">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  <i class="bi bi-patch-question-fill me-2"></i>
                  アレルギーがありますが、あなたの商品を食べてもいいですか？
                </button>
              </h2>
              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionQnA"
              >
                <div class="accordion-body py-lg-5">
                  <article>
                    <p>
                      ご注文の際は、アレルギーについてチームにお知らせください。必要な追加の衛生対策を講じることができます。
                      多くの製品は敷地内で加工されており、寿司レストランは二次汚染がないことを保証するものではありません。
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingFive">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  <i class="bi bi-patch-question-fill me-2"></i>
                  配達が不完全な場合の対処方法？
                </button>
              </h2>
              <div
                id="collapseFive"
                class="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionQnA"
              >
                <div class="accordion-body py-lg-5">
                  <article>
                    <p>
                      ご不便をおかけして申し訳ございませんが、ご注文の準備には細心の注意を払っておりますが、エラーが発生する場合があります。
                    </p>
                    <p>
                      新しい配達サービスが必要な場合は、050-5263-6014
                      に直接お問い合わせください。配達員の空き状況に応じてサポートさせていただきます。
                    </p>
                    <p>
                      注文番号を尋ねられるので、注文確認メールの件名に注文番号を記入してください。
                      電話で注文する場合は、同じ番号を使用して電話をかけ直してください。そうすれば、私たちはあなたを識別し、あなたをあなたの店に直接接続することができます。
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingSix">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapseSix"
                >
                  <i class="bi bi-patch-question-fill me-2"></i>
                  配送中に破損した
                </button>
              </h2>
              <div
                id="collapseSix"
                class="accordion-collapse collapse"
                aria-labelledby="headingSix"
                data-bs-parent="#accordionQnA"
              >
                <div class="accordion-body py-lg-5">
                  <article>
                    <p>
                      私たちは製品の製造に細心の注意を払っており、注文の到着状況は私たちの優先事項の中心です。
                      これらの予防措置にもかかわらず、輸送は時々それらを損傷する可能性があります。
                    </p>
                  </article>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingSeven">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSeven"
                  aria-expanded="false"
                  aria-controls="collapseSeven"
                >
                  <i class="bi bi-patch-question-fill me-2"></i>
                  配達が遅れています
                </button>
              </h2>
              <div
                id="collapseSeven"
                class="accordion-collapse collapse"
                aria-labelledby="headingSeven"
                data-bs-parent="#accordionQnA"
              >
                <div class="accordion-body py-lg-5">
                  <article>
                    <p>
                      私たちの寿司はオンデマンドで寿司職人によってオンサイトで作られているため、注文がピークになると、残念ながら準備時間が長くなる可能性があります。
                    </p>
                    <p>
                      ご注文時に発表される納期は、可能な限り正確になるようにリアルタイムで計算されますが、残念ながら、起こりうる危険の影響を受けません。
                    </p>
                    <p>
                      一方、ご注文を確認する際は、配送担当者が可能な限り最良の条件（正確な住所、数字コード、有効な電話番号）で目的地に到着できるように、必要なすべての情報を必ず送信してください。
                      これらの要素のいずれかがないために提供されなかった場合、当社は責任を負いません。
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadComp from "@/components/front/BreadComp";

export default {
  components: {
    BreadComp,
  },
};
</script>

<style scoped>
.accordion-button::after {
  color: inherit;
}
</style>

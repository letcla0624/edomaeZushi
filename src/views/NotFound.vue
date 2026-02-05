<template>
  <div>
    <div
      class="container d-flex align-items-center justify-content-center"
      style="min-height: 100vh"
    >
      <div class="row">
        <div class="col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
          <div class="text-center">
            <img
              src="@/assets/images/404.png"
              alt="404 ご指定のページがみつかりません"
              class="w-100"
            />
            <div class="">
              <div class="mb-5">
                <h2 class="h5">指定されたページが見つかりません</h2>
                <p>
                  江戸前寿司をご利用いただきありがとうございます。
                  誠に恐れ入りますが、お探しのページは削除されたか、名前が変更されたため一時的にアクセスができません。
                </p>
              </div>
              <RouterLink to="/products" class="btn hvr-btn-dark">
                寿司メニューへ戻る
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

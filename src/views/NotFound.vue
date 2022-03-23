<template>
  <div class="paper">
    <div
      class="container d-flex align-items-center justify-content-center"
      style="min-height: 100vh"
    >
      <div class="row">
        <div class="col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
          <div class="text-center">
            <img src="@/assets/images/404.png" alt="404" class="w-100" />
            <div class="">
              <div class="mb-5">
                <h2 class="h5">ご指定のページがみつかりません</h2>
                <p>
                  江戸前寿司をご利用いただきありがとうございます。
                  申し訳ございませんが、検索中のページは存在しないか、
                  名前変更のため一時的にご利用が不可能です。
                </p>
              </div>
              <router-link to="/products" class="btn btn-dark">
                寿司のページに戻る
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

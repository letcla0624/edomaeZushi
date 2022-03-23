<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
    // 修改 title 名稱
    document.title = "江戸前寿司 edomaezushi";
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;300;400;500;600;700;900&family=Shippori+Mincho:wght@400;500;600;700;800&display=swap");
@import url("http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css");

body {
  font-family: "Shippori Mincho", "Noto Serif JP", serif !important;
  -webkit-font-smoothing: antialiased;
}
.navbar-toggler:focus {
  box-shadow: none !important;
}
nav .active {
  color: var(--bs-success) !important;
}
// 圖片比例
.aspect-ratio-1-1 {
  aspect-ratio: 1 / 1;
}
.aspect-ratio-4-3 {
  aspect-ratio: 4 / 3;
}
.aspect-ratio-16-9 {
  aspect-ratio: 16 / 9;
}
// 禁止圖片拖動
img {
  -webkit-user-drag: none;
}
.paper {
  background: url("@/assets/images/texture.png") 0 0 repeat;
  background-color: #efefef;
}
.vrl-text {
  height: 600px;
  writing-mode: vertical-rl;
}
.main {
  min-height: calc(100vh - 587px - 82px);
}
.bg-size-cover {
  background-size: cover;
}
.object-fit-cover {
  object-fit: cover;
}
.w-max-content {
  width: max-content;
}
.border.border-dashed {
  border-style: dashed !important;
}
.cursor-pointer {
  cursor: pointer;
}
// 去掉 input number 預設的上下箭頭
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
// input readonly
.form-control[readonly] {
  background-color: transparent !important;
}
// 自訂按鈕文字顏色
.btn-danger,
.btn-light-green,
.btn-deep-red {
  color: #fff !important;
  &:hover {
    color: #fff !important;
  }
}
.btn-outline-danger,
.btn-outline-light-green,
.btn-outline-deep-red {
  &:hover {
    color: #fff !important;
  }
}
</style>

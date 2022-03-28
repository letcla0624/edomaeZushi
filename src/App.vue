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

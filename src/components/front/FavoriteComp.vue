<template>
  <button
    type="button"
    class="btn py-0 favorite-btn"
    :ref="item.id"
    :title="
      favoriteProdId.includes(item.id)
        ? '私のお気に入りの解除する'
        : '私のお気に入りに追加'
    "
    @click="toggleFavorite(item.id)"
  >
    <i
      v-if="favoriteProdId.includes(item.id)"
      class="bi bi-balloon-heart-fill text-danger fs-2"
    ></i>
    <i v-else class="bi bi-balloon-heart fs-2"></i>
  </button>
</template>

<script>
export default {
  data() {
    return {
      favoriteProdId: JSON.parse(localStorage.getItem("itemId")) || [],
    };
  },
  props: ["item"],
  methods: {
    // 加入/取消我的最愛
    toggleFavorite(id) {
      const itemIdx = this.favoriteProdId.findIndex((item) => item === id);

      if (itemIdx === -1) {
        this.favoriteProdId.push(id);
      } else {
        this.favoriteProdId.splice(itemIdx, 1);
      }

      // 存入 localStorage
      localStorage.setItem("itemId", JSON.stringify(this.favoriteProdId));

      // 點擊加入動畫
      this.$refs[`${id}`].classList.add("active");
      setTimeout(() => {
        this.$refs[`${id}`].classList.remove("active");
      }, 600);
    },
  },
};
</script>

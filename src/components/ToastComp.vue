<template>
  <div class="toast-container position-fixed end-0">
    <div
      v-for="(msg, key) in messages"
      :key="key"
      class="toast border border-dark bg-white rounded-xl mb-2 fade show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div
        class="toast-header bg-transparent"
        :class="{
          'text-dark': msg.style === 'success',
          'text-danger': msg.style === 'error',
        }"
      >
        <img
          v-if="msg.style === 'success'"
          src="@/assets/images/sushi.png"
          alt="sushi"
          class="me-2"
          style="width: 24px"
        />
        <img
          v-else
          src="@/assets/images/omg.png"
          alt="sushi"
          class="me-2"
          style="width: 32px"
        />
        <strong class="me-auto">
          <span v-if="msg.content === '已加入購物車'"
            >ショッピングカートに追加</span
          >
          <span>{{ msg.content }}</span>
        </strong>
        <button
          type="button"
          class="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  inject: ["emitter"],
  methods: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
  },
  mounted() {
    this.emitter.on("toast-message", (msg) => {
      const { style, title, content } = msg;
      this.messages.push({ style, title, content });
      this.toastShow();
    });
  },
};
</script>

<style lang="scss">
.toast-container {
  padding: 1rem;
  top: 100px;
  z-index: 100;
}
</style>

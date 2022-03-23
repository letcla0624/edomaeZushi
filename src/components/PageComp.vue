<template>
  <nav class="py-5" aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPage(pages.current_page - 1)"
        >
          <span aria-hidden="true"><i class="bi bi-arrow-left-short"></i></span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(page, idx) in pages.total_pages"
        :key="idx"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="emitPage(page)">{{
          page
        }}</a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: pages.current_page === pages.total_pages }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPage(pages.current_page + 1)"
        >
          <span aria-hidden="true"
            ><i class="bi bi-arrow-right-short"></i
          ></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pages"],
  methods: {
    emitPage(page) {
      this.$emit("emit-page", page);
    },
  },
};
</script>

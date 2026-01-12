<!-- <template>
  <navbar />
  <div class="hero d-flex align-items-center text-center">
    <div class="content">
      <h1 class="fw-bold display-4 mb-3">Daily Blog ✍️</h1>

      <p class="lead text-muted mb-4">
        Nơi chia sẻ kiến thức, trải nghiệm và những câu chuyện mỗi ngày.
      </p>

      <div class="d-flex justify-content-center gap-3">
        <router-link to="/posts" class="btn btn-primary btn-lg">
          📚 View All Posts
        </router-link>

        <router-link to="/create-post" class="btn btn-outline-secondary btn-lg">
          ✨ Write a Post
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
template {
  /* min-height: 90vh; */
  background: linear-gradient(rgba(5, 189, 134, 0.85), rgba(18, 231, 46, 0.85));
}

h1 {
  letter-spacing: -1px;
}
</style> -->
<template>
  <Navbar />

  <section class="hero">
    <div class="content px-3">
      <h1 class="display-3 fw-bold mb-3">Daily Blog ✍️</h1>

      <p class="lead mb-4">
        Nơi chia sẻ kiến thức, trải nghiệm và những câu chuyện mỗi ngày.
      </p>

      <div class="d-flex justify-content-center gap-3 flex-wrap">
        <router-link to="/posts" class="btn btn-primary btn-lg">
          📚 View All Posts
        </router-link>

        <router-link to="/create-post" class="btn btn-outline-dark btn-lg">
          ✨ Write a Post
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import Navbar from "./Navbar.vue";
</script>

<style scoped>
.hero {
  min-height: 100vh;
  width: 100%;
  padding-top: 72px; /* chừa chỗ cho navbar fixed */
  background: linear-gradient(135deg, #1de9b6, #00e676);
}

.content {
  max-width: 720px;
}

p {
  color: #000000;
}
</style>

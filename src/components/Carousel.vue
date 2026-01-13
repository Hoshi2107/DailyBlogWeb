<template>
  <!-- Carousel -->
  <div id="blogCarousel" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <!-- <img src="..." class="d-block w-100" alt="..." /> -->
        <img :src="banner1" alt="error" class="d-block w-100" />
      </div>
      <div class="carousel-item">
        <img :src="banner2" alt="error" class="d-block w-100" />
      </div>
      <div class="carousel-item">
        <img :src="banner3" alt="error" class="d-block w-100" />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#blogCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#blogCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
import banner1 from "../imgs/banner1.jpg";
import banner2 from "../imgs/banner2.jpg";
import banner3 from "../imgs/banner3.jpg";
</script>

<style scoped>
.carousel-item img {
  height: 500px;
  margin-top: 60px;
}
</style>

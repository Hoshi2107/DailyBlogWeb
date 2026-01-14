<template>
  <!-- <Navbar /> -->

  <div class="container mt-5 pt-4">
    <Carousel />
    <h1>Welcome to the Daily Blog Home Page</h1>
    <div class="content">Today posts will be displayed here.</div>

    <!-- Latest Posts Section -->
    <section class="latest-posts py-5">
      <div class="container">
        <h2 class="fw-bold mb-4 text-center">Latest Posts</h2>

        <div class="row g-4">
          <div class="col-md-4" v-for="post in latestPosts" :key="post.id">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text text-muted">
                  {{ post.excerpt }}
                </p>
              </div>

              <div class="card-footer bg-transparent border-0">
                <router-link
                  :to="`/posts/${post.id}`"
                  class="btn btn-sm btn-outline-primary"
                >
                  Read more →
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <router-link to="/posts" class="btn btn-primary">
            View All Posts
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Carousel from "./Carousel.vue";
// import Navbar from "./Navbar.vue";

// Fake data for latest posts
const latestPosts = [
  {
    id: 1,
    title: "Tôi muốn ăn tụy của cậu",
    excerpt: "Một câu chuyện cảm động về cuộc sống và cái chết...",
  },
  {
    id: 2,
    title: "Cổ Chân Nhân",
    excerpt:
      "Hành trình cùng những câu chuyện ngẫm nhân sinh trên con đường nghịch thiên cải mệnh...",
  },
  {
    id: 3,
    title: "Sổ tay lập trình C#",
    excerpt: "Các funtion cơ bản và nâng cao trong lập trình C#...",
  },
  {
    id: 4,
    title: "Làm đĩ",
    excerpt: "Một cuốn sách châm biếm hay từ góc nhìn của Nam Cao",
  },
  {
    id: 5,
    title: "Đắc nhân tâm",
    excerpt: "Những nguyên tắc vàng trong giao tiếp và xây dựng mối quan hệ...",
  },
  {
    id: 6,
    title: "Quỷ xá",
    excerpt:
      "Một câu chuyện kinh dị rùng rợn về hành trình trong thế giới sương mù của Ninh Thu Thủy...",
  },
];
</script>

<style scoped>
h1 {
  text-align: center;
  background-color: lightsalmon;
  margin-top: 50px;
  font-weight: bold;
}
.container {
  background-color: lightgray;
}
</style>

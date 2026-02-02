<template>
  <!-- <Navbar /> -->

  <div class="container">
    <Carousel />
    <!-- <h1>Welcome to the Daily Blog Home Page</h1> -->

    <!-- Latest Posts Section -->
    <section class="latest-posts py-5">
      <div class="container">
        <h2 class="fw-bold mb-4 text-center">Bài viết mới nhất</h2>

        <div class="row g-4">
          <div
            class="col-md-4"
            v-for="post in paginatedPosts"
            :key="post.postID"
          >
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text text-muted">
                  {{ truncate(post.description, 50) }}
                </p>
              </div>

              <div class="card-footer bg-transparent border-0">
                <!-- <router-link
                  :to="`/posts/${post.id}`"
                  class="btn btn-sm btn-outline-primary"
                >
                  Read more →
                </router-link> -->
                <router-link
                  :to="{ name: 'PostDetail', params: { id: post.postID } }"
                  class="btn btn-sm btn-outline-primary"
                >
                  Đọc thêm →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Pagination (static example) -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center mb-4">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)">
            &laquo;
          </button>
        </li>

        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="changePage(page)">
            {{ page }}
          </button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)">
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import Carousel from "./Carousel.vue";
// import Navbar from "./Navbar.vue";
import { useRoute } from "vue-router";
// import { computed, ref } from "vue";

// const route = useRoute();
// const router = useRouter();

// const postsPerPage = 9;

// Take data from postService
import { ref, onMounted, computed } from "vue";
import { getPosts } from "../services/postService";

const posts = ref([]);

onMounted(async () => {
  try {
    posts.value = await getPosts();
  } catch (error) {
    console.error("Lỗi load post:", error);
  }
});

//search post
// const filteredPosts = computed(() => {
//   const q = route.query.search;

//   if (!q || !q.trim()) {
//     return latestPosts.value;
//   }

//   const keyword = q.toLowerCase();

//   return latestPosts.value.filter(
//     (p) =>
//       p.title.toLowerCase().includes(keyword) ||
//       p.excerpt.toLowerCase().includes(keyword)
//   );
// });

// pagination
const postsPerPage = 9;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return posts.value.slice(start, start + postsPerPage);
});

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// truncate text for description
const truncate = (text, length) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 0px;
  font-weight: bold;
}
.container {
  background-color: white;
}
</style>

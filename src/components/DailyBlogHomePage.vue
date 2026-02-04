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
import { useRoute } from "vue-router";

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
import { watch } from "vue";

const props = defineProps({
  searchKeyword: String,
});

watch(
  () => props.searchKeyword,
  () => {
    currentPage.value = 1;
  },
);

const filteredPosts = computed(() => {
  if (!props.searchKeyword || !props.searchKeyword.trim()) {
    return posts.value;
  }

  const keyword = props.searchKeyword.toLowerCase();

  return posts.value.filter(
    (p) =>
      p.title.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword),
  );
});

// pagination
const postsPerPage = 9;
const currentPage = ref(1);

// const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage));

// const paginatedPosts = computed(() => {
//   const start = (currentPage.value - 1) * postsPerPage;
//   return posts.value.slice(start, start + postsPerPage);
// });
const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / postsPerPage),
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return filteredPosts.value.slice(start, start + postsPerPage);
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

.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px rgb(0, 0, 0);
}

.card-title {
  transition: color 0.3s ease;
}

.card:hover .card-title {
  color: #0d6efd;
}
</style>

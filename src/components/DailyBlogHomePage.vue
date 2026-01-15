<template>
  <!-- <Navbar /> -->

  <div class="container">
    <Carousel />
    <h1>Welcome to the Daily Blog Home Page</h1>

    <!-- Latest Posts Section -->
    <section class="latest-posts py-5">
      <div class="container">
        <h2 class="fw-bold mb-4 text-center">Latest Posts</h2>

        <div class="row g-4">
          <div class="col-md-4" v-for="post in paginatedPosts" :key="post.id">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text text-muted">
                  {{ post.excerpt }}
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
                  :to="{ name: 'PostDetail', params: { id: post.id } }"
                  class="btn btn-sm btn-outline-primary"
                >
                  Read more →
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
import { computed, ref } from "vue";

// const route = useRoute();
// const router = useRouter();

// const postsPerPage = 9;
// Fake data for latest posts
const latestPosts = ref([
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
  {
    id: 7,
    title: "Tôi muốn ăn tụy của cậu",
    excerpt:
      "Một câu chuyện cảm động về sự sống, cái chết và những điều chưa kịp nói...",
  },
  {
    id: 8,
    title: "Cổ Chân Nhân",
    excerpt:
      "Thiên địa bất nhân, lấy vạn vật làm chó rơm. Con đường nghịch thiên cải mệnh...",
  },
  {
    id: 9,
    title: "Re:Zero − Bắt đầu lại ở thế giới khác",
    excerpt:
      "Mỗi lần chết là một lần quay lại. Nhưng nỗi đau thì không bao giờ reset...",
  },
  {
    id: 10,
    title: "Sword Art Online",
    excerpt:
      "Khi game không còn là game, cái chết là thật, và đăng xuất là bất khả thi...",
  },
  {
    id: 11,
    title: "Overlord",
    excerpt:
      "Khi server đóng cửa nhưng bạn vẫn còn mắc kẹt trong game với sức mạnh tối thượng...",
  },
  {
    id: 12,
    title: "No Game No Life",
    excerpt:
      "Một thế giới nơi mọi thứ được quyết định bằng game, và hai thiên tài bước vào cuộc chơi.",
  },
  {
    id: 13,
    title: "Classroom of the Elite",
    excerpt:
      "Ngôi trường ưu tú, nơi con người bị phân loại và thao túng bằng trí tuệ.",
  },
  {
    id: 14,
    title: "Your Name",
    excerpt:
      "Hai con người xa lạ, hoán đổi thân xác và tìm thấy nhau qua thời gian.",
  },
  {
    id: 15,
    title: "Attack on Titan",
    excerpt: "Tự do là gì khi nhân loại bị nhốt sau những bức tường khổng lồ?",
  },
  {
    id: 16,
    title: "86 - Eighty Six",
    excerpt:
      "Cuộc chiến không người lái, nhưng những người bị bỏ rơi vẫn đang chết mỗi ngày.",
  },
  {
    id: 17,
    title: "Mushoku Tensei",
    excerpt:
      "Một kẻ thất bại tái sinh và quyết tâm sống nghiêm túc ở thế giới mới.",
  },
  {
    id: 18,
    title: "Monogatari Series",
    excerpt:
      "Những hiện tượng siêu nhiên gắn liền với tâm lý và tổn thương con người.",
  },
  {
    id: 19,
    title: "The Beginning After The End",
    excerpt:
      "Một vị vua tái sinh, mang theo ký ức và tham vọng của kiếp trước.",
  },
  {
    id: 20,
    title: "Solo Leveling",
    excerpt: "Từ thợ săn yếu nhất trở thành kẻ mạnh nhất, từng bước một.",
  },
  {
    id: 21,
    title: "Spice and Wolf",
    excerpt:
      "Chuyến hành trình buôn bán, tri thức và mối quan hệ giữa người và sói.",
  },
  {
    id: 22,
    title: "Oshi no Ko",
    excerpt:
      "Ánh hào quang của giới giải trí che giấu những bi kịch không ai thấy.",
  },
  {
    id: 23,
    title: "Violet Evergarden",
    excerpt:
      "Hành trình học cách hiểu cảm xúc và ý nghĩa của lời nói: 'Anh yêu em'.",
  },
  {
    id: 24,
    title: "The Rising of the Shield Hero",
    excerpt: "Một anh hùng bị phản bội, phải đứng lên từ con số âm.",
  },
]);

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

const totalPages = computed(() =>
  Math.ceil(latestPosts.value.length / postsPerPage)
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return latestPosts.value.slice(start, start + postsPerPage);
});

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 0px;
  font-weight: bold;
}
.container {
  background-color: lightgray;
}
</style>

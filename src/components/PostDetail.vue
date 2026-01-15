<template>
  <div class="container mt-5 pt-4">
    <!-- Post content -->
    <div class="card mb-4 shadow-sm" v-if="post">
      <div class="card-body">
        <h2 class="fw-bold">{{ post.title }}</h2>
        <p class="text-muted mb-2">{{ post.author }} · {{ post.createdAt }}</p>
        <hr />
        <p class="fs-6" style="line-height: 1.8">
          {{ post.content }}
        </p>
      </div>
    </div>

    <!-- Comment section -->
    <div class="card shadow-sm">
      <div class="card-body">
        <h5
          class="mb-3 pb-3 border-bottom"
          style="font-weight: bold; font-size: 30px"
        >
          Bình luận
        </h5>

        <!-- Comment list -->
        <div v-for="c in comments" :key="c.id" class="border-bottom pb-2 mb-3">
          <strong>{{ c.username }}</strong>
          <small class="text-muted ms-2">{{ c.createdAt }}</small>
          <p class="mb-1">{{ c.content }}</p>
        </div>

        <!-- Add comment -->
        <div class="mt-3">
          <textarea
            class="form-control mb-2"
            rows="3"
            placeholder="Your comment..."
            v-model="newComment"
          ></textarea>
          <button class="btn btn-primary" @click="addComment">
            Comment this post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const postId = Number(route.params.id);

// FAKE POSTS (sau này thay bằng API)
const fakePosts = [
  {
    id: 1,
    title: "Tôi muốn ăn tụy của cậu",
    author: "Hoshi",
    content:
      "Một câu chuyện cảm động về cuộc sống và cái chết. Đây là nội dung chi tiết của bài viết...",
    createdAt: "15/01/2026",
  },
  {
    id: 2,
    title: "Cổ Chân Nhân",
    author: "Hoshi",
    content:
      "Hành trình nghịch thiên cải mệnh, tranh đấu sinh tồn trong tu chân giới...",
    createdAt: "16/01/2026",
  },
];

// tìm bài viết theo id
const post = fakePosts.find((p) => p.id === postId);

// FAKE COMMENTS
const comments = ref([
  {
    id: 1,
    username: "Nguyễn Văn B",
    content: "Bài này đọc cuốn thật",
    createdAt: "15/01/2026 10:30",
  },
]);

const newComment = ref("");
const currentUser = "Hoshi"; // fake login

const addComment = () => {
  if (!newComment.value.trim()) return;

  comments.value.unshift({
    id: Date.now(),
    username: currentUser,
    content: newComment.value,
    createdAt: new Date().toLocaleString(),
  });

  newComment.value = "";
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>

<template>
  <div class="container mt-5 pt-4">
    <!-- Post content -->
    <div class="card mb-4 shadow-sm" v-if="post">
      <div class="card-body">
        <h2 class="fw-bold">{{ post.title }}</h2>
        <p class="text-muted mb-2">
          {{ post.author }} · {{ formatDate(post.postDate) }} ·
          {{ post.category }}
        </p>
        <hr />
        <p class="fs-6" style="line-height: 1.8">
          {{ post.description }}
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
        <div v-for="c in comments" :key="c.commentID">
          <strong>{{ c.username }}</strong>
          <small class="text-muted ms-2">
            {{ formatDate(c.commentDate) }}
          </small>
          <p>{{ c.commentDetail }}</p>
        </div>

        <!-- Add comment -->
        <div class="mt-3">
          <textarea
            class="form-control mb-2"
            rows="3"
            placeholder="Viết bình luận..."
            v-model="newComment"
          ></textarea>
          <button class="btn btn-primary" @click="addComment">
            Bình luận bài viết
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPostById } from "../services/postService";

const route = useRoute();
const post = ref(null);
const comments = ref([]);
const newComment = ref("");

// await loadComments();
onMounted(async () => {
  try {
    const data = await getPostById(route.params.id);
    post.value = data;

    await loadComments();
  } catch (error) {
    console.error("Lỗi load chi tiết:", error);
  }
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Load comments on mount
const loadComments = async () => {
  const res = await fetch(
    `https://localhost:7181/api/comment/post/${route.params.id}`,
  );

  comments.value = await res.json();
};

const addComment = async () => {
  if (!newComment.value.trim()) return;

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Bạn cần đăng nhập để bình luận");
    return;
  }

  try {
    const res = await fetch("https://localhost:7181/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentDetail: newComment.value,
        userID: user.userID,
        postID: parseInt(route.params.id),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.log("SERVER ERROR:", errText);
      throw new Error();
    }

    newComment.value = "";
    await loadComments();
  } catch (err) {
    alert("Không thể thêm bình luận");
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>

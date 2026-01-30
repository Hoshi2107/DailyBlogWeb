<template>
  <div class="container mt-5 pt-4">
    <div class="card shadow-sm">
      <div class="card-body">
        <h3 class="mb-4">Tạo bài viết mới</h3>

        <input
          v-model="title"
          class="form-control mb-3"
          placeholder="Tiêu đề bài viết"
        />

        <textarea
          v-model="content"
          class="form-control mb-3"
          rows="8"
          placeholder="Chia sẻ cảm nghĩ của bạn..."
        ></textarea>

        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary me-2" @click="cancel">Hủy</button>
          <button class="btn btn-primary" @click="submitPost">Đăng bài</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const title = ref("");
const content = ref("");

const submitPost = () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert("Please make sure all fields are filled out.");
    return;
  }

  // FAKE save post
  const newPost = {
    id: Date.now(),
    title: title.value,
    content: content.value,
    author: JSON.parse(localStorage.getItem("user"))?.username || "Guest",
    createdAt: new Date().toLocaleString(),
  };

  console.log("POST CREATED:", newPost);

  alert("Your post has been published!");

  router.push("/account"); // hoặc "/"
};

const cancel = () => {
  router.back();
};
</script>

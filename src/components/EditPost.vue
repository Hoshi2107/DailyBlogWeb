<!-- <template>
  <div class="container mt-5 pt-4">
    <h3 class="mb-4">Sửa bài viết</h3>

    <input
      v-model="post.title"
      class="form-control mb-3"
      placeholder="Post Title"
    />

    <textarea
      v-model="post.content"
      class="form-control mb-3"
      rows="6"
      placeholder="What's on your mind?"
    ></textarea>

    <button class="btn btn-primary" @click="updatePost">Lưu thay đổi</button>

    <button class="btn btn-secondary ms-2" @click="cancelEdit">Hủy bỏ</button>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const postId = route.params.id;

const post = reactive({
  title: "",
  content: "",
});

// 🔹 Load post hiện tại
onMounted(async () => {
  try {
    const res = await fetch(`https://localhost:7181/api/post/${postId}`);

    if (!res.ok) throw new Error("Load post failed");

    const data = await res.json();

    post.title = data.title;
    post.content = data.description; // backend của m dùng description
  } catch (err) {
    console.error(err);
    alert("Không tải được bài viết");
  }
});

// 🔹 Update post
const updatePost = async () => {
  try {
    const res = await fetch(`https://localhost:7181/api/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID: parseInt(postId),
        title: post.title,
        description: post.content,
        categoryID: post.categoryID,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.log(errText);
      throw new Error();
    }

    alert("Cập nhật thành công");
  } catch (err) {
    alert("Cập nhật thất bại");
  }
};

// 🔹 Cancel
const cancelEdit = () => {
  router.push("/profile");
};
</script>

<style scoped>
.container {
  max-width: 700px;
}
button {
  margin-bottom: 10px;
}
</style> -->
<template>
  <div class="container mt-5 pt-4">
    <h3 class="mb-4">Sửa bài viết</h3>

    <input
      v-model="post.title"
      class="form-control mb-3"
      placeholder="Post Title"
    />

    <!-- Category dropdown -->
    <select v-model="post.categoryID" class="form-select mb-3">
      <option value="null" disabled>-- Chọn danh mục --</option>
      <option
        v-for="cat in categories"
        :key="cat.categoryID"
        :value="cat.categoryID"
      >
        {{ cat.categoryName }}
      </option>
    </select>

    <textarea
      v-model="post.content"
      class="form-control mb-3"
      rows="6"
      placeholder="What's on your mind?"
    ></textarea>

    <button class="btn btn-primary" @click="updatePost">Lưu thay đổi</button>

    <button class="btn btn-secondary ms-2" @click="cancelEdit">Hủy bỏ</button>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const postId = route.params.id;

const categories = ref([]);

const post = reactive({
  title: "",
  content: "",
  // categoryID: "",
  categoryID: null,
});

// 🔥 Load dữ liệu khi vào trang
onMounted(async () => {
  try {
    const catRes = await fetch("https://localhost:7181/api/category");
    if (!catRes.ok) {
      console.log("Category status:", catRes.status);
      throw new Error("Category lỗi");
    }
    categories.value = await catRes.json();

    const res = await fetch(`https://localhost:7181/api/post/${postId}`);
    if (!res.ok) {
      console.log("Post status:", res.status);
      throw new Error("Post lỗi");
    }

    const data = await res.json();

    post.title = data.title;
    post.content = data.description;
    post.categoryID = data.categoryID;
  } catch (err) {
    console.error("FULL ERROR:", err);
    alert("Không tải được dữ liệu");
  }
});

// 🔥 Update
const updatePost = async () => {
  if (!post.title || !post.content || !post.categoryID) {
    alert("Vui lòng nhập đủ thông tin !");
    return;
  }
  if (!post.categoryID) {
    alert("Chọn danh mục đi bro");
    return;
  }
  try {
    const res = await fetch(`https://localhost:7181/api/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID: parseInt(postId),
        title: post.title,
        description: post.content,
        categoryID: parseInt(post.categoryID),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.log(err);
      throw new Error();
    }

    alert("Cập nhật thành công");
    router.push("/account");
  } catch (err) {
    alert("Cập nhật thất bại");
  }
};

const cancelEdit = () => {
  router.push("/account");
};
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>

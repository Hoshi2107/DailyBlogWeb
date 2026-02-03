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

        <!-- Category -->
        <select v-model="categoryID" class="form-select mb-3">
          <option disabled value="">-- Chọn danh mục --</option>
          <option
            v-for="cat in categories"
            :key="cat.categoryID"
            :value="cat.categoryID"
          >
            {{ cat.categoryName }}
          </option>
        </select>

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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const title = ref("");
const content = ref("");
const categoryID = ref("");
const categories = ref([]);

const user = JSON.parse(localStorage.getItem("user"));

// Load categories
onMounted(async () => {
  try {
    const res = await fetch("https://localhost:7181/api/category");
    if (!res.ok) throw new Error();
    categories.value = await res.json();
  } catch (err) {
    console.log(err);
    alert("Không tải được danh mục");
  }
});

// Submit post
const submitPost = async () => {
  if (!title.value || !content.value || !categoryID.value) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  try {
    const res = await fetch("https://localhost:7181/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        description: content.value,
        userID: user.userID,
        categoryID: parseInt(categoryID.value),
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log(errorText);
      throw new Error("Create failed");
    }

    alert("Đăng bài thành công 🎉");
    router.push("/account");
  } catch (err) {
    console.log(err);
    alert("Đăng bài thất bại");
  }
};

const cancel = () => {
  router.back();
};
</script>

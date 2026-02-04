<template>
  <div>
    <h3 class="mb-3">Quản lý bài viết</h3>

    <div class="card">
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Category</th>
              <th>Trạng thái</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.postID">
              <td>{{ post.postID }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.author }}</td>
              <td>{{ post.category }}</td>

              <td>
                <span
                  class="badge"
                  :class="post.isHidden ? 'bg-secondary' : 'bg-success'"
                >
                  {{ post.isHidden ? "Đã ẩn" : "Đang hiển thị" }}
                </span>
              </td>

              <td class="text-center">
                <button
                  class="btn btn-sm"
                  :class="post.isHidden ? 'btn-success' : 'btn-danger'"
                  @click="togglePost(post)"
                >
                  {{ post.isHidden ? "Hiện lại" : "Ẩn bài" }}
                </button>
              </td>
            </tr>

            <tr v-if="posts.length === 0">
              <td colspan="6" class="text-center py-3">Không có dữ liệu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);

const loadPosts = async () => {
  const res = await axios.get("https://localhost:7181/api/admin/posts");
  posts.value = res.data;
};

onMounted(loadPosts);

const togglePost = async (post) => {
  if (post.isHidden) {
    await axios.put(
      `https://localhost:7181/api/admin/show-post/${post.postID}`,
    );
  } else {
    await axios.put(
      `https://localhost:7181/api/admin/hide-post/${post.postID}`,
    );
  }

  await loadPosts(); // reload lại từ DB
};
</script>

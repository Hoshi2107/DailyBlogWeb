<template>
  <div>
    <h3 class="mb-3">Quản lý comment</h3>

    <div class="card">
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Người dùng</th>
              <th>Bài viết</th>
              <th>Nội dung</th>
              <th>Trạng thái</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="comment in comments" :key="comment.commentID">
              <td>{{ comment.commentID }}</td>
              <td>{{ comment.user }}</td>
              <td>{{ comment.post }}</td>
              <td style="max-width: 300px">
                {{ comment.comment }}
              </td>

              <td>
                <span
                  class="badge"
                  :class="comment.isHidden ? 'bg-secondary' : 'bg-success'"
                >
                  {{ comment.isHidden ? "Đã ẩn" : "Hiển thị" }}
                </span>
              </td>

              <td class="text-center">
                <button
                  class="btn btn-sm"
                  :class="comment.isHidden ? 'btn-success' : 'btn-danger'"
                  @click="toggleComment(comment)"
                >
                  {{ comment.isHidden ? "Hiện lại" : "Ẩn" }}
                </button>
              </td>
            </tr>

            <tr v-if="comments.length === 0">
              <td colspan="6" class="text-center py-3">Không có comment</td>
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

const comments = ref([]);

const loadComments = async () => {
  const res = await axios.get("https://localhost:7181/api/admin/comments");
  comments.value = res.data;
};

onMounted(loadComments);

const toggleComment = async (comment) => {
  if (comment.isHidden) {
    await axios.put(
      `https://localhost:7181/api/admin/show-comment/${comment.commentID}`,
    );
  } else {
    await axios.put(
      `https://localhost:7181/api/admin/hide-comment/${comment.commentID}`,
    );
  }

  await loadComments();
};
</script>

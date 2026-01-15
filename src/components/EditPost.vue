<template>
  <div class="container mt-5 pt-4">
    <h3 class="mb-4">Editing Post</h3>

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

    <button class="btn btn-primary">Save changes</button>
    <button class="btn btn-secondary ms-2">Cancel</button>
    <!-- <button class="btn btn-danger ms-2">Delete this post</button> -->
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { reactive } from "vue";

const route = useRoute();
const postId = route.params.id;

// FAKE DATA
const post = reactive({
  title: "",
  content: "",
});
</script>
<style scoped>
.container {
  max-width: 700px;
}
button {
  margin-bottom: 10px;
}
</style>

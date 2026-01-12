<!-- <template>
  <div class="container mt-4">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>

    <router-link to="/" class="btn btn-secondary"> Quay lại </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const posts = [
      { id: 1, title: "Bài 1", content: "Hello Vue 😎" },
      { id: 2, title: "Bài 2", content: "Vue dễ mà" },
    ];
    this.post = posts.find((p) => p.id == id);
  },
};
</script> -->
